import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import "./mainNavbar.scss";

const MiniNavbar = () => {
  return (
    <Navbar fixed="top" className="navbar-mini">
      <Container>
        <Navbar.Brand href="/" className="brand">
          <img
            src="logo/wasla logo.png"
            alt="Logo"
            className="logo"
          />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <LanguageDropdown />
        </div>
      </Container>
    </Navbar>
  );
};

export default MiniNavbar;