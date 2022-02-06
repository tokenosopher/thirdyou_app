import React from "react";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));
import { useState, useEffect } from "react";
import { getNfts } from "../components/lib/ops";

let images = [];
let names = [];

export default function Collection() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  async function load() {
    const result = await getNfts("0x5Df9E4f6839017EbBcB85324C3565954Fb6E63e3"); // GRAB THIS ADDRESS AFTER USER LOGS IN

    if (result !== undefined) {
      const nfts = result.result;
      setData(nfts);
      setLoaded(true);
    }
    console.log("Images > ", images);
    console.log("Names > ", names);
    console.log("Result Get Nfts > ", result.result);
    console.log("Result Get data Nfts > ", result.result);
  }

  useEffect(() => {
    load();
    Object.values(data).map((item) => {
      console.log("ITEM >>>>>", item);
      let obj = item.metadata;
      console.log("obj ", obj);
      let jsonObj = JSON.parse(obj);
      if (jsonObj) {
        let stringImg = JSON.stringify(jsonObj.url);
        console.log("stringImg ", stringImg);
        // console.log("position ", stringImg.indexOf("ipfs://"));
        if (stringImg.indexOf("ipfs://") > 0) {
          let cid = stringImg.substring(8, 54);
          console.log("SUBSTRING", cid);
          let url = "https://ipfs.io/ipfs/" + cid;
          images.push(url);
        }

        let stringName = JSON.stringify(jsonObj.name);
        console.log("stringName ", stringName);
        names.push(stringName);
        if (jsonObj.url) {
          console.log("before add image");
          images.push(jsonObj.url);
        }
        console.log("URL", jsonObj.url);
        setLoaded(true);
      }
    });

    return () => {};
  }, [loaded]);
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
        COLLECTION PAGE
      </Box>
      <Footer />
    </>
  );
}
