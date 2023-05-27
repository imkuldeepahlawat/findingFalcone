import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import planetImage from "../assets/planets.jpg";
import vehicleImage from "../assets/vehicles.jpg";
import "../style/Home.css";

export default function Home() {
  console.log("aaya");
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
        <Typography sx={{ fontFamily: "sans-serif", fontSize: "25px",alignContent:"left" }}>
          Our problem is set in the planet of Lengaburu...in the distant distant
          galaxy of Tara B. After the recent war with neighbouring planet
          Falicornia, King Shan has exiled the Queen of Falicornia for 15
          years.Queen Al Falcone is now in hiding. But if King Shan can find her
          before the years are up, she will be exiled for another 15 years....
          <img
            src={planetImage}
            width="100%"
            alt="PlanetImage"
            loading="lazy"
          />
          Help King Shan to choose the planets to search, and the vehicles to
          use in
          <Link className="link" to="/Problem" sx={{ textDecoration: "none" }}>
            <Button sx={{ fontFamily: "sans-serif", fontSize: "25px" }}>
              {" "}
              Finding falcone
            </Button>
          </Link>
          <img
            src={vehicleImage}
            width="100%"
            alt="PlanetImage"
            loading="lazy"
          />
        </Typography>
      </Box>
    </>
  );
}
