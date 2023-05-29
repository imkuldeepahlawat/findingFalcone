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



/**
 * The reducer function handles state updates based on different actions.
 * @param {object} state - The current state object.
 * @param {object} action - An object containing the `task` property representing the type of action and other necessary data.
 * @returns {object} - The new state object after performing the specified action.
 */
function reducer(state, action) {
  switch (action.task) {
    case "selectedListPlanet":
      // Destructure the action properties
      const { planetName, indx } = action;

      if (planetName !== "-") {
        // Find the selected planet in the planetList
        const tPlanet = state.planetList.find(
          (item) => item.name === planetName
        );

        // Update the selected planet and distance in the selectedList array
        return {
          ...state,
          selectedList: state.selectedList.map((item, index) =>
            index === action.index
              ? { ...item, planet: tPlanet.name, distance: tPlanet.distance }
              : item
          ),
        };
      } else {
        // Reset the planet and distance values in the selectedList array
        return {
          ...state,
          selectedList: state.selectedList.map((item, index) =>
            index === action.index ? { ...item, planet: "", distance: 0 } : item
          ),
        };
      }

    case "selectedListVehical":
      // Destructure the action properties
      const { index, vehicleName } = action;

      // Find the selected vehicle in the vehicleList
      const tempSpeed = state.vehicleList.find(
        (item) => item.name === vehicleName
      );

      // Update the selected vehicle and speed in the selectedList array
      const updatedList = state.selectedList.map((item, i) =>
        i === index
          ? { ...item, vehicle: tempSpeed.name, speed: tempSpeed.speed }
          : item
      );

      // Update the total_no property of the selected vehicle in the vehicleList array
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
      // Update the token value in the state
      return {
        ...state,
        token: action.payload,
      };

    case "timeSet":
      // Update the timetake value in the state
      return {
        ...state,
        timetake: action.payload,
      };

    case "setPlanetList":
      // Update the planetList value in the state
      return {
        ...state,
        planetList: action.payload,
      };

    case "setVehicleList":
      // Update the vehicleList value in the state
      return {
        ...state,
        vehicleList: action.payload,
      };

    case "resetDatabase":
      // Destructure the action properties
      const { resetSelectedList, resetVehicleList } = action;

      // Reset the selectedList and vehicleList values in the state
      return {
        ...state,
        vehicleList: resetVehicleList,
        selectedList: resetSelectedList,
      };

    default:
      // Return the current state for unknown actions
      return state;
  }
}

