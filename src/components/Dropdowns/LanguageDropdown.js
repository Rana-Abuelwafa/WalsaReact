import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage } from "react-multi-lang";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  const t = useTranslation();
  return (
    <Dropdown className="language-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <CiGlobe className="globe-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item href="#" className="lang-item" onClick={() => setLanguage("ar")}>
        <strong>العربية</strong>
        </Dropdown.Item>
        <Dropdown.Item href="#" className="lang-item" onClick={() => setLanguage("en")}>
          <strong>ENGLISH</strong>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;