import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { ethers } from "ethers";
import ThirdYou from "../build/contracts/ThirdYou.json";
import Web3Modal from "web3modal";

const IPFS_CLIENT = ipfsHttpClient(process.env.INFURA_IPFS);
const RECIPIENT_ADDRESS = "0xE7ab2D31396a89F91c4387ad88BBf94f590e8eB1"; //RECIPIENT ADDRESS - OWNER OF THE NFT
const THIRDYOU_CONTRACT = "0x30d61d33D04c5aF66A5799A9e8d253212C60EC1f"; //ADDRESS OF THE CONTRACT

export default function MintForm(address) {
  const [fileUrl, setFileUrl] = useState(null);
  const updateField = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await IPFS_CLIENT.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("URL> ", url);
      setFileUrl(url);
      item.url = url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  const [item, setItem] = useState({
    name: "",
    description: "",
    url: "",
  });

  async function uploadMetadata(item) {
    try {
      const added = await IPFS_CLIENT.add(Buffer.from(JSON.stringify(item)), {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("URL> ", url);
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
      return error;
    }
  }

  async function handleMint(item, address) {
    //console.log("web3Modal.cachedProvider()", web3Modal.cachedProvider);
    console.log("HANDLEMINT <<<<<<<<<<<");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const uploadedMetadata = await uploadMetadata(item);

    console.log("MetaData", uploadedMetadata); //URI TO MINT
    console.log("Origin Address", address);

    //NOW HERE I HAVE THE METADATA, AND THE RECIPIENT TO CALL SMART CONTRACT

    console.log(
      "RECIPIENT_ADDRESS> ",
      RECIPIENT_ADDRESS,
      " ThirdYou.abi",
      ThirdYou.abi
    );
    console.log("SIGNER> ", signer);
    let contract = new ethers.Contract(THIRDYOU_CONTRACT, ThirdYou.abi, signer);
    let transaction = await contract.mint(RECIPIENT_ADDRESS, uploadedMetadata);
    let tx = await transaction.wait();
    let event = tx.events[0];
    console.log("mint ((((((())))))) EVENT", event);
    let value = event.args[2];
    console.log("mint ((((((())))))) VALUE", value);
    let mintedId = value.toNumber();
    console.log("mint ((((((())))))) mintedID", mintedId);
  }

  return (
    <Box
      bgcolor="white"
      width="75%"
      sx={{ bgcolor: "white" }}
      height="50%"
      mx={4}
      px={3}
      display="flex"
    >
      <Box width="50%">
        <Box component="div" my={3}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            size="small"
            value={item.name || ""}
            onChange={updateField}
          />
        </Box>
        <Box component="div" my={3}>
          <TextField
            fullWidth
            name="description"
            id="description"
            label="Description"
            variant="outlined"
            size="small"
            value={item.description || ""}
            onChange={updateField}
          />
        </Box>
        <br />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        <br /> <br />
        <button
          onClick={() => {
            console.log("This is your item> ", item);

            handleMint(item, address, RECIPIENT_ADDRESS);
          }}
        >
          Create Digital Asset
        </button>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        height="50%"
        px={4}
        my={4}
      >
        {fileUrl && <Image src={fileUrl} width={200} height={200} />}
      </Box>
    </Box>
  );
}
