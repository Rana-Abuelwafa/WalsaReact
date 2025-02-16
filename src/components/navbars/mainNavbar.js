import React from "react";
import {Navbar,Nav,Dropdown,Row,Col} from "react-bootstrap";
import {FaCommentDots,FaBullhorn} from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { CiGlobe, CiMenuFries } from "react-icons/ci";
import LanguageDropdown from '../Dropdowns/LanguageDropdown';
import MenuDropdown from '../Dropdowns/MenuDropdown';
import "./mainNavbar.scss";
const MainNavbar = () => {
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
          <FiUser className="icon" />
          <LanguageDropdown /> 
          <MenuDropdown />
          {/* <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="dropdown-toggle-custom"
            >
              <CiMenuFries className="icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdown-menu-custom">
              <Row className="">
                <Col md={6} className="">
                  <Dropdown.Item href="#" className="dropdown-item-custom">
                    <FaCommentDots className="me-2" /> CHAT
                  </Dropdown.Item>
                </Col>
                <Col md={6} className="">
                  <Dropdown.Item href="#" className="dropdown-item-custom">
                    <FaBullhorn className="me-2" /> MARKETING
                  </Dropdown.Item>
                </Col>
              </Row>
              <Row className="">
                <Col md={6} className="">
                  <Dropdown.Item href="#" className="dropdown-item-custom">
                    <FaCommentDots className="me-2" /> CHAT
                  </Dropdown.Item>
                </Col>
                <Col md={6} className="">
                  <Dropdown.Item href="#" className="dropdown-item-custom">
                    <FaBullhorn className="me-2" /> MARKETING
                  </Dropdown.Item>
                </Col>
              </Row>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </Navbar>
       );
}

export default MainNavbar;