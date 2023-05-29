import { Button } from "@mui/material";
import "../style/PageNotFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

/**
 * Renders the NotFound component.
 * Displays a page not found message with options to go back to the home page or play.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="astronaut"></div>
      <div className="textHome">
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <HomeIcon /> Go to Home
        </Button>
      </div>
      <div className="textPlay">
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            navigate("/problem");
          }}
        >
          Play
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
