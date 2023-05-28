import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ufo from "../assets/ufo.gif";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import win3 from "../assets/win3.png";
import HomeIcon from "@mui/icons-material/Home";

import rocket from "../assets/rocket.gif";
import "../style/SearchFailed.css";

/**
 * Renders the KudosOnFind component.
 * Displays a congratulatory message and options to play again or go back home after finding the planet.
 */
export default function SearchFailed() {
  if (localStorage.getItem("status") === "false") {
    return (
      <div className="gameOver">
        <Box className="gameOverBox">
          <Button
            variant="contained"
            style={{ position: "absolute", left: 150 }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/Problem";
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
              window.location.href = "/";
            }}
          >
            <HomeIcon />
            Home
          </Button>
          <h3 style={{color:"red", fontSize: "25px" }}>
            <span>Game Over</span>
          </h3>
          <h3 style={{ color: "white", fontSize: "25px" }}>
            You try again. You fail better.
          </h3>
          <img
            src={ufo}
            width="90%"
            alt="PlanetImage"
            loading="lazy"
            style={{}}
          />
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
