import React from "react";
import { Box, Button, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getNfts } from "../components/lib/ops";
import { CircularProgress } from "@mui/material";
import { useAppContext } from "../components/state/AppContext";

const CarrouselNoSSR = dynamic(() => import("react-material-ui-carousel"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));
let images = [];
let names = [];

export default function Collection() {
  const context_app = useAppContext();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function load() {
    console.log("LOAD COLLECTION");
    const address = context_app.address;
    console.log("LOAD COLLECTION", address);
    const result = await getNfts(address); // GRAB THIS ADDRESS AFTER USER LOGS IN

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
        {loaded ? (
          <Box>
            <br /> <br />
            The collection of your beatiful NTFs are: <br /> <br />
            <CarrouselNoSSR>
              {images.map((item, i) => (
                <Paper key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: "1",
                      background: "white",
                      height: "60vh",
                    }}
                  >
                    <Box>
                      <h2> {names[i]}</h2>
                    </Box>

                    <Box>
                      {" "}
                      <Image src={images[i]} width={444} height={444} />
                    </Box>
                  </Box>
                </Paper>
              ))}
            </CarrouselNoSSR>
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Footer />
    </>
  );
}
