import { Button } from "@mui/material";
import "../style/PageNotFound.css";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="astronaut"></div>
      <div className="textHome">
        <Link className="link" to="/" sx={{ textDecoration: "none" }}>
          <Button variant="outlined"><HomeIcon/> Go to Home</Button>
        </Link>
      </div>
      <div className="textPlay">
        <Link className="link" to="/Problem" sx={{ textDecoration: "none" }}>
          <Button variant="outlined">Play</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
