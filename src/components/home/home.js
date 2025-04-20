import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
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
    }, 3000);

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
          <Container fluid className="content-section">
            {/* Hero Section */}
            <section className="hero-section">
              <Row className="align-items-center">
                <Col lg={6} className="order-lg-1 order-2 text-center text-lg-start">
                  <h1 className="hero-heading">
                    {t("Home.heroTitle1")} {t("Home.heroTitle2")} <br /><span className="highlight">{t("Home.heroHighlight")}</span>
                  </h1>
                  <p className="service-description">
                    {t("Home.heroDescription").split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  <Button className="cta-button" onClick={() => navigate("/login")}>
                    {t("Home.getStarted")}
                  </Button>
                </Col>
                <Col lg={6} className="order-lg-2 order-1 text-center">
                  <img
                    src="images/webs3.png"
                    alt={t("Home.heroImageAlt")}
                    className="img-fluid illustration"
                  />
                </Col>
              </Row>
            </section>

            {/* Services Section */}
            <section className="services-section">
              <Row className="service-item align-items-center">
                <Col md={6} className="order-md-1 order-2">
                  <h3 className="service-title">{t("Home.desigIdentity")}</h3>
                  <p className="service-description">
                    {t("Home.designDescription").split("\n").map((line, index) => (
                                        <React.Fragment key={index}>
                                          {line}
                                          <br />
                                        </React.Fragment>
                                      ))}
                  </p>
                </Col>
                <Col md={6} className="order-md-2 order-1 text-center">
                  <img
                    src="images/confused.png"
                    alt="Brand Identity"
                    className="img-fluid illustration"
                  />
                </Col>
              </Row>
            </section>

            <section className="contact-designers">
              <Row className="service-item align-items-center">
                <Col md={5} className="design-text">
                  <h3 className="design-title">{t("Home.design_website")}</h3>
                  <p className="design-description">
                    {t("Home.design_website_text").split("\n").map((line, index) => (
                                        <React.Fragment key={index}>
                                          {line}
                                          <br />
                                        </React.Fragment>
                                      ))}
                  </p>
                </Col>
                <Col md={7} className="text-left">
                  <img src="images/web-design.png" alt="Website Design" className="img-fluid service-img" />
                </Col>
              </Row>

              <Row className="service-item design-left align-items-center">
                <Col md={6} className="order-md-1 order-2 ">
                  <h3 className="design-title">{t("Home.contact_designers")}</h3>
                  <p className="design-description">
                    {t("Home.contact_designers_text").split("\n").map((line, index) => (
                                        <React.Fragment key={index}>
                                          {line}
                                          <br />
                                        </React.Fragment>
                                      ))}
                  </p>
                </Col>
                <Col md={6} className="order-md-2 order-1 text-center">
                  <img src="images/design-award2.png" alt="Website Design" className="img-fluid service-img2" />
                </Col>
              </Row>
            </section>

            <section className="market-section">
              <Row className="service-item align-items-center">
                <Col md={7} className="order-md-1 order-2">
                  <h3 className="service-title">
                    {t("Home.market_business")}
                  </h3>
                  <p className="service-description">
                    {t("Home.market_business_text").split("\n").map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}
                  </p>
                </Col>
                <Col md={5} className="order-md-2 order-1 text-left">
                  <img
                    src="images/social-media.png"
                    alt="Business Marketing"
                    className="img-fluid identity-img"
                  />
                </Col>
              </Row>
            </section>

            <section className="how-work-section text-center">
              <h5 className="how-work-text">{t("Home.how_it_works")}</h5>
              <h2 className="three-steps-text">{t("Home.three_steps")}</h2>

              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 p-4 border-0">
                    <img src="/images/submit-request.png" alt="Submit Request" className="steps-img-small mb-3" />
                    <h5>{t("Home.submit_request")}</h5>
                    <p>{t("Home.submit_request_text").split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                              {line}
                                              <br />
                                            </React.Fragment>
                                          ))}
                                          </p>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 p-4 border-0">
                    <img src="/images/designers-work.png" alt="Designers Work" className="steps-img mb-3" />
                    <h5>{t("Home.designers_work")}</h5>
                    <p>{t("Home.designers_work_text").split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                              {line}
                                              <br />
                                            </React.Fragment>
                                          ))}
                                          </p>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 p-4 border-0">
                    <img src="/images/receive-design.png" alt="Receive Design" className="steps-img mb-3" />
                    <h5>{t("Home.receive_design")}</h5>
                    <p>{t("Home.receive_design_text").split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                              {line}
                                              <br />
                                            </React.Fragment>
                                          ))}
                                          <br />
                                          <br />
                                          </p>  
                  </Card>
                </Col>
              </Row>

              <Button className="transBtn SmallWidthBtn roundedBtn fw-bold pickup-btn" onClick={() => navigate("/login")}>
                {t("Home.pick_plan")}
              </Button>
            </section>

            <section className="how-work-section text-center">
              <h5 className="how-work-text">{t("Home.what_we_offer")}</h5>
              <h2 className="three-steps-text">{t("Home.design_solution")}</h2>

              <Row className="g-4">
                <Col md={6}>
                  <Card className="h-100 p-4 border-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img src="/images/fast-reliable.png" alt="Fast & Reliable" className="img-fluid offer-img" />
                      </Col>
                      <Col xs={9} className="offer-Text">
                        <h5>{t("Home.fast_reliable")}</h5>
                        <p>{t("Home.fast_reliable_text").split("\n").map((line, index) => (
                                                <React.Fragment key={index}>
                                                  {line}
                                                  <br />
                                                </React.Fragment>
                                              ))}
                                                </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100 p-4 border-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img src="/images/integrated-brand.png" alt="Integrated Brand" className="img-fluid offer-img" />
                      </Col>
                      <Col xs={9} className="offer-Text">
                        <h5>{t("Home.integrated_brand")}</h5>
                        <p>{t("Home.integrated_brand_text").split("\n").map((line, index) => (
                                                <React.Fragment key={index}>
                                                  {line}
                                                  <br />
                                                </React.Fragment>
                                              ))}
                        
                                            </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={6}>
                  <Card className="h-100 p-4 border-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img src="/images/collaborative-team.png" alt="Collaborative Team" className="img-fluid offer-img" />
                      </Col>
                      <Col xs={9} className="offer-Text">
                        <h5>{t("Home.collaborative_team")}</h5>
                        <p>{t("Home.collaborative_team_text").split("\n").map((line, index) => (
                                                <React.Fragment key={index}>
                                                  {line}
                                                  <br />
                                                </React.Fragment>
                                              ))}
                                              </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100 p-4 border-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img src="/images/budget-flexible.png" alt="Budget Flexible" className="img-fluid offer-img" />
                      </Col>
                      <Col xs={9} className="offer-Text">
                        <h5>{t("Home.budget_flexible")}</h5>
                        <p>{t("Home.budget_flexible_text").split("\n").map((line, index) => (
                                                <React.Fragment key={index}>
                                                  {line}
                                                  <br />
                                                </React.Fragment>
                                              ))}
                                              </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </section>

            <section className="hero-container-section">
              <div className="hero-container">
                <div className="hero-content">
                  <h2>{t("Home.wasla_mission").split("\n").map((line, index) => (
                                          <React.Fragment key={index}>
                                            {line}
                                            <br />
                                          </React.Fragment>
                                        ))}
                                        </h2>
                </div>
                <button className="hero-button">{t("Home.getStarted")}</button>
              </div>
            </section>
          </Container>

          <MainFooter />
          <Chat />
        </>
      )}
    </>
  );
};

export default Home;