import React from "react";
import { Navbar } from "react-bootstrap";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import "./mainNavbar.scss";

const MiniNavbar = () => {
  return (
    <Navbar fixed="top" className="navbar-mini">
      <Navbar.Brand href="#" className="brand d-flex align-items-center">
        <img src="logo/wasla logo.png" alt="Logo" className="logo" />
      </Navbar.Brand>

      <div className="ms-auto d-flex gap-3 align-items-center nav-icons">
        <LanguageDropdown />
      </div>
    </Navbar>
  );
};

export default MiniNavbar;
