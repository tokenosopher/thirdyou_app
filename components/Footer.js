import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
      bgcolor="black"
      flexDirection="column"
      style={{
        height: "15vh",
        position: "relative",
        top: 0,
        zIndex: 1,
        opacity: 0.9,
        filter: "brightness(0.9)",
      }}
    >
      <Box
        style={{
          marginTop: "2.5vw",
          color: "white",
          fontSize: "1vw",
          fontWeight: "bold",
          textShadow: "2px 2px 4px black",
          opacity: "0.9",
          lineHeight: "1.5",
          textTransform: "uppercase",
          letterSpacing: "0.2rem",
        }}
      >
        <Link id="facebook" href={"https://www.facebook.com"}>
          <a href={"https://www.facebook.com"}>
            <StyleLink>
              <FacebookIcon style={{ fontSize: "2.5vw" }} />
            </StyleLink>
          </a>
        </Link>

        <Link id="instagram" href={"https://www.instagram.com/"}>
          <a href={"https://www.instagram.com/"}>
            <StyleLink>
              <InstagramIcon style={{ fontSize: "2.5vw" }} />
            </StyleLink>
          </a>
        </Link>

        <Link id="twitter" href={"https://twitter.com/"}>
          <a href={"https://twitter.com/"}>
            <StyleLink>
              <TwitterIcon style={{ fontSize: "2.5vw" }} />
            </StyleLink>
          </a>
        </Link>
      </Box>
      <Box
        style={{
          color: "white",
          fontSize: "1vw",

          textShadow: "2px 2px 4px black",
          opacity: "0.9",
          lineHeight: "1.5",
          margin: "0 0 1rem 0",
          textTransform: "uppercase",
          letterSpacing: "0.2rem",
        }}
      >
        ® ThirdYOU 2022
      </Box>
    </Box>
  );
}

const StyleLink = styled.a`
  color: white;
  display: inline-block;
  textdecoration: none;
  cursor: pointer;
`;
