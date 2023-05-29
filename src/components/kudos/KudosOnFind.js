import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ufo from "../assets/ufo.gif";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import win3 from "../assets/win3.png";
import HomeIcon from "@mui/icons-material/Home";

import rocket from "../assets/rocket.gif";
import "../style/Kudos.css";

/**
 * Renders the KudosOnFind component.
 * Displays a congratulatory message and options to play again or go back home after finding the planet.
 */
export default function KudosOnFind() {
  const navigate = useNavigate();
  if (
    localStorage.getItem("planet_name") &&
    localStorage.getItem("status") === "success"
  ) {
    return (
      <div className="kudos">
        <Box className="kudosbox">
          <Button
            variant="contained"
            style={{ position: "absolute", left: 150 }}
            onClick={() => {
              localStorage.clear();
              navigate("/problem")
            }}
          >
            <RotateLeftIcon />
            Play Again
          </Button>
          <Button
            variant="contained"
            style={{ position: "absolute", right: 150 }}
            onClick={() => {
              localStorage.clear();
              navigate("/")
            }}
          >
            <HomeIcon />
            Home
          </Button>
          <img
            src={rocket}
            width="30%"
            alt="PlanetImage"
            loading="lazy"
            style={{}}
          />
          <h3 style={{ color: "white", fontSize: "25px" }}>
           Success Congratulations on Finding Falcone King Shan is mightypleased.
          </h3>
          <h3 style={{ color: "white", fontSize: "20px" }}>
            Found on{" "}
            <span style={{ color: "#00987E" }}>
              {localStorage.getItem("planet_name")}
            </span>{" "}
            Time Taken:-{" "}
            <span style={{ color: "#00987E" }}>
              {localStorage.getItem("time")}
            </span>
          </h3>
          <img src={win3} width="40%" alt="PlanetImage" loading="lazy" />
        </Box>
      </div>
    );
  } 
  else {
    return (
      <Box sx={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
        <h3 style={{ color: "#13253A", fontFamily: "sans-serif" }}>
          Welcome to the captivating world of Lengaburu in the galaxy of Tara B.
          Take on the challenge of finding Queen Al Falcone, exiled by King Shan
          for 15 years. Play the game to unravel secrets, overcome obstacles,
          and discover the truth. Your actions will shape your destiny, and only
          by playing will you unveil your score. Embark on this thrilling
          journey in "Unveil Your Destiny".
        </h3>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/Problem";
          }}
        >
          let the adventure begin!
        </Button>
      </Box>
    );
  }
}
