import React from "react";
import { Box, Typography } from "@mui/material";
import "../style/Footer.css"
// import "../style/Footer.css";

export default function Footer() {
  // this is foooter component
  return (
    <Box className="footer">
      <Box className="footer-text">
        Coding problem -{" "}
        <a
          target="_blank"
          href="https://www.geektrust.com/coding/detailed/space"
          style={{color:"#00987E"}}
        >
          www.geektrust.in/finding-falcone
        </a>
      </Box>
    </Box>
  );
}
