import SelectVehicle from "../selectVehicle/SelectVehicle";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const SelectPlanet = (props) => {
  const [tempPlanet, setTempPlanet] = React.useState("");

  const tempHandleChange = (event) => {
    setTempPlanet(event.target.value);
  };

  const { idx, state, setState, uniqueId } = props;
  // console.log(state);
  return (
    <div>
      {state.selectedList[idx].planet !== "" && (
        <Alert severity="success">
          <AlertTitle>Selected {state.selectedList[idx].planet}</AlertTitle>
          <strong>Distance:{state.selectedList[idx].distance}</strong>
        </Alert>
      )}
      {/* ********************
                  Planet part
                  ************************* */}
      {/* <h3>Destination {idx + 1}</h3> */}
      <FormControl
        variant="filled"
        sx={{ m: 1, minWidth: 120 }}
        success={tempPlanet !== "" ? true : false}
      >
        <InputLabel id={`${idx}label`}>Planet {idx + 1}</InputLabel>
        <Select
          value={tempPlanet}
          labelId={`${idx}label`}
          id={`planet${idx}`}
          // seting new planet as destiantion
          onChange={(e) => {
            setState({
              task: "selectedListPlanet",
              index: idx,
              planetName: e.target.value,
            });
          }}
        >
          <MenuItem value="-">
            <em>None</em>
          </MenuItem>
          {/**
                    planet List show
                     */}
          {state.planetList
            .filter(
              (planet) =>
                !Array.from(state.selectedList).some(
                  (item) => item.planet === planet.name
                )
            )
            .map((planet) => (
              <MenuItem value={planet.name}>{`${planet.name}`}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPlanet;
