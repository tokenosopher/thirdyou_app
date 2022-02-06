import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import { getTxs } from "../components/lib/ops";

const columns = [
  {
    field: "from",
    headerName: "From:",
    width: 333,
    editable: false,
  },
  {
    field: "to",
    headerName: "To: ",
    width: 333,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount Matic",
    type: "number",
    width: 100,
    editable: false,
  },
];

export default function Profile() {
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState({
    txs: "",
  });

  const [transactions, setTransactions] = useState([]);

  async function init() {
    let txs = await getTxs("0x5Df9E4f6839017EbBcB85324C3565954Fb6E63e3"); //TODO GRAB PUBLIC ADDRESS AFTER LOGIN
    let txs_array: any = [];

    if (txs) {
      setInfo({
        ...info,
        txs: txs.statusText,
      });
      txs.result.map((tx: any, key: any) => {
        txs_array.push({
          id: key,
          from: tx.from_address,
          to: tx.to_address,
          amount: (tx.value / 1000000000000000000).toFixed(4),
        });
      });
      setTransactions(txs_array);
      setLoaded(true);
    }
  }

  useEffect(() => {
    init();
  }, [loaded]);
  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
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
        {loaded ? (
          <Box
            display="flex"
            height="50vh"
            width="75%"
            my={4}
            bgcolor="white"
            color="black"
          >
            <DataGrid
              rows={transactions}
              columns={columns}
              pageSize={20}
              checkboxSelection={false}
            />
          </Box>
        ) : (
          <>
            <CircularProgress />
          </>
        )}
      </Box>
      <Footer />
    </>
  );
}
