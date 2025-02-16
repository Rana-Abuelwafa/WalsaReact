import React from "react";
import {
    Container,
    Row,
    Col
  } from "react-bootstrap";
  import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaEnvelope
  } from "react-icons/fa";
import "./mainFooter.scss";
const MainFooter = () => {
    return(
    <footer className="footer">
            <hr className="custom-hr" />
            <Row className="footer-content">
              <Col md={4} className="footer-logo">
                <img
                  src="/logo/wasla logo.png"
                  alt="Logo"
                  className="footer-logo-img"
                />
                <p className="small-text footer-description">
                  Waslaa aims to make your brand successful <br />
                  through the access of your customers to <br />
                  your brand with ease.
                </p>
                <div className="social-icons">
                  <div className="icon">
                    <FaFacebookF />
                  </div>
                  <div className="icon">
                    <FaInstagram />
                  </div>
                  <div className="icon">
                    <FaTwitter />
                  </div>
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                </div>
              </Col>
              <Col md={4} className="footer-links">
                <h5>Company</h5>
                <ul>
                  <li className="small-text">Home</li>
                  <li className="small-text">About</li>
                  <li className="small-text">Pricing</li>
                  <li className="small-text">Contact</li>
                  <li className="small-text">Privacy</li>
                </ul>
              </Col>
              <Col md={4} className="footer-support">
                <h5>Support</h5>
                <ul>
                  <li className="small-text">Help Center</li>
                  <li className="small-text">Chat with us</li>
                  <li>
                    {" "}
                    <br />
                  </li>
                </ul>
                <h5>Our New</h5>
                <p className="small-text link-us">#Link_it_with_waslaa</p>
              </Col>
            </Row>
            <hr className="footer-hr" />
            <p className="text-left small-text copy-righ">
              Copyright © Waslaa Inc. 2024-2025 - All Rights Reserved
            </p>
    </footer>
);
}

export default MainFooter;
