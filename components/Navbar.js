import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Link from "next/link";
import {useAppContext} from "./state/AppContext";

const Navbar = () => {
  const [headerStyle, setHeaderStyle] = useState({
    transition: "all 200ms ease-in",
  });
  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 1000,
    config: config.wobbly,
  });
  return (
    <>
      <NavBar style={{ ...headerStyle }}>
        <FlexContainer>
          <NavLinks style={linkAnimation}>
            <Link href="/dashboard">
              <a>{"Dashboard"}</a>
            </Link>
            <Link href="/profile">
              <a>{"Profile"}</a>
            </Link>
            <Link href="/mint">
              <a>{"Mint NFT"}</a>
            </Link>
            <Link href="/collection">
              <a>{"Your Collection"}</a>
            </Link>
          </NavLinks>
        </FlexContainer>
      </NavBar>
    </>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 10;
  font-size: 1.1rem;
  padding: 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1vw;
`;
const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;

  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  

  @font-face {
      font-family: Nunito Bold;
      src: url('./fonts/Nunito/Nunito-Bold.ttf') format('truetype');
      color: #FFFFFF;
    
      font-weight: 800;
      font-style: normal;
      font-display: auto;
    }
  font-family: Nunito Bold;
  display:flex;
  flex:1;

  align-items:flex-end;
  justify-content: flex-end;
  list-style-type: none;
  margin: auto 0;                  
  
   
  
  & a {
      color: #FFFFFF;
 
    text-transform: capitalize
    font-weight: 800;
    border-bottom: 1px solid transparent;
    margin: 0 1rem;                                   
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    z-index:10;
    display:flex;
    align-items: center; /* NEW */
    &:hover {
      color: #828788;
      border-bottom: 1px solid #828788;
    }
     
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
