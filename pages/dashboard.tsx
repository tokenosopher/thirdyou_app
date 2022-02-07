import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
import { searchAddressByEmail } from "../components/lib/dbUtil";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import { useAppContext } from "../components/state/AppContext";
import { useDispatchContext } from "../components/state/AppContext";
import Wallet from "../components/Wallet";
export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [address, setAddress] = useState("");

  const context_app = useAppContext();
  const dispatch_app = useDispatchContext();

  async function init() {
      debugger;
    if (context_app && context_app.data) {
      setAuthenticated(true);
      const result = await searchAddressByEmail(
        context_app.data.email
      );
      console.log("DASHBOARD DATA", context_app.data);
      console.log("DASHBOARD result", result.public_address);

      setAddress(result.public_address);
      dispatch_app({
        type: "ADDRESS",
        address: address,
      });

      console.log("DASHBOARD DATA", context_app.data);
    }
  }
  useEffect(() => {
    init();
    console.log("useEffect dashboard", address);
  }, []);

  return (
    <>
      {/* TODO Render according user Profile */}
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
        <Wallet />
      </Box>
      <Footer />
    </>
  );
}
