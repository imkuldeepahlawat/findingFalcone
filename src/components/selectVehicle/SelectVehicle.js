import { Select } from "@mui/material";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const uniqueId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const SelectVehicle = (props) => {
  const { idx, state, vehicle, setState } = props;
  console.log(state);
  let uId = uniqueId();
  return (
    state.selectedList[idx].planet !== "" && (
      <FormControl>
        <FormLabel id={uId}>Vehicle List {idx+1}</FormLabel>
        <RadioGroup
          aria-labelledby={uId}
          
          name="radio-buttons-group"
        >
          {state.vehicleList.map((vehicle) => {
            let vId = uniqueId();
            return (
              <FormControlLabel
                value={vehicle.name}
                control={<Radio />}
                disabled={
                  vehicle.total_no <= 0 || state.selectedList[idx].vehicle != ""
                }
                label={`${vehicle.name} (${vehicle.total_no}) Max-Distance:${vehicle.max_distance}`}
                onClick={(event) => {
                  // set radio list
                  console.log(event.target.value);
                  setState({
                    task: "selectedListVehical",
                    index: idx,
                    vehicleName: vehicle.name,
                  });
                }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    )
  );
};

export default SelectVehicle;
