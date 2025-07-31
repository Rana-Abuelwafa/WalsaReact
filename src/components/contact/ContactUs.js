import React, { useState } from "react";
import MainNavbar from "../navbars/mainNavbar";
import MainFooter from "../footer/mainFooter";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ContactModal from "../shared/SendMailModal/SendMailModal";
import {
  FaEnvelope,
  FaComments,
  FaQuestionCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useTranslation } from "react-multi-lang";
import SocialLinks from "../shared/SocialLink/SocialLinks";
import Chat from "../chatIcon/chat";
import "./ContactUs.scss";

const ContactUs = () => {
  const t = useTranslation();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <ContactModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      ) : null}
      {/* Main navigation at the top */}
      <MainNavbar />
      {/* Header section with text and image */}
      <div className="contact-us-section">
        <Container fluid className="content-section">
          <Row className="align-items-center contact-header">
            <Col lg={7} md={12} className="order-lg-1 order-md-1 order-2">
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.subtitle")}</p>

              {/* Social media icons */}
              <SocialLinks />
              {/* <div className="social-icons">
                <a href="/" className="icon" aria-label="Facebook"><FaFacebookF /></a>
                <a href="/" className="icon" aria-label="Instagram"><FaInstagram /></a>
                <a href="/" className="icon" aria-label="Twitter"><FaTwitter /></a>
                <a href="mailto:contact@example.com" className="icon" aria-label="Email"><FaEnvelope /></a>
              </div> */}
            </Col>

            {/* Illustration image */}
            <Col
              lg={5}
              md={12}
              className="order-lg-2 order-md-2 order-1 text-center"
            >
              <img
                src="/images/mail.png"
                alt="Contact Illustration"
                className="contact-image img-fluid"
              />
            </Col>
          </Row>

          {/* Contact option cards (Chat, Email, Help) */}
          <Row className="contact-cards">
            {/* Chat Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaComments className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.chatTitle")}</h5>
                  </Card.Title>
                  <Card.Text>
                    {t("contact.chatDesc")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <a
                      href="https://wa.me/201011111111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      {t("contact.chatBtn")}
                    </a>
                    {/* <Button className="btn"></Button> */}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Email Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaEnvelope className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.emailTitle")}</h5>
                  </Card.Title>
                  <Card.Text>
                    {t("contact.emailDesc")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button onClick={() => setShowModal(true)} className="btn">
                      {t("contact.emailBtn")}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Help Card */}
            <Col lg={4} md={12} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaQuestionCircle className="icon mb-3" />
                  <Card.Title>
                    <h5>{t("contact.helpTitle")}</h5>
                  </Card.Title>
                  <Card.Text>
                    {t("contact.helpDesc")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button onClick={() => setShowModal(true)} className="btn">
                      {t("contact.helpBtn")}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Footer at the bottom */}
      <MainFooter />
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default ContactUs;
