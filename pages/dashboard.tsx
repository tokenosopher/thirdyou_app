import React from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import { useAppContext } from "../components/state/AppContext";
import { useDispatchContext } from "../components/state/AppContext";
import Wallet from "../components/Wallet";
export default function dashboard() {

    const context_app = useAppContext();
    const dispatch_app = useDispatchContext();

    if (context_app && context_app.data) {

    }
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
