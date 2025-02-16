import React from "react";
import {
  Button,
  Row,
  Col,
  Card
} from "react-bootstrap";
import MainNavbar from '../navbars/mainNavbar';
import SaleNavbar from '../navbars/saleNavbar';
import MainFooter from '../footer/mainFooter';
import Chat from '../chatIcon/chat';
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.scss";

const Home = () => {
  return (
    <>
      <MainNavbar />
      
      <SaleNavbar />
      <div className="content-section">
        {/* Hero Section */}
        <div className="hero-section">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h1 className="hero-heading">
                Make your <br />
                Brand <span className="highlight">Special!</span>
              </h1>
              <p className="hero-text">
                Everything to bring your brand into the <br />
                hands of customers with ease
              </p>
              <Button className="cta-button">Get Started</Button>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/webs3.png"
                alt="Illustration"
                className="illustration"
              />
            </Col>
          </Row>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <Row className="service-item align-items-center mb-4">
            <Col md={6}>
              <h3 className="service-title">Design your brand identity</h3>
              <p className="service-description">
                Do you have the project idea but <br />
                need to create your identity from <br />
                the name to the marketing
                <br /> stage?
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/confused.png"
                alt="Brand Identity"
                className="illustration"
              />
            </Col>
          </Row>
        </div>

        <div className="contact-designers">
          <Row className="service-item align-items-left">
            <Col md={5} className="design-text">
              <h3 className="design-title">Design your website</h3>
              <p className="design-description">
                Make your brand more <br />
                widespread and facilitate access <br />
                to your products.
              </p>
            </Col>
            <Col md={7} className="text-left">
              <img
                src="images/web-design.png"
                alt="Website Design"
                className="service-img"
              />
            </Col>
          </Row>
          <Row className="service-item-designers align-items-left">
            <Col md={7}>
              <h3 className="design-title">Contact our creative designers</h3>
              <p className="design-description">
                Creative team for designing your <br />
                business identity.
              </p>
            </Col>
            <Col md={5} className="text-left">
              <img
                src="images/design-award2.png"
                alt="Website Design"
                className="service-img2"
              />
            </Col>
          </Row>
        </div>

        <div className="market-section">
          <Row className="service-item align-items-center">
            <Col md={7}>
              <h3 className="service-title">
                Market to your business identity
              </h3>
              <p className="service-description">
                A specialized team is responsible <br />
                for marketing your brand identity <br />
                and ensuring its success.
              </p>
            </Col>
            <Col md={5} className="text-center">
              <img
                src="images/social-media.png"
                alt="Business Marketing"
                className="identity-img"
              />
            </Col>
          </Row>
        </div>

        <div className="how-work-section text-center my-15">
            {/* HOW IT WORKS Section */}
            <h5 className="how-work-text">HOW IT WORKS</h5>
            <h2 className="three-steps-text">Get your services in just three steps.</h2>

            <Row className="my-4">
              <Col md={4}>
                <Card className="p-4 border-0">
                  <img src="/images/submit-request.png" alt="Submit Request" className="steps-img-small mb-3" />
                  <h5>Submit your request</h5>
                  <p>Fill out the form for the service you <br/>need and complete the payment <br/>process.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 border-0">
                  <img src="/images/designers-work.png" alt="Designers Work" className="steps-img mb-3" />
                  <h5>Our designers get to work</h5>
                  <p>Designers will start working immediately <br/>and communicate with you to achieve <br/>the best results.</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 border-0">
                  <img src="/images/receive-design.png" alt="Receive Design" className="steps-img mb-3" />
                  <h5>Receive your design</h5>
                  <p>Receive your complete service. Give us <br/>
                  your feedback.
                  <br />
                  <br />
                  </p>
                </Card>
              </Col>
            </Row>

            <Button className="transBtn SmallWidthBtn roundedBtn fw-bold pickup-btn">Pick up a plan</Button>
            {/* WHAT WE OFFER Section */}
        </div>

        <div className="how-work-section text-center my-15">
            <h5 className="how-work-text text-center">WHAT WE OFFER</h5>
            <h2 className="three-steps-text text-center">A design solution you will love</h2>

            <Row className="my-4">
              <Col md={6}>
                <Card className="p-4 text-left border-0">
                  <Row>
                    <Col md={3}>
                     <img src="/images/fast-reliable.png" alt="Fast & Reliable" className="offer-img" />
                    </Col>
                    <Col className="offer-Text" md={9}>
                    <h5>Fast & Reliable</h5>
                    <p>Get your service as soon as possible through <br/>continuous communication.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="p-4 text-left border-0">
                <Row>
                <Col md={3}>
                  <img src="/images/integrated-brand.png" alt="Integrated Brand" className="offer-img" />
                </Col>
                <Col className="offer-Text" md={9}>
                  <h5>Integrated brand</h5>
                  <p>Create an integrated brand that makes your <br/>services easily accessible.</p>
                </Col>
                </Row>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="p-4 text-left border-0">
                <Row>
                <Col md={3}>
                  <img src="/images/collaborative-team.png" alt="Collaborative Team" className="offer-img" />
                  </Col>
                  <Col className="offer-Text" md={9}>
                  <h5>Collaborative team</h5>
                  <p>A design and marketing team collaborates to <br/>lead your brand to success.</p>
                  </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="p-4  border-0">
                <Row>
                <Col md={3}>
                  <img src="/images/budget-flexible.png" alt="Budget Flexible" className="offer-img" />
                  </Col>
                  <Col className="offer-Text" md={9}>
                  <h5>Budget flexible</h5>
                  <p>Plan according to your budget and the <br/>services you need.</p>
                  </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
        </div>

        <div>
          <div
            className="hero-container"
            style={{ backgroundImage: "url(/images/wasla-bg.png)" }}
          >
            <div className="hero-content">
              <h2>
                Waslaa aims to make <br />
                your brand successful <br />
                through the access of
                <br /> your customers to <br />
                your brand with ease.
              </h2>
            </div>
            <button className="hero-button">Get started</button>
          </div>
        </div>

      </div>

      <MainFooter />

      {/* WhatsApp Floating Button */}
       <Chat />
    
    </>
  );
};

export default Home;
