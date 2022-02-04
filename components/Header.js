import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import Navbar from "./Navbar";
import styled from "styled-components";

export default function Header() {
  const [navbarOpen, setnavbarOpen] = useState();
  const handleNavbar = () => {
    setnavbarOpen(!navbarOpen);
  };

  return (
    <div id="outer-container">
      <ButtonContainer>
        <MenuLeft navbarOpen={navbarOpen} handleNavbar={handleNavbar} />
      </ButtonContainer>
      <div id="page-wrap">
        <Navbar navbarState={navbarOpen} handleNavbar={handleNavbar} />
      </div>
    </div>
  );
}

const ButtonContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;
