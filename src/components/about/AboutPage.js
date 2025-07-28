import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MainNavbar from "../navbars/mainNavbar";
import SaleNavbar from "../navbars/saleNavbar";
import MainFooter from "../footer/mainFooter";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import Chat from "../chatIcon/chat";
import "./AboutPage.scss";

const AboutPage = () => {
  const navigate = useNavigate(); // React Router hook to navigate between pages
  const t = useTranslation(); // Hook for multilingual translations

  return (
    <>
      {/* Top navigation bars */}
      <MainNavbar />
      <SaleNavbar />

      {/* Main about page wrapper */}
      <div className="about-page" dir={t("direction")}>
        <Container className="about-section">
          {/* Company logo row */}
          <Row className="align-items-center justify-content-center">
            <Col xs={12} className="text-center">
              <img
                src="images/logo-wallpaper.png"
                alt={t("about.logo_alt")}
                className="img-fluid about-logo"
              />
            </Col>
          </Row>

          {/* About section with image and text */}
          <Row className="align-items-center flex-column-reverse flex-md-row">
            {/* Illustration image on left (on larger screens) */}
            <Col md={6} className="order-md-1 order-2">
              <img
                src="images/aboutus.png"
                alt={t("about.illustration_alt")}
                className="img-fluid illustration"
              />
            </Col>

            {/* Company title and description on right */}
            <Col md={6} className="order-md-2 order-1 mb-4 mb-md-0">
              <h1 className="about-header">{t("about.title")}</h1>
              <p className="about-description">
                <strong>{t("about.company_name")}</strong>{" "}
                {t("about.description")}
              </p>
            </Col>
          </Row>
        </Container>

        {/* Core values section */}
        <section className="values-section text-center">
          <h3 className="values-header">{t("about.values_title")}</h3>

          <Row className="justify-content-center">
            {/* Value card: Customer First */}
            <Col xs={12} md={6} lg={6} xl={6} className="mb-4">
              <Card className="value-card p-4 border-0">
                <img
                  src="images/leader.png"
                  alt={t("about.customer_first_alt")}
                  className="steps-img-small mb-3"
                />
                <h5>{t("about.customer_first_title")}</h5>
                <p className="text-center">
                  {/* Render each line as a new line */}
                  {t("about.customer_first_desc")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </Card>
            </Col>

            {/* Value card: Lead the Way */}
            <Col xs={12} md={6} lg={6} xl={6} className="mb-4">
              <Card className="value-card p-4 border-0">
                <img
                  src="images/leadership.png"
                  alt={t("about.lead_way_alt")}
                  className="steps-img-small mb-3"
                />
                <h5>{t("about.lead_way_title")}</h5>
                <p className="text-center">
                  {t("about.lead_way_desc")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </Card>
            </Col>

            {/* Value card: Teamwork */}
            <Col xs={12} md={6} lg={6} xl={6} className="mb-4">
              <Card className="value-card p-4 border-0">
                <img
                  src="images/meeting.png"
                  alt={t("about.teamwork_alt")}
                  className="steps-img-small mb-3"
                />
                <h5>{t("about.teamwork_title")}</h5>
                <p className="text-center">
                  {t("about.teamwork_desc")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </Card>
            </Col>

            {/* Value card: Celebrate */}
            <Col xs={12} md={6} lg={6} xl={6} className="mb-4">
              <Card className="value-card p-4 border-0">
                <img
                  src="images/happy.png"
                  alt={t("about.celebrate_alt")}
                  className="steps-img-small mb-3"
                />
                <h5>{t("about.celebrate_title")}</h5>
                <p className="text-center">
                  {t("about.celebrate_desc")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Call-to-action section */}
        <section className="hero-container-section">
          <div className="hero-container">
            <div className="hero-content">
              <h2>
                {t("about.cta_title")
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
              {t("about.cta_button")}
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <MainFooter />
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default AboutPage;
