import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-multi-lang";
import SocialLinks from "../shared/SocialLink/SocialLinks";
import "./mainFooter.scss";

const MainFooter = () => {
  const t = useTranslation(); // Hook for translation

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // useEffect to scroll to top when component mounts (optional behavior)
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    // Main footer element with dynamic direction based on translation
    <footer className="footer" dir={t("dir")}>
      {/* Decorative horizontal line */}
      <hr className="custom-hr" />

      <Container>
        <Row className="footer-content">
          {/* Column for logo and social icons */}
          <Col md={4} className="footer-logo">
            <img
              src="/logo/wasla logo.png"
              alt="Logo"
              className="footer-logo-img"
            />
            <p className="small-text footer-description">
              {t("Footer.description")}
            </p>

            {/* Social media icons */}
            <SocialLinks />
            {/* <div className="social-icons">
              <div>
                <Link
                  to="https://www.facebook.com/Waslaa.de"
                  className="icon"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>
              </div>
              <div>
                <Link
                  to="https://www.instagram.com/waslaa.de"
                  className="icon"
                  target="_blank"
                >
                  <FaInstagram />
                </Link>
              </div>
              <div>
                <Link
                  to="https://x.com/waslaade"
                  className="icon"
                  target="_blank"
                >
                  <FaTwitter />
                </Link>
              </div>
              <div>
                <Link
                  to="https://www.instagram.com/waslaa.de"
                  className="icon"
                  target="_blank"
                >
                  <FaEnvelope />
                </Link>
              </div>
            </div> */}
          </Col>

          {/* Column for company-related links */}
          <Col md={4} className="footer-links">
            <h5>{t("Footer.company.title")}</h5>
            <ul>
              <Link to="/" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.company.home")}</li>
              </Link>
              {/* Navigates to About Us page and scrolls to top */}
              <Link to="/AboutUs" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.company.about")}</li>
              </Link>
              <Link to="/pricing" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.company.pricing")}</li>
              </Link>
              {/* <li className="small-text">{t("Footer.company.pricing")}</li> */}

              {/* Navigates to Contact Us page and scrolls to top */}
              <Link to="/contactUs" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.company.contact")}</li>
              </Link>

              <li className="small-text">{t("Footer.company.privacy")}</li>
            </ul>
          </Col>

          {/* Column for support links and hashtag */}
          <Col md={4} className="footer-support">
            <h5>{t("Footer.support.title")}</h5>
            <ul>
              {/* Navigates to Contact Us page and scrolls to top */}
              <Link to="/contactUs" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.support.helpCenter")}</li>
              </Link>
              <Link to="/contactUs" onClick={scrollToTop}>
                <li className="small-text">{t("Footer.support.chat")}</li>
              </Link>
            </ul>

            {/* Footer slogan or hashtag */}
            <h5 className="mt-4">{t("Footer.ourNew")}</h5>
             <Link to="/contactUs" onClick={scrollToTop}>
              <p className="small-text link-us">#Link_it_with_waslaa</p>
             </Link> 
             
          </Col>
        </Row>
      </Container>

      {/* Bottom divider */}
      <hr className="footer-hr" />

      {/* Copyright */}
      <Container>
        <p className="copyright-text">{t("Footer.copyright")}</p>
      </Container>
    </footer>
  );
};

export default MainFooter;
