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
    if (context_app && context_app.data) {
      setAuthenticated(true);
      let email = context_app.data.email;

      const result = await searchAddressByEmail(email);

      if (result) {
        let publicaddress = result.public_address;
        setAddress(publicaddress);
        dispatch_app({
          type: "ADDRESS",
          address: publicaddress,
        });

        console.log("DASHBOARD DATA ADDRESS", context_app.address);
      }
    }
  }
  useEffect(() => {
    init();
    console.log("useEffect dashboard", address);
  }, [address]);

  return (
    <>
      {/* TODO Render according user Profile */}
      <Header />
      {address === "" ? (
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
      ) : (
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
          <Box>Your public address is: {address}</Box>
        </Box>
      )}
      <Footer />
    </>
  );
}
