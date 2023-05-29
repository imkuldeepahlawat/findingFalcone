import React from "react";

import { Box, Typography } from "@mui/material";
import "../style/Footer.css"

/**
 * Renders the Footer component.
 * Displays the footer text with a link to the coding problem.
 */
export default function Footer() {
  
  /**
   * Handles the click event on the Footer link.
   */
  const handleFooterLinkClick = () => {
    localStorage.clear();

  };
  return (
    <Box className="footer">
      <Box className="footer-text">
        Coding problem -{" "}
        <a
          target="_blank"
          href="https://www.geektrust.com/coding/detailed/space"
          style={{ color: "#00987E" }}
          onClick={handleFooterLinkClick}
        >
          www.geektrust.in/finding-falcone
        </a>
      </Box>
    </Box>
  );
}
