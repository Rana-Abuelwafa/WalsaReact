import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-multi-lang";
import MainNavbar from '../navbars/mainNavbar';
import SaleNavbar from '../navbars/saleNavbar';
import MainFooter from '../footer/mainFooter';
import Chat from '../chatIcon/chat';
import OfferPopup from '../OfferPopup/OfferPopup';
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.scss";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const t = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <OfferPopup />
          <MainNavbar />
          <SaleNavbar />
          <div className="content-section">
            {/* Hero Section */}
            <div className="hero-section">
              <Row className="align-items-center">
                <Col md={6} className="text-center text-md-start">
                  <h1 className="hero-heading">{t("Home.hero_title").split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line} <br />
                    </React.Fragment>
                  ))}</h1>
                  <p className="hero-text">{t("Home.hero_text").split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line} <br />
                    </React.Fragment>
                  ))}</p>
                  <Button className="cta-button" onClick={() => navigate("/login")}>{t("Home.get_started")}</Button>
                </Col>
                <Col md={6} className="text-center">
                  <img src="images/webs3.png" alt="Illustration" className="illustration" />
                </Col>
              </Row>
            </div>

            {/* Services Section */}
            <div className="services-section">
              <Row className="service-item align-items-center mb-4">
                <Col md={6}>
                  <h3 className="service-title">{t("Home.design_identity")}</h3>
                  <p className="service-description">{t("Home.design_identity_text").split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line} <br />
                    </React.Fragment>
                  ))}</p>
                </Col>
                <Col md={6} className="text-center">
                  <img src="images/confused.png" alt="Brand Identity" className="illustration" />
                </Col>
              </Row>
            </div>

            <div className="contact-designers">
              <Row className="service-item align-items-left">
                <Col md={5} className="design-text">
                  <h3 className="design-title">{t("Home.design_website")}</h3>
                  <p className="design-description">{t("Home.design_website_text").split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line} <br />
                    </React.Fragment>
                  ))}</p>
                </Col>
                <Col md={7} className="text-left">
                  <img src="images/web-design.png" alt="Website Design" className="service-img" />
                </Col>
              </Row>
            </div>

            {/* How It Works Section */}
            <div className="how-work-section text-center my-15">
              <h5 className="how-work-text">{t("Home.how_it_works")}</h5>
              <h2 className="three-steps-text">{t("Home.three_steps")}</h2>

              <Row className="my-4">
                <Col md={4}>
                  <Card className="p-4 border-0">
                    <img src="/images/submit-request.png" alt="Submit Request" className="steps-img-small mb-3" />
                    <h5>{t("Home.submit_request")}</h5>
                    <p>{t("Home.submit_request_text").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line} <br />
                      </React.Fragment>
                    ))}</p>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="p-4 border-0">
                    <img src="/images/designers-work.png" alt="Designers Work" className="steps-img mb-3" />
                    <h5>{t("Home.designers_work")}</h5>
                    <p>{t("Home.designers_work_text").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line} <br />
                      </React.Fragment>
                    ))}</p>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="p-4 border-0">
                    <img src="/images/receive-design.png" alt="Receive Design" className="steps-img mb-3" />
                    <h5>{t("Home.receive_design")}</h5>
                    <p>{t("Home.receive_design_text").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line} <br />
                      </React.Fragment>
                    ))}</p>
                  </Card>
                </Col>
              </Row>

              <Button className="transBtn SmallWidthBtn roundedBtn fw-bold pickup-btn">{t("Home.pick_plan")}</Button>
            </div>

            {/* Waslaa Mission */}
            <div className="hero-container" style={{ backgroundImage: "url(/images/wasla-bg.png)" }}>
              <div className="hero-content">
                <h2>{t("Home.wasla_mission").split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line} <br />
                  </React.Fragment>
                ))}</h2>
              </div>
              <button className="hero-button">{t("Home.get_started")}</button>
            </div>
          </div>

          <MainFooter />
          <Chat />
        </>
      )}
    </>
  );
};

export default Home;
