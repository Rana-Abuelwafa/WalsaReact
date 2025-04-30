import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Row, Col ,Container} from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-multi-lang";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import MenuDropdown from "../Dropdowns/MenuDropdown";
import "./mainNavbar.scss";

const MainNavbar = () => {
  const [MyName, setMyName] = useState("");
  const navigate = useNavigate();
  const t = useTranslation(); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 992);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
      const userLocal = localStorage.getItem("user");
      if (userLocal) {
        const user = JSON.parse(userLocal);
        if (user) {
          setMyName(`${user.firstName} ${user.lastName}`);
        }
      }
    }, []);
 
  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid>
      <Navbar.Brand href="/" className="brand d-flex align-items-center">
        <img src="logo/wasla logo.png" alt="Logo" className="logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="nav-items d-none d-lg-flex"> */}
          <Nav className={`nav-items ${document.documentElement.dir === "rtl" ? "ms-auto" : "me-auto"}`}>
            <Nav.Link href="/" className="nav-item">
              {t("Navbar.home")}
            </Nav.Link>
            <Nav.Link href="/contactUs" className="nav-item">
          {t("Navbar.contact")}
        </Nav.Link>
        <Nav.Link href="/AboutUs" className="nav-item">
          {t("Navbar.about")}
        </Nav.Link>
        {/* <Nav.Link href="/" className="nav-item">
          {t("Navbar.pricing")}
        </Nav.Link>
        <Nav.Link href="/" className="nav-item">
          {t("Navbar.ourWork")}
        </Nav.Link> */}
      </Nav>
      
      <div className="d-flex align-items-center nav-icons">
            <GoSearch className="icon" />
            <Row className="user-info">
              <Col className="user-icon-col">
                <FiUser className="icon" onClick={() => MyName?navigate("/profile"):navigate("/login")} />
              </Col>
              <Col className="user-name-col">
                <span className="userName">{MyName}</span>
              </Col>
            </Row>
            <FiLogOut className="icon" onClick={logOut} />
            <LanguageDropdown />
            {!isMobile && <MenuDropdown />}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
