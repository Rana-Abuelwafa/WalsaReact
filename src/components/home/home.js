import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation, getLanguage } from "react-multi-lang";
import MainNavbar from "../navbars/mainNavbar";
import SaleNavbar from "../navbars/saleNavbar";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";
import OfferPopup from "../OfferPopup/OfferPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.scss";
import AdvSection from "./Advertising/AdvSection";
import MetaTagsSeo from "../shared/MetaTagsSeo";

const Home = () => {
  const navigate = useNavigate(); // React Router hook to navigate between pages
  const t = useTranslation(); // Hook for multilingual translation
  const lang = localStorage.getItem("lang") || getLanguage();
  return (
    <>
      <MetaTagsSeo
        description={t("SEO.Home.description")}
        keywords={t("SEO.Home.keywords")}
        title={t("SEO.Home.title")}
        OGDescription={t("SEO.Home.OGDescription")}
        url="https://waslaa.de"
      />
      <OfferPopup /> {/* Displays a promotional popup */}
      <MainNavbar /> {/* Main navigation bar */}
      <SaleNavbar /> {/* Secondary navbar showing current sales or offers */}
      {/* <AdvSection /> advrtising section */}
      <Container fluid className="content-section">
        {/* ===================== Hero Section ===================== */}
        <section className="hero-section" dir={t("dir")}>
          <Row className="align-items-center">
            {/* Hero Text Content */}
            <Col
              lg={5}
              xs={12}
              className={`order-lg-1 order-2 text-lg-${
                t("dir") === "rtl" ? "end" : "start"
              }`}
            >
              <h1 className="hero-heading">
                {t("Home.heroTitle1")} <br />
                {t("Home.heroTitle2")}{" "}
                <span className="highlight">{t("Home.heroHighlight")}</span>
              </h1>
              {/* Hero description with new lines handled */}
              <p className="service-description hero_desc">
                {t("Home.heroDescription")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
              <Button
                className="cta-button"
                onClick={() => navigate("/pricing")}
              >
                {t("Home.getStarted")}
              </Button>
            </Col>

            {/* Hero Image */}
            <Col lg={7} xs={12} className="order-lg-2 order-1 text-center">
              <img
                // src="images/webs3.png"
                src="images/home/home_01_bg.png"
                alt={t("Home.heroImageAlt")}
                loading="lazy"
                className="img-fluid illustration no-flip"
              />
            </Col>
          </Row>
        </section>

        {/* ===================== Services Section ===================== */}
        <section className="services-section">
          <Row className="service-item align-items-center">
            {/* Text Content */}
            <Col md={6} className="order-md-1 order-2">
              <h3 className="service-title">{t("Home.desigIdentity")}</h3>
              <p className="service-description">
                {t("Home.designDescription")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </Col>
            {/* Image */}
            <Col md={6} className="order-md-2 order-1 text-center">
              <img
                // src="images/confused.png"
                src="images/home/home_02_bg.png"
                alt="Brand Identity"
                className="img-fluid illustration"
                loading="lazy"
              />
            </Col>
          </Row>
        </section>

        {/* ===================== Contact Designers Section ===================== */}
        <section className="contact-designers">
          <Row className="service-item align-items-center">
            {/* Website design text */}
            <Col md={5} className="design-text order-md-1 order-2">
              <h3 className="design-title">{t("Home.design_website")}</h3>
              <p className="design-description">
                {t("Home.design_website_text")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </Col>

            {/* Website design image */}
            <Col md={7} className="text-left order-md-2 order-1">
              <img
                //src="images/web-design.png"
                src="images/home/home_03_bg.png"
                alt="Website Design"
                className="img-fluid service-img"
                loading="lazy"
              />
            </Col>
          </Row>

          {/* Contact Designers Content */}
          <Row className="service-item design-left align-items-center">
            <Col md={6} className="order-md-1 order-2">
              <h3 className="design-title">{t("Home.contact_designers")}</h3>
              <p className="design-description">
                {t("Home.contact_designers_text")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </Col>
            <Col md={6} className="order-md-2 order-1 text-center">
              <img
                // src="images/design-award2.png"
                src="images/home/home_04_img.png"
                alt="Website Design"
                className="img-fluid service-img2"
                loading="lazy"
              />
            </Col>
          </Row>
        </section>

        {/* ===================== Marketing Section ===================== */}
        <section className="market-section">
          <Row className="service-item align-items-center">
            <Col md={7} className="order-md-1 order-2">
              <h3 className="service-title">{t("Home.market_business")}</h3>
              <p className="service-description">
                {t("Home.market_business_text")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </Col>
            <Col md={5} className="order-md-2 order-1 text-left">
              <img
                // src="images/social-media.png"
                src="images/home/home_05_img.png"
                alt="Business Marketing"
                className="img-fluid identity-img"
                loading="lazy"
              />
            </Col>
          </Row>
        </section>

        {/* ===================== How It Works Section ===================== */}
        <section className="how-work-section text-center">
          <h5 className="how-work-text">{t("Home.how_it_works")}</h5>
          <h2 className="three-steps-text">{t("Home.three_steps")}</h2>

          {/* Three Steps Cards */}
          <Row className="my-4">
            <Col md={4} xs={12} className="h-100">
              <div>
                <Card className="p-4 border-0 work_card">
                  <img
                    src="/images/submit-request.png"
                    alt="Submit Request"
                    className="steps-img-small mb-3"
                    loading="lazy"
                  />
                  <h5>{t("Home.submit_request")}</h5>
                  <p className="text-center">
                    {t("Home.submit_request_text")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </p>
                </Card>
              </div>
            </Col>
            <Col md={4} xs={12} className="h-100">
              <div>
                <Card className="p-4 border-0 work_card">
                  <img
                    src="/images/designers-work.png"
                    alt="Designers Work"
                    className="steps-img-small mb-3"
                    loading="lazy"
                  />
                  <h5>{t("Home.designers_work")}</h5>
                  <p className="text-center">
                    {t("Home.designers_work_text")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </p>
                </Card>
              </div>
            </Col>
            <Col md={4} xs={12} className="h-100">
              <div>
                {" "}
                <Card className="p-4 border-0 work_card">
                  <img
                    src="/images/receive-design.png"
                    alt="Receive Design"
                    className="steps-img-small mb-3"
                    loading="lazy"
                  />
                  <h5>{t("Home.receive_design")}</h5>
                  <p className="text-center">
                    {t("Home.receive_design_text")
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </p>
                </Card>
              </div>
            </Col>{" "}
          </Row>

          {/* CTA Button */}
          <Button
            className="transBtn SmallWidthBtn roundedBtn fw-bold pickup-btn"
            onClick={() => navigate("/pricing")}
          >
            {t("Home.pick_plan")}
          </Button>
        </section>

        {/* ===================== What We Offer Section ===================== */}
        <section className="how-work-section text-center">
          <h5 className="how-work-text">{t("Home.what_we_offer")}</h5>
          <h2 className="three-steps-text">{t("Home.design_solution")}</h2>

          {/* Offer Cards (First Row) */}
          <Row className="mb-4">
            <Col md={6}>
              <div>
                <Card className="p-4 border-0 design_card">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <img
                        src="/images/fast-reliable.png"
                        alt="Fast & Reliable"
                        className="img-fluid offer-img"
                      />
                    </Col>
                    <Col xs={9} className="offer-Text">
                      <h5>{t("Home.fast_reliable")}</h5>
                      <p>
                        {t("Home.fast_reliable_text")
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <Card className="p-4 border-0 design_card">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <img
                        src="/images/integrated-brand.png"
                        alt="Integrated Brand"
                        className="img-fluid offer-img no-flip"
                      />
                    </Col>
                    <Col xs={9} className="offer-Text">
                      <h5>{t("Home.integrated_brand")}</h5>
                      <p>
                        {t("Home.integrated_brand_text")
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>

            <Col md={6}>
              <div>
                <Card className="p-4 border-0 design_card">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <img
                        src="/images/collaborative-team.png"
                        alt="Collaborative Team"
                        className="img-fluid offer-img"
                      />
                    </Col>
                    <Col xs={9} className="offer-Text">
                      <h5>{t("Home.collaborative_team")}</h5>
                      <p>
                        {t("Home.collaborative_team_text")
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <Card className="p-4 border-0 design_card">
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <img
                        src="/images/budget-flexible.png"
                        alt="Budget Flexible"
                        className="img-fluid offer-img"
                      />
                    </Col>
                    <Col xs={9} className="offer-Text">
                      <h5>{t("Home.budget_flexible")}</h5>
                      <p>
                        {t("Home.budget_flexible_text")
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </section>

        {/* ===================== Final Hero Mission Statement ===================== */}
        {/* <section className="hero-container-section"> */}
      </Container>
      <section className="prefotter-section">
        <img
          src={
            "/images/home/home_last_bg_" +
            lang?.trim().toLocaleLowerCase() +
            ".png"
          }
          // src="/images/home/home_last_bg.png"
          alt="waslaa_pre_footer"
          className="mb-3"
          loading="lazy"
        />
        {/* <div className="hero-container">
            <div className="hero-content">
              <h2>
                {t("Home.wasla_mission")
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </h2>
            </div>
            <button className="hero-button" onClick={() => navigate("/login")}>
              {t("Home.getStarted")}
            </button>
          </div> */}
      </section>
      <MainFooter /> {/* Footer Component */}
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default Home;