export default function Problem() {
  /**
   * Navigates to a different route within the application.
   */
  const navigate = useNavigate();
  // Variables
  /*******************************************************
   * All state initialization
   * *****************************************************/
  // Show time
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

  // For process show instead of button
  const [buttonProcess, setButtonProcess] = useState(false);
  const [showRocket, setShowRocket] = useState(false);

  // States for resetting to original values
  const [originPlanetList, setOriginPlanetList] = useState([]);
  const [originVehicleList, setOriginVehicleList] = useState([]);

  /********************************************************
   * URLs for GET and POST requests
   *********************************************************/
  const planetUrl = "https://findfalcone.geektrust.com/planets";
  const vehicleUrl = "https://findfalcone.geektrust.com/vehicles";
  /**
   * Enqueues a Snackbar notification to be displayed.
   * @param {string} message - The message to be displayed in the Snackbar.
   * @param {string} variant - The variant of the Snackbar (e.g., 'success', 'error', 'warning', 'info').
   */
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Generates a unique ID using the current timestamp and a random string.
   * @returns {string} - The generated unique ID.
   */
  const uniqueId = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  /**
   * Performs a search operation to find the queen using the selected planets and vehicles.
   * @returns {Promise} - A Promise that resolves to the search result data or null if an error occurs.
   */
  const findQueen = async () => {
    // Create arrays of selected planet and vehicle names
    const fPlanetList = state.selectedList.map((item) => item.planet);
    const fVehicleList = state.selectedList.map((item) => item.vehicle);

    try {
      // Make a POST request to the API to perform the search
      const res = await axios.post(
        "https://findfalcone.geektrust.com/find",
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

      // Return the search result data
      return res.data;
    } catch (e) {
      console.log(e.status);

      enqueueSnackbar("Something went wrong, please refresh", {
        variant: "error",
      });
      navigate("pagenotfound")
      console.log(e);
      return null;
    }
  };

  /**
   * Handles the post-processing after performing the search operation.
   * Shows a rocket animation, calls the findQueen function, and handles the search result.
   */
  const handlePostProcess = async () => {
    setShowRocket(true); // Show rocket animation

    let result = await findQueen(); // Perform the search operation
    console.log(result);

    setShowRocket(false); // Hide rocket animation

    if (result.status === "false") {
      // Search operation failed
      enqueueSnackbar("Search Operation Failed, Try Again", {
        variant: "error",
      });
      localStorage.setItem("status", "false");
      navigate("/failed");
      
    } else if (result.status === "success") {
      // Search operation successful
      localStorage.setItem("status", "success");
      localStorage.setItem("time", state.timetake);
      localStorage.setItem("planet_name", result.planet_name);
      navigate("/kudos");
    }
  };

  /**
   * Retrieves the token required for the search operation.
   * Sends a POST request to the token endpoint and returns the token data.
   * If an error occurs, it displays an error notification.
   * @returns {Object|null} The token data or null if an error occurred.
   */
  const getToken = async () => {
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
        "Please Check Your Internet Connection and Refresh the Page",
        {
          variant: "error",
        }

        );
        localStorage.clear();
        navigate("/pageNotFound");
      console.log(e);
      return null;
    }
  };

  /**
   * Sends a GET request to the specified URL and returns the response data.
   * If an error occurs, it displays an error notification.
   * @param {string} url - The URL to send the GET request to.
   * @returns {Object|null} The response data or null if an error occurred.
   */
  const req = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      enqueueSnackbar("Please Check Your Internet Connection", {
        variant: "error",
      });
      localStorage.clear();
      navigate("/pagenotfound");
      return null;
    }
  };

  /*****************************************************
   * useEffect Happen Here
   *****************************************************/
  useEffect(() => {
    const fetchData = async () => {
      const tokenResponse = await getToken();
      const planetResponse = await req(planetUrl);
      const vehicleResponse = await req(vehicleUrl);

      // Set planet list in the state
      setState({ task: "setPlanetList", payload: planetResponse });

      // Set vehicle list in the state
      setState({ task: "setVehicleList", payload: vehicleResponse });

      // Set the original planet list for reset functionality
      setOriginPlanetList(planetResponse);

      // Set the original vehicle list for reset functionality
      setOriginVehicleList(vehicleResponse);

      // Set the token in the state
      setState({ task: "setToken", payload: tokenResponse });

      
    };

    fetchData();
  }, []);

  // on Change of state
  /**
   * @handle time changing and button show when all 4 planets and vehicles are updated/selected
   */
  useEffect(() => {
    // Calculate the total distance and speed
    let tDistance = 0;
    let tSpeed = 0;

    state.selectedList.forEach((element) => {
      console.log(element.distance);
      tDistance += element.distance;
      tSpeed += element.speed;
    });

    console.log(tDistance, tSpeed);

    // Calculate the time taken based on the total distance and speed
    if (tDistance && tSpeed !== 0) {
      let finalAns = parseInt(tDistance / tSpeed);
      setState({ task: "timeSet", payload: finalAns });
    } else {
      setState({ task: "timeSet", payload: tDistance });
    }

    // Perform UI updates based on the state changes,
    showButton();
  }, [state.selectedList]);

  /**
   * @invoked when user clicks on the Reset button
   */
  const handleReset = () => {
    // Create a temporary array to reset the selectedList state
    let tempSelectedList = [
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
      { planet: "", vehicle: "", distance: 0, speed: 0 },
    ];

    // Update the state by calling setState with the task "resetDatabase" and providing the necessary payload
    setState({
      task: "resetDatabase",
      resetSelectedList: tempSelectedList,
      resetVehicleList: originVehicleList,
    });

    // Display a success message using the enqueueSnackbar function
    enqueueSnackbar(`Reset Successful`, { variant: "success" });
  };

  /**
   * @invoke on every time user select any planet or vehicle
   */
  const showButton = () => {
    let cnt = 0;

    // Loop through each item in the selectedList state
    state.selectedList.forEach((item) =>
      item.distance && item.speed !== 0 ? cnt++ : cnt
    );

    // Check if all four items in the selectedList have non-zero distance and speed values
    if (cnt === 4) {
      // If all items have non-zero values, set buttonProcess state to true
      setButtonProcess(true);
    }
  };

  /**
   * Renders the main component for the hero section of problem compenent where user can select planets and vehicles to find Queen Falcone.
   * @param {boolean} showRocket - Indicates whether to show the rocket image or not.
   * @param {string} rocketImage - The source URL of the rocket image.
   * @param {object} state - The state object containing selectedList, timetake, and vehicleList.
   * @param {function} handleReset - Event handler for resetting the selected planets and vehicles.
   * @param {function} handlePostProcess - Event handler for initiating the search operation.
   * @param {boolean} buttonProcess - Indicates whether the search operation is in progress or not.
   * @returns {JSX.Element} The hero section of Problem component JSX element.
   */

  return (
    <div className="hero">
      {showRocket && (
        <Box
          style={{ width: "500px", height: "500px", backgroundColor: "white" }}
        >
          <img
            src={rocketImage}
            width="50%"
            alt="Planet Image"
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
          {state.selectedList[0].planet !== "" && (
            <Alert severity="info">
              Please be cautious as you only have a single opportunity to select
              a vehicle.
            </Alert>
          )}
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
                onClick={handlePostProcess}
              >
                <LocationSearchingSharpIcon />
                <span>Start Search Operation</span>
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
