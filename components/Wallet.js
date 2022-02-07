import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { createWalletOps } from "../components/lib/ops";
import { CircularProgress } from "@mui/material";
import { useAppContext } from "../components/state/AppContext";

export default function Wallet() {
  const [walletStatus, setWalletStatus] = useState("");
  const context_app = useAppContext();
  let email = context_app.data.email;
  async function createWallet() {
    console.log("Creating Wallet ");
    const wallet = await createWalletOps(email);
    console.log("Wallet created > ", wallet);
    if (wallet) setWalletStatus("loaded");
  }
  useEffect(() => {
    console.log("useEffect");
  }, [walletStatus]);
  return walletStatus === "" ? (
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
          setWalletStatus("loading");
          createWallet();
        }}
      >
        Create Wallet
      </Button>
    </Box>
  ) : walletStatus === "loading" ? (
    <CircularProgress />
  ) : walletStatus === "loaded" ? (
    <>
      Congratulations.
      <br /> Your wallet has been created. <br /> And your keys have been sent.
    </>
  ) : (
    <></>
  );
}
