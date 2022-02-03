import React from "react";
import { Box, Button } from "@mui/material";

export default function dashboard() {
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      Hi You are in Dashboard
    </Box>
  );
}
