import React from "react";
import { useNavigate } from "react-router-dom";
import {Navbar,Nav,Dropdown,Row,Col} from "react-bootstrap";
import {FaCommentDots,FaBullhorn} from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { CiGlobe, CiMenuFries } from "react-icons/ci";
import LanguageDropdown from '../Dropdowns/LanguageDropdown';
import MenuDropdown from '../Dropdowns/MenuDropdown';
import "./mainNavbar.scss";
const MainNavbar = () => {
  const navigate = useNavigate();
    return (  
    <Navbar fixed="top" expand="lg" className="navbar-custom">
        <Navbar.Brand href="#" className="brand d-flex align-items-center">
          <img src="logo/wasla logo.png" alt="Logo" className="logo" />
        </Navbar.Brand>
        <Nav className="nav-items d-none d-lg-flex">
          <Nav.Link href="#" className="nav-item">
            HOME
          </Nav.Link>
          <Nav.Link href="#" className="nav-item">
            PRICING
          </Nav.Link>
          <Nav.Link href="#" className="nav-item">
            OUR WORK
          </Nav.Link>
        </Nav>
        <div className="ms-auto d-flex gap-3 align-items-center nav-icons">
          <GoSearch className="icon" />
          <Row className="user">
            <Col md={6}>
             <FiUser className="icon" onClick={() => navigate("/login")}/>
            </Col>
            <Col md={6} className="userCol">
             <span className="userName"> User </span>
            </Col>
          </Row>
          <LanguageDropdown /> 
          <MenuDropdown />
        </div>
      </Navbar>
       );
}

export default MainNavbar;