import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

/**
 * Renders the header component.
 */
export default function Header() {
  /**
   * Handles the click event on the home link.
   */
  const handleHomeLinkClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <h1
        id="homeLink"
        sx={{ marginLeft: "15px" }}
        onClick={handleHomeLinkClick}
      >
        Finding Falcone
      </h1>
      <Box>
        <a
          href="https://www.geektrust.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="text" sx={{ color: "black", fontSize: "20px", color: "green" }}>
            GeekTrust Home
          </Button>
        </a>
      </Box>
    </Box>
  );
}
