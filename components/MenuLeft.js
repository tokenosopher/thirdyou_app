import React from "react";
import { elastic as Menu } from "react-burger-menu";
import Link from "next/link";
import styled from "styled-components";

export default function MenuLeft(props) {
  const href_dashboard = "/dashboard";
  const href_profile = "/profile";
  const href_mint = "/mint";
  const href_home = "/";

  return (
    <div className="left">
      <Menu
        right
        styles={styles}
        disableAutoFocus
        pageWrapId={"page-wrap"}
        isOpen={props.navbarOpen}
        outerContainerId={"outer-container"}
        onClose={props.handleNavbar}
      >
        <Link id="home" href={href_home}>
          <a href={href_home} onClick={props.handleNavbar}>
            <StyleLink>Home</StyleLink>
          </a>
        </Link>

        <br></br>
        <Link id="dashboard" href={href_dashboard}>
          <a href={href_dashboard} onClick={props.handleNavbar}>
            <StyleLink>
              <span>Dashboard</span>
            </StyleLink>
          </a>
        </Link>
        <br></br>
        <Link id="profile" href={href_profile}>
          <a href={href_profile} onClick={props.handleNavbar}>
            <StyleLink>
              <span>Profile</span>
            </StyleLink>
          </a>
        </Link>
        <br></br>
        <Link id="min" href={href_mint}>
          <a href={href_mint} onClick={props.handleNavbar}>
            <StyleLink>
              <span>Mint NFT</span>
            </StyleLink>
          </a>
        </Link>
        <br></br>
      </Menu>
    </div>
  );
}

const StyleLink = styled.a`
  color: white;
  display: inline-block;
  margin: 20px;
  textdecoration: none;
  cursor: pointer;
  @font-face {
    font-family: Nunito Bold;
    src: url("./fonts/Nunito/Nunito-Bold.ttf") format("truetype");
    color: #ffffff;

    font-weight: 800;
    font-style: normal;
    font-display: auto;
  }
  font-family: Nunito Bold;
`;
var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "80vw",
    top: "36px",
  },

  bmBurgerBars: {
    background: "#FFFFFF",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "black",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    fontFamily: "Technical Forest",
  },
  bmMorphShape: {
    fill: "black",
    background: "black",
  },
  bmItemList: {
    color: "#828788",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
    color: "white",
    margin: "20px",
    textDecoration: "none",
  },

  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
