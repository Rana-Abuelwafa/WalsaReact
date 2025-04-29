import React from "react";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaComments, FaQuestionCircle, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-multi-lang";
import "./ContactUs.scss";

const ContactUs = () => {
  const t = useTranslation();

  return (
    <>
      <MainNavbar />
      
      <div className="contact-us-section">
        <Container fluid className="content-section">
          <Row className="align-items-center contact-header">
            <Col lg={7} md={12} className="order-lg-1 order-md-1 order-2">
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.subtitle")}</p>
              <div className="social-icons">
                <a href="/" className="icon" aria-label="Facebook"><FaFacebookF /></a>
                <a href="/" className="icon" aria-label="Instagram"><FaInstagram /></a>
                <a href="/" className="icon" aria-label="Twitter"><FaTwitter /></a>
                <a href="mailto:contact@example.com" className="icon" aria-label="Email"><FaEnvelope /></a>
              </div>
            </Col>
            <Col lg={5} md={12} className="order-lg-2 order-md-2 order-1 text-center">
              <img
                src="/images/mail.png"
                alt="Contact Illustration"
                className="contact-image img-fluid"
              />
            </Col>
          </Row>

          <Row className="contact-cards">
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaComments className="icon mb-3" />
                  <Card.Title><h5>{t("contact.chatTitle")}</h5></Card.Title>
                  <Card.Text>
                    {t("contact.chatDesc").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button className="btn">{t("contact.chatBtn")}</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaEnvelope className="icon mb-3" />
                  <Card.Title><h5>{t("contact.emailTitle")}</h5></Card.Title>
                  <Card.Text>
                    {t("contact.emailDesc").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button className="btn">{t("contact.emailBtn")}</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} className="mb-4">
              <Card className="contact-card h-100">
                <Card.Body className="d-flex flex-column">
                  <FaQuestionCircle className="icon mb-3" />
                  <Card.Title><h5>{t("contact.helpTitle")}</h5></Card.Title>
                  <Card.Text>
                    {t("contact.helpDesc").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Card.Text>
                  <div className="mt-auto text-center">
                    <Button className="btn">{t("contact.helpBtn")}</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <MainFooter />
    </>
  );
};

export default ContactUs;