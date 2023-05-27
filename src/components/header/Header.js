import React from "react";
// import "../style/Header.css";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

/*
@param {String
 */
export default function Header() {
  // {/* finding falcone! <reset | geetktrust home> */}
  // console.log("Header Loaded");
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <h1 id="homeLink"
        sx={{ marginLeft: "15px" }}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Finding Falcone
      </h1>
      <Box>
        <a
          href="https://www.geektrust.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="text" sx={{ color: "black", fontSize: "20px",color:"green" }}>
            GeekTrust Home
          </Button>
        </a>
      </Box>
    </Box>
  );
}
