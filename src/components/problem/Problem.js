import { useNavigate } from "react-router-dom";

import SelectVehicle from "../selectVehicle/SelectVehicle";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import "../style/Problem.css";
import rocketImage from "../assets/rocket.gif";
import { useSnackbar } from "notistack";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SelectPlanet from "../selectPlanet/SelectPlanet";
import { useReducer } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RadioGroup from "@mui/material/RadioGroup";
import Alert from "@mui/material/Alert";
import LocationSearchingSharpIcon from "@mui/icons-material/LocationSearchingSharp";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function reducer(state, action) {
  switch (action.task) {
    case "selectedListPlanet":
      const { planetName, indx } = action;

      if (planetName !== "-") {
        const tPlanet = state.planetList.find(
          (item) => item.name === planetName
        );
        return {
          ...state,
          selectedList: state.selectedList.map((item, index) =>
            index === action.index
              ? { ...item, planet: tPlanet.name, distance: tPlanet.distance }
              : item
          ),
        };
      } else {
        return {
          ...state,
          selectedList: state.selectedList.map((item, index) =>
            index === action.index ? { ...item, planet: "", distance: 0 } : item
          ),
        };
      }

      return {
        ...state,
        selectedList: state.selectedList.map((item, index) =>
          index === action.index ? { ...item, planet: action.planetName } : item
        ),
      };

    case "selectedListVehical":
      const { index, vehicleName } = action;
      const tempSpeed = state.vehicleList.find(
        (item) => item.name === vehicleName
      );
      const updatedList = state.selectedList.map((item, i) =>
        i === index
          ? { ...item, vehicle: tempSpeed.name, speed: tempSpeed.speed }
          : item
      );
      const updatedVehicles = state.vehicleList.map((vehicle) => {
        if (vehicle.name === vehicleName) {
          if (vehicle.total_no > 0) {
            return { ...vehicle, total_no: vehicle.total_no - 1 };
          } else {
            return { ...vehicle, total_no: 0 };
          }
        } else {
          return { ...vehicle };
        }
      });
      return {
        ...state,
        selectedList: updatedList,
        vehicleList: updatedVehicles,
      };

    case "setToken":
      return {
        ...state,
        token: action.payload,
      };
    case "timeSet":
      return {
        ...state,
        timetake: action.payload,
      };
    case "setPlanetList":
      return {
        ...state,
        planetList: action.payload,
      };
    case "setVehicleList":
      return {
        ...state,
        vehicleList: action.payload,
      };
    case "resetDatabase":
      const { resetSelectedList, resetVehicleList } = action;
      return {
        ...state,
        vehicleList: resetVehicleList,
        selectedList: resetSelectedList,
      };
    default:
      return state;
  }
}

