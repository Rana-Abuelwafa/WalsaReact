import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-multi-lang";
import "./mainFooter.scss";

const MainFooter = () => {
  const t = useTranslation();

  return (
    <footer className="footer" dir={t("dir")}>
      <hr className="custom-hr" />
      <Container>
        <Row className="footer-content">
          <Col md={4} className="footer-logo">
            <img 
              src="/logo/wasla logo.png" 
              alt="Logo" 
              className="footer-logo-img" 
            />
            <p className="small-text footer-description">
              {t("Footer.description")}
            </p>
            <div className="social-icons">
              <div className="icon"><FaFacebookF /></div>
              <div className="icon"><FaInstagram /></div>
              <div className="icon"><FaTwitter /></div>
              <div className="icon"><FaEnvelope /></div>
            </div>
          </Col>

          <Col md={4} className="footer-links">
            <h5>{t("Footer.company.title")}</h5>
            <ul>
              <li className="small-text">{t("Footer.company.home")}</li>
              <li className="small-text">{t("Footer.company.about")}</li>
              <li className="small-text">{t("Footer.company.pricing")}</li>
              <li className="small-text">{t("Footer.company.contact")}</li>
              <li className="small-text">{t("Footer.company.privacy")}</li>
            </ul>
          </Col>

          <Col md={4} className="footer-support">
            <h5>{t("Footer.support.title")}</h5>
            <ul>
              <li className="small-text">{t("Footer.support.helpCenter")}</li>
              <li className="small-text">{t("Footer.support.chat")}</li>
            </ul>
            <h5 className="mt-4">{t("Footer.ourNew")}</h5>
            <p className="small-text link-us">#Link_it_with_waslaa</p>
          </Col>
        </Row>
      </Container>
      <hr className="footer-hr" />
      <Container>
        <p className="copyright-text">
          {t("Footer.copyright")}
        </p>
      </Container>
    </footer>
  );
};

export default MainFooter;