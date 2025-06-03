import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { useTranslation } from 'react-multi-lang';
import { useNavigate } from "react-router-dom";
import "./PricingPlansPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPricingPlans, saveClientServices  } from '../../slices/pricingPlansSlice';
import LoadingPage from '../Loader/LoadingPage';
import PopUp from "../shared/popoup/PopUp";

const Section = ({ title, items, onGetStarted,serviceId }) => {
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
                <Card.Title>{plan.package_name}</Card.Title>
                <p className="plan-desc">{plan.package_desc}</p>
                <div className="pricing-info">
                  {plan.isCustom ? (
                    <span className="old-price custom-price">Custom</span>
                  ) : (
                    <>
                      {plan.oldPrice > 0 && (
                        <span className="old-price">
                          {plan.oldPrice} {plan.curr_code}
                        </span>
                      )}
                      {plan.price > 0 && (
                        <span className="current-price ms-2">
                          {plan.price} {plan.curr_code}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <hr className="pricingHr"/>
                <ul className="features-list">
                  {plan.features.map((feat, i) => (
                    <li key={i}>{feat.feature_name}</li>
                  ))}
                </ul>
                <Button 
                  variant={plan.recommended ? "warning" : "outline-dark"} 
                  onClick={() => onGetStarted(plan.package_id,serviceId)}
                >
                  {t('pricing.get_started')}
                </Button>
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
   const navigate = useNavigate();
  const direction = t('direction');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const dispatch = useDispatch();
  const { data: pricingData, loading, error } = useSelector((state) => state.pricingPlans);
  
  useEffect(() => {
    dispatch(fetchPricingPlans({ lang: 'en', curr_code: 'USD' }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setPopupMessage(error);
      setPopupType("error");
      setShowPopup(true);
    }
  }, [error]);

  if (loading && !pricingData) {
    return <div className="pricing-page"><LoadingPage /></div>;
  }

  if (!pricingData) {
    return null; // or return a loading/empty state
  }

  const transformData = (data) => {
    return data.map(service => ({
      service_id:service.service_id,
      serviceName: service.service_name, 
      pkgs: service.pkgs
        .map(pkg => ({
          ...pkg,
          recommended: pkg.package_name === "Business",
          features: pkg.features || [],
          price: pkg.package_sale_price,
          oldPrice: pkg.package_price,
          isCustom: pkg.package_name === "Business Elite" && pkg.package_sale_price === 0
        }))
        .sort((a, b) => a.order - b.order)
    }));
  };
  
  const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupType("");
      };

  const transformedData = transformData(pricingData);
  const activeServices = transformedData.filter(service => service.pkgs.length > 0);



  const handleGetStarted = async (packageId,serviceId) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const requestData = [{
        productId: serviceId,
        client_id: user?.id || "",
        id: 0,
        package_id: packageId,
        isSelected: true
      }];

      try {
        await dispatch(saveClientServices(requestData)).unwrap();
        setPopupMessage("Service saved successfully!");
        setPopupType("success");
        setShowPopup(true);
        // Navigate after showing success message
        setTimeout(() => navigate("/confirmation"), 2000);
      } catch (error) {
        setPopupMessage(error || "Failed to save service");
        setPopupType("error");
        setShowPopup(true);
      }
    };

  return (
    <>
      <MainNavbar />
      {/* Success/Error Popup */}
      {showPopup && (
        <PopUp 
          msg={popupMessage} 
          closeAlert={closePopup} 
          type={popupType} 
        />
      )}
      <div className="pricing-page" dir={direction}>
        <Container>
          <div className="text-center mt-5">
            <h2 className="pricing-header">{t('pricing.title')}</h2>
            <p className="pricing-desc">{t('pricing.description')}</p>
            <hr className="pricingHr"/>
            <h1 className="discount">{t('pricing.discount')}</h1>
            <p className="deal-text">{t('pricing.deal_text')}</p>
          </div>

          {/* Render sections dynamically based on API data */}
          {activeServices.map((service) => (
            <Section 
              key={service.serviceName}
              title={service.serviceName} 
              items={service.pkgs}
              onGetStarted={handleGetStarted}
              serviceId={service.service_id}
            />
          ))}

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