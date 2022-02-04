import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Image from "next/image";
import { Box, TextField } from "@mui/material";

const client = ipfsHttpClient(process.env.INFURA_IPFS);

export default function MintForm() {
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
      const added = await client.add(file, {
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
