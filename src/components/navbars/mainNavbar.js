import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-multi-lang";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import MenuDropdown from "../Dropdowns/MenuDropdown";
import "./mainNavbar.scss";

const MainNavbar = () => {
  const [MyName, setMyName] = useState("");
  const navigate = useNavigate();
  const t = useTranslation(); // Initialize translation
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    //console.log("lllll  ", userLocal);
    if (userLocal != null) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        const userName = user.firstName + " " + user.lastName;
        // console.log("userName ", user);
        setMyName(userName);
      }
    }

    return () => {};
  }, []);
  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Navbar.Brand href="/" className="brand d-flex align-items-center">
        <img src="logo/wasla logo.png" alt="Logo" className="logo" />
      </Navbar.Brand>
      <Nav className="nav-items d-none d-lg-flex">
        <Nav.Link href="/" className="nav-item">
          {t("Navbar.home")}
        </Nav.Link>
        {/* <Nav.Link href="/" className="nav-item">
          {t("Navbar.pricing")}
        </Nav.Link>
        <Nav.Link href="/" className="nav-item">
          {t("Navbar.ourWork")}
        </Nav.Link> */}
      </Nav>
      <div className="ms-auto d-flex gap-3 align-items-center nav-icons">
        <GoSearch className="icon" />
        <Row className="user">
          <Col md={4}>
            <FiUser className="icon" onClick={() => navigate("/login")} />
          </Col>
          <Col md={8} className="userCol">
            <span className="userName">{MyName}</span>
          </Col>
        </Row>

        <FiLogOut className="icon" onClick={logOut} />
        {/* <FiLogOut className="icon" onClick={() => navigate("/login")} /> */}
        <LanguageDropdown />
        <MenuDropdown />
      </div>
    </Navbar>
  );
};

export default MainNavbar;