export default function Problem() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const uniqueId = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  // variables
  /*******************************************************
   * all state initialising
   * *****************************************************/
  // show time
  const initialState = {
    selectedList: [
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
    ],
    planetList: [],
    vehicleList: [],
    distanceSpeed: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    token: "",
    timetake: 0,
  };
  const [state, setState] = useReducer(reducer, initialState);
  // for process show insted of button
  const [buttonProcess, setButtonProcess] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  // states for reset to original
  // for planets
  // for vhicals
  const [originPlanetList, setOriginPlanetList] = useState([]);
  const [originVehicleList, setOriginVehicleList] = useState([]);
  /********************************************************
   * Urls For Get and Post
   *********************************************************/
  let planetUrl = `https://findfalcone.geektrust.com/planets`;
  let vehicaleUrl = `https://findfalcone.geektrust.com/vehicles`;

  const findQueen = async () => {
    const fPlanetList = state.selectedList.map((item) => item.planet);
    const fVehicleList = state.selectedList.map((item) => item.vehicle);

    try {
      const res = await axios.post(
        `https://findfalcone.geektrust.com/find`,
        {
          token: state.token.token,
          planet_names: fPlanetList,
          vehicle_names: fVehicleList,
        },

        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e.status);
      enqueueSnackbar(`Something went wrong please refresh`, {
        variant: "error",
      });
      console.log(e);
      return null;
    }
  };

  const handlePostProcess = async () => {
    setShowRocket(true);
    let result = await findQueen();
    console.log(result);
    setShowRocket(false);
    if (result.status === "false") {
      enqueueSnackbar(`Search Operation is Failed,Try Again`, {
        variant: "error",
      });
      window.location.reload();
    } else if (result.status === "success") {
      localStorage.setItem("status", "success");
      localStorage.setItem("time", state.timetake);
      localStorage.setItem("planet_name", result.planet_name);
      navigate('/kudos')
    }
  };

  let getToken = async () => {
    try {
      const res = await axios.post(
        "https://findfalcone.geektrust.com/token",
        {},

        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      return res.data;
    } catch (e) {
      enqueueSnackbar(
        `Please Check Your internet connection and refresh the page`,
        { variant: "error" }
      );
      console.log(e);
      return null;
    }
  };
  /**
   * Makes an asynchronous GET request using Axios.
   * @param {string} url - The URL to make the GET request to.
   * @returns {Promise} - A Promise that resolves to the response data or null if an error occurs.
   */
  let req = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      enqueueSnackbar(`Please Check Your internet connection`, {
        variant: "error",
      });
      return null;
    }
  };
  /*****************************************************
   * useEffect Happen Here
   */
  useEffect(() => {
    const fetchData = async () => {
      const tokenResponse = await getToken();
      const planetResponse = await req(planetUrl);
      const vehicleResponse = await req(vehicaleUrl);
      setState({ task: "setPlanetList", payload: planetResponse });
      setState({ task: "setVehicleList", payload: vehicleResponse });
      setOriginPlanetList(planetResponse);
      setOriginVehicleList(vehicleResponse);
      setState({ task: "setToken", payload: tokenResponse });
      console.log(tokenResponse, planetResponse, vehicleResponse);
    };

    fetchData();
  }, []);

  // on Change of state
  useEffect(() => {
    let tDistance = 0;
    let tSpeed = 0;

    state.selectedList.forEach((element) => {
      console.log(element.distance);
      tDistance += element.distance;
      tSpeed += element.speed;
    });
    console.log(tDistance, tSpeed);
    if (tDistance && tSpeed !== 0) {
      let finalAns = parseInt(tDistance / tSpeed);
      setState({ task: "timeSet", payload: finalAns });
    } else {
      setState({ task: "timeSet", payload: tDistance });
    }
    showButton();
  }, [state.selectedList]);

  const handleReset = () => {
    let tempSelectedList = [
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
    ];
    setState({
      task: "resetDatabase",
      resetSelectedList: tempSelectedList,
      resetVehicleList: originVehicleList,
    });
    enqueueSnackbar(`Reset Successful`, { variant: "success" });
  };
  const showButton = () => {
    let cnt = 0;

    state.selectedList.forEach((item) =>
      item.distance && item.speed !== 0 ? cnt++ : cnt
    );
    if (cnt === 4) {
      setButtonProcess(true);
    }
  };

  return (
    <div className="hero">
      {showRocket && (
        <Box
          style={{ width: "500px", height: "500px", backgroundColor: "white" }}
        >
          <img
            src={rocketImage}
            width="50%"
            alt="PlanetImage"
            loading="lazy"
            style={{
              position: "absolute",
              top: "0",
              left: "25%",
              right: "50%",
            }}
          />
        </Box>
      )}
      <div className="hero-container">
        <h2>Select planets you want to search in</h2>
        {state.selectedList[0].planet !== "" && (
          <Button
            variant="text"
            onClick={handleReset}
            sx={{ color: "black", fontSize: "20px" }}
          >
            <RotateLeftIcon />
            Reset
          </Button>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="dropDown_parent">
            <div className="dropDown_container">
              {state.vehicleList.map((e, idx) => {
                return (
                  <div>
                    <SelectPlanet
                      key={`${idx}planet`}
                      state={state}
                      idx={idx}
                      setState={setState}
                      uniqueId={uniqueId}
                    />
                    {state.selectedList[idx].planet !== "" && (
                      <SelectVehicle
                        state={state}
                        idx={idx}
                        setState={setState}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "30%",
                alignItems: "center",
              }}
            >
              <h3 className="timeCounter">Time Taken:- {state.timetake}</h3>
            </Box>
          </div>
          {/**************
          warning for RadioButton selection 
          ******************/}
          {state.selectedList[0].planet !== "" && (
            <Alert severity="info">
              Please be cautious as you only have a single opportunity to select
              a vehicle.
            </Alert>
          )}
          {/*******************************************
           * find button
           *********************************************/}
          <Box
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "white",
              color: "black",
              fontSize: "larger",
            }}
          >
            {buttonProcess ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "larger",
                }}
                // color=""
                onClick={handlePostProcess}
              >
                <LocationSearchingSharpIcon />
                <span>Start Search Opration</span>
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
