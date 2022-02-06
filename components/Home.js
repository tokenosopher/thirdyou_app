import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/Login'),
    { ssr: false }
)

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();

  return (
    <Box
      sx={{
        height: "85vh",
        opacity: 0.9,
        filter: "brightness(0.9)",
        position: "relative",
        top: 0,
        zIndex: 0,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        bgcolor: "black",
        flexDirection: "column",
      }}
    >
      <Image
        src="/images/background.jpeg"
        objectFit="cover"
        layout="fill"
        priority="true"
      />

      <Button onClick={() => router.push("/dashboard")}>
        <Image
          src="/images/logo.png"
          width="100%"
          height="100%"
          priority="true"
        />
      </Button>
      <DynamicComponentWithNoSSR />
    </Box>
  );
}

export default Home;
