import React from "react";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaComments, FaQuestionCircle, FaFacebookF, FaTwitter, FaInstagram, FaPrint } from "react-icons/fa";
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
          <Col md={7}>
            <h2>{t("contact.title")}</h2>
            <p>{t("contact.subtitle")}</p>
            <div className="social-icons">
                <div className="icon"><FaFacebookF /></div>
                <div className="icon"><FaInstagram /></div>
                <div className="icon"><FaTwitter /></div>
                <div className="icon"><FaEnvelope /></div>
            </div>
          </Col>
          <Col md={5}>
            <img
              src="/images/mail.png"
              alt="Contact Illustration"
              className="contact-image"
            />
          </Col>
        </Row>

        <Row className="contact-cards">
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <FaComments className="icon" />
                <Card.Title><h5>{t("contact.chatTitle")}</h5></Card.Title>
                <Card.Text><p>{t("contact.chatDesc").split("\n").map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}</p></Card.Text>
                <div className="text-center">
                <Button className="btn">{t("contact.chatBtn")}</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <FaEnvelope className="icon" />
                <Card.Title><h5>{t("contact.emailTitle")}</h5></Card.Title>
                <Card.Text><p>{t("contact.emailDesc").split("\n").map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}</p></Card.Text>
                <div className="text-center">
                <Button className="btn">{t("contact.emailBtn")}</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="contact-card">
              <Card.Body>
                <FaQuestionCircle className="icon" />
                <Card.Title><h5>{t("contact.helpTitle")}</h5></Card.Title>
                <Card.Text><p>{t("contact.helpDesc").split("\n").map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}</p></Card.Text>
                <div className="text-center">
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
