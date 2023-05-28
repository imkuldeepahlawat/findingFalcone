import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

/**
 * Renders the SelectPlanet component.
 * Displays a dropdown menu to select a planet and shows a success alert if a planet is selected.
 *
 * @param {Object} props - The component props.
 * @param {number} props.idx - The index of the component instance.
 * @param {Object[]} props.state - The state object containing selected planets and distances.
 * @param {function} props.setState - The function to update the state object.
 * @param {string} props.uniqueId - The unique identifier for the component instance.
 */
const SelectPlanet = (props) => {
  const [tempPlanet, setTempPlanet] = React.useState("");

  /**
   * Handles the change event of the planet dropdown.
   * Updates the temporary planet state.
   *
   * @param {object} event - The event object.
   */
  const tempHandleChange = (event) => {
    setTempPlanet(event.target.value);
  };

  const { idx, state, setState, uniqueId } = props;

  return (
    <div>
      {state.selectedList[idx].planet !== "" && (
        <Alert severity="success">
          <AlertTitle>Selected {state.selectedList[idx].planet}</AlertTitle>
          <strong>Distance: {state.selectedList[idx].distance}</strong>
        </Alert>
      )}

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

          {state.planetList
            .filter(
              (planet) =>
                !Array.from(state.selectedList).some(
                  (item) => item.planet === planet.name
                )
            )
            .map((planet) => (
              <MenuItem key={planet.name} value={planet.name}>
                {`${planet.name}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPlanet;
