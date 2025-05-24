import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { useTranslation } from 'react-multi-lang';
import "./PricingPlansPage.scss";

const plans = {
  website: [
    {
      title: "Business Elite",
      desc: "Scale your business",
      oldPrice: "Custom",
      price: "",
      features: [
        "Dedicated design & development team",
        "Tailored design for your business",
        "Dedicated marketing team"
      ],
      recommended: false
    },
    {
      title: "Business",
      desc: "Grow your brand",
      oldPrice: "12900",
      price: "6450",
      features: [
        "Everything in Core",
        "40 GB Storage",
        "40 website pages",
        "3 website languages",
        "10 Email accounts",
        "Unlock all form fields",
        "Customer support",
        "1 hour of dedicated support",
        "Google Search Console Submission Support"
      ],
      recommended: true
    },
    {
      title: "Core",
      desc: "Engage your audience",
      oldPrice: "9800",
      price: "4950",
      features: [
        "Everything in Light",
        "20 GB Storage",
        "Unlimited Bandwidth",
        "Free custom Domain",
        "20 website pages",
        "1 website language",
        "Unlock all form fields",
        "2 utility pages",
        "Customer support",
        "Google Analytics, Facebook Pixel Integration Support"
      ],
      recommended: false
    },
    {
      title: "Light",
      desc: "Get the basics",
      oldPrice: "5900",
      price: "2950",
      features: [
        "Remove Waslaa Ads",
        "Customized/Branded footer",
        "2 GB Storage",
        "Connect Your Domain",
        "SSL certificate",
        "10 website pages",
        "2 website languages",
        "Limited form fields",
        "Customer support",
        "Limited Google Tag Manager"
      ],
      recommended: false
    }
  ],
  marketing: [
  {
    title: "Business Elite",
    desc: "Scale your business",
    oldPrice: "Custom",
    price: "",
    features: [
      "Dedicated marketing team",
      "Creating a marketing plan that aligns with the brand."
    ],
    recommended: false
  },
  {
    title: "Business",
    desc: "Grow your brand",
    oldPrice: "US$0000",
    price: "US$0000",
    features: [
      "Complete the page information.",
      "Managing two social media accounts for 30 days.",
      "Designing fifteen social media posts.",
      "Studying and analyzing competitors"
    ],
    recommended: true
  },
  {
    title: "Core",
    desc: "Engage your audience",
    oldPrice: "US$0000",
    price: "US$0000",
    features: [
      "Complete the page information.",
      "Managing two social media accounts for 30 days.",
      "Designing eight social media posts."
    ],
    recommended: false
  },
  {
    title: "Light",
    desc: "Get the basics",
    oldPrice: "US$0000",
    price: "US$0000",
    features: [
      "Complete the page information.",
      "Managing two social media accounts for 30 days.",
      "Designing four social media posts."
    ],
    recommended: false
  }
],
 brand: [
  {
    title: "Business Elite",
    desc: "Scale your business",
    oldPrice: "Custom",
    price: "",
    features: [
      "Specify your need for Waslaa Design services with our designers"
    ],
    recommended: false
  },
  {
    title: "Business",
    desc: "Grow your brand",
    oldPrice: "12000 EGP",
    price: "US$0000",
    features: [
      "Logo Design",
      "Selection of primary and secondary brand colors and typography",
      "Collection of different types of",
      "Five different types of packing",
      "Pattern design"
    ],
    recommended: true
  },
  {
    title: "Core",
    desc: "Engage your audience",
    oldPrice: "8000 EGP",
    price: "US$0000",
    features: [
      "Logo Design",
      "Two different types of stationery",
      "Two different types of Merch",
      "Custom graphic elements",
      "Brand guidelines",
      "File formats delivered"
    ],
    recommended: false
  },
  {
    title: "Light",
    desc: "Get the basics",
    oldPrice: "5000 EGP",
    price: "US$0000",
    features: [
      "Logo Design",
      "Selection of primary brand colors and typography",
      "Business card design",
      "Simple brand guidelines",
      "File formats delivered"
    ],
    recommended: false
  }
]
};

const Section = ({ title, items }) => (
  <div className="pricing-section">
    <h3 className="section-title">{title}</h3>
    <Row>
      {items.map((plan, idx) => (
        <Col key={idx} md={3} className="mb-4">
          <Card className={`pricing-card ${plan.recommended ? "best" : ""}`}>
            {plan.recommended && <Badge className="best-badge">Recommanded</Badge>}
            <Card.Body>
              <Card.Title>{plan.title}</Card.Title>
              <p className="plan-desc">{plan.desc}</p>
              <div className="pricing-info ">
                {plan.oldPrice && (
                  <span
                    className={plan.oldPrice.toLowerCase() === "custom" ? "old-price custom-price" : "old-price"}
                  >
                    {plan.oldPrice}
                  </span>
                )}
                {plan.price && <span className="current-price ms-2">{plan.price}</span>}
              </div>
              <hr className="pricingHr"/>
              <ul className="features-list">
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <Button variant={plan.recommended ? "warning" : "outline-dark"}>Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

const PricingPlansPage = () => { 

  const t = useTranslation(); // Hook for multilingual translations

  return (
    <>
            {/* Top navigation bars */}
            <MainNavbar />
            <div className="pricing-page">
              <Container>
                <div className="text-center mt-5">
                  <h2 className="pricing-header">Affordable plans for all business types</h2>
                  <p className="pricing-desc">Begin by creating your site and get a site valid all year round</p>
                  <hr className="pricingHr"/>
                  <h1 className="discount">50%</h1>
                  <p className="deal-text">Get our opening offers on all our services for the first 100 days</p>
                </div>

                <Section title="Website Design" items={plans.website} />
                <Section title="Marketing" items={plans.marketing} />
                <Section title="Brand Identity" items={plans.brand} />

                <div className="payment-security-section mt-5 mb-4">
                  <Container>
                    <Row className="align-items-center text-center">
                      <Col md={5} className="payment-methods">
                        <h6 className="section-label">ACCEPTED PAYMENT METHODS</h6>
                        <div className="payment-icons mt-2">
                          <img src="/images/paypal.png" alt="PayPal" className="pay-icon" />
                          <img src="/images/visa.png" alt="Visa" className="pay-icon" />
                        </div>
                      </Col>

                      <Col md={1} className="d-none d-md-flex justify-content-center">
                        <div className="vertical-divider"></div>
                      </Col>

                      <Col md={6} className="secure-payment mt-4 mt-md-0 text-center">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                          <img src="/images/protect.jpeg" alt="SSL Secure" className="secure-icon me-3" />
                          <div>
                            <h6 className="section-label">SSL SECURE PAYMENT</h6>
                            <p className="secure-text mb-0">Your information is protected</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="custom-package text-center">
                  <p>You want to custom a special package for</p>
                  <img src="/images/customPricing.jpeg" alt="Custom Offer" className="custom-img" />
                </div>
              </Container>
            </div>
            {/* Footer */}
            <MainFooter />
        </>
  );
} 


export default PricingPlansPage;