import React from "react";
import { Box, Button } from "@mui/material";

export default function Wallet() {
  async function createWallet() {
    console.log("Creating Wallet ");
  }
  return (
    <Box
      sx={{
        height: "50vh",
        opacity: 0.9,
        width: "80%",
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
      New to 3.0 world ?
      <br />
      <br />
      <br />
      Lets set you up.
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          createWallet();
        }}
      >
        Create Wallet
      </Button>
    </Box>
  );
}
