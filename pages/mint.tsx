import React from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));
import MintForm from "../components/MintForm";

export default function Mint() {
  const address = "0xb03E33aED36644E77c544BA6Fadeaf6d9b5c134c"; // TODO SET THIS UP IN THE STATE AFTER LOGIN
  return (
    <>
      <Header />
      <Box
        sx={{
          height: "85vh",
          opacity: 0.9,
          filter: "brightness(0.9)",
          position: "relative",
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          bgcolor: "black",
          color: "white",
          flexDirection: "column",
        }}
      >
        <MintForm address={address} />
      </Box>
      <Footer />
    </>
  );
}
