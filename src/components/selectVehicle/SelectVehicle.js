import { Select } from "@mui/material";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/**
 * Renders the SelectVehicle component.
 * Displays a list of vehicles as radio buttons and allows selecting a vehicle.
 *
 * @param {Object} props - The component props.
 * @param {number} props.idx - The index of the component instance.
 * @param {Object[]} props.state - The state object containing selected planets and vehicles.
 * @param {Object} props.vehicle - The vehicle object.
 * @param {function} props.setState - The function to update the state object.
 */
const SelectVehicle = (props) => {
  const { idx, state, vehicle, setState } = props;

  /**
   * Generates a unique identifier.
   *
   * @returns {string} - The unique identifier.
   */
  const uniqueId = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  let uId = uniqueId();

  return (
    state.selectedList[idx].planet !== "" && (
      <FormControl>
        <FormLabel id={uId}>Vehicle List {idx + 1}</FormLabel>
        <RadioGroup aria-labelledby={uId} name="radio-buttons-group">
          {state.vehicleList.map((vehicle) => {
            let vId = uniqueId();
            return (
              <FormControlLabel
                key={vId}
                value={vehicle.name}
                control={<Radio />}
                disabled={
                  vehicle.total_no <= 0 || state.selectedList[idx].vehicle !== ""
                }
                label={`${vehicle.name} (${vehicle.total_no}) Max-Distance: ${vehicle.max_distance}`}
                onClick={(event) => {
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
