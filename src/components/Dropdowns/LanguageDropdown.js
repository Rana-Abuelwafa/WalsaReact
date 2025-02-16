import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  return (
    <Dropdown className="language-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <CiGlobe className="globe-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item href="#" className="lang-item">
        <strong>العربية</strong>
        </Dropdown.Item>
        <Dropdown.Item href="#" className="lang-item">
          <strong>ENGLISH</strong>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;