import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { useTranslation, getLanguage } from "react-multi-lang";
function UserDropDown(props) {
  const t = useTranslation();
  return (
    <Dropdown className="d-inline userDropDown" autoClose="inside">
      <Dropdown.Toggle id="user-dropdown" className="userDropDownBtn">
        {props.MyName} <FiUser className="icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">
          <Link to={props.MyName ? "/profile" : "/login"}>
            {" "}
            {t("Navbar.MyProfile")}
          </Link>
        </Dropdown.Item>
        <Dropdown.Item href="#">
          <Link to="/RegisterQues">{t("Navbar.MyQuestions")}</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;
