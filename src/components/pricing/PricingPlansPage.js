import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { useTranslation } from 'react-multi-lang';
import { useNavigate } from "react-router-dom";
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

const Section = ({ title, items }) => {
  const t = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="pricing-section">
      <h3 className="section-title">{title}</h3>
      <Row>
        {items.map((plan, idx) => (
          <Col key={idx} md={3} className="mb-4">
            <Card className={`pricing-card ${plan.recommended ? "best" : ""}`}>
              {plan.recommended && <Badge className="best-badge">{t('pricing.recommended')}</Badge>}
              <Card.Body>
                <Card.Title>{plan.title}</Card.Title>
                <p className="plan-desc">{plan.desc}</p>
                <div className="pricing-info">
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
                <Button variant={plan.recommended ? "warning" : "outline-dark"} onClick={() => navigate("/confirmation")}>{t('pricing.get_started')}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const PricingPlansPage = () => { 
  const t = useTranslation();
  const direction = t('direction'); // Get direction from translations

  return (
    <>
      <MainNavbar />
      <div className="pricing-page" dir={direction}>
        <Container>
          <div className="text-center mt-5">
            <h2 className="pricing-header">{t('pricing.title')}</h2>
            <p className="pricing-desc">{t('pricing.description')}</p>
            <hr className="pricingHr"/>
            <h1 className="discount">{t('pricing.discount')}</h1>
            <p className="deal-text">{t('pricing.deal_text')}</p>
          </div>

          <Section title={t('pricing.sections.website')} items={plans.website} />
          <Section title={t('pricing.sections.marketing')} items={plans.marketing} />
          <Section title={t('pricing.sections.brand')} items={plans.brand} />

          <div className="payment-security-section mt-5 mb-4">
            <Container>
              <Row className="align-items-center text-center">
                <Col md={5} className="payment-methods">
                  <h6 className="section-label">{t('pricing.payment_methods')}</h6>
                  <div className="payment-icons mt-2">
                    <img src="/images/paypal.png" alt="PayPal" className="pay-icon" />
                    <img src="/images/visa.png" alt="Visa" className="pay-icon" />
                  </div>
                </Col>

                <Col md={1} className="d-none d-md-flex justify-content-center">
                  <div className="vertical-divider"></div>
                </Col>

                <Col md={6} className="secure-payment mt-4 mt-md-0 text-center">
                  <div className={`d-flex align-items-center justify-content-center ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <img src="/images/insurance.png" alt="SSL Secure" className={`secure-icon ${direction === 'rtl' ? 'ms-3' : 'me-3'}`} />
                    <div>
                      <h6 className="section-label">{t('pricing.ssl_secure')}</h6>
                      <p className="secure-text mb-0">{t('pricing.secure_text')}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="custom-package text-center">
            <p>{t('pricing.custom_package')}</p>
            <img src="/images/customPricing.jpeg" alt="Custom Offer" className="custom-img" />
          </div>
        </Container>
      </div>
      <MainFooter />
    </>
  );
}; 


export default PricingPlansPage;