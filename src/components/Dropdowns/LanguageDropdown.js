import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage } from "react-multi-lang";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  const t = useTranslation();
  const changeLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <Dropdown className="language-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <CiGlobe className="globe-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item
          href="#"
          className="lang-item"
          onClick={() => changeLang("ar")}
        >
          <strong>العربية</strong>
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          className="lang-item"
          onClick={() => changeLang("en")}
        >
          <strong>ENGLISH</strong>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
