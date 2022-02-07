import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { ethers } from "ethers";
import ThirdYou from "../components/config/ThirdYou.json"; //JSON of the contract to interact with the frontend
import Web3Modal from "web3modal";

const IPFS_CLIENT = ipfsHttpClient(process.env.INFURA_IPFS);

//SECOND STEP TO MINT DEFINE

const THIRDYOU_CONTRACT = "0x3A40E35aae6333437beEFf55ffb546662d7b9104"; //CONSTANT FROM DEPLOYMENT : ADDRESS OF THE CONTRACT

export default function MintForm(address) {
  const RECIPIENT_ADDRESS = address; //GRAB AFTER LOGIN - PUBLIC ADDRESS - OWNER OF THE NFT
  const [message, setMessage] = useState("");
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

  async function handleMint(item) {
    console.log(">>>>>>>>>>>>> HANDLEMINT <<<<<<<<<<<");
    const uploadedMetadata = await uploadMetadata(item); //Upload Metadata to IPFS
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect(); //Will open MetaMask

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //Verifies signer
    //NOW HERE I HAVE THE METADATA, AND THE RECIPIENT TO CALL SMART CONTRACT
    console.log("MetaData URI for the NFT", uploadedMetadata); //URI TO MINT
    console.log("Origin Address", RECIPIENT_ADDRESS.address);
    console.log("SIGNER> ", signer);
    let contract = new ethers.Contract(THIRDYOU_CONTRACT, ThirdYou.abi, signer);
    let transaction = await contract.mint(
      RECIPIENT_ADDRESS.address,
      uploadedMetadata
    );
    let tx = await transaction.wait();
    let event = tx.events[0];
    console.log("mint ((((((())))))) EVENT", event);
    let value = event.args[2];
    console.log("mint ((((((())))))) VALUE", value);
    let mintedId = value.toNumber();
    console.log("mint ((((((())))))) mintedID", mintedId);
    setMessage("Congratulations! NFT minted.");
  }
  useEffect(() => {
    console.log("useEffect");
  }, [message]);

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
            console.log("This is your item to mint> ", item);
            handleMint(item);
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
        flexDirection="column"
      >
        {fileUrl && <Image src={fileUrl} width={200} height={200} />}
        <Box color="black">{message}</Box>
      </Box>
    </Box>
  );
}
