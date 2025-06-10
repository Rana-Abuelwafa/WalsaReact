import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "./PricingPlansPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPricingPlans, saveClientServices } from '../../slices/pricingPlansSlice';
import LoadingPage from '../Loader/LoadingPage';
import PopUp from "../shared/popoup/PopUp";

const Section = ({ title, items, onSelectPackage, serviceId, selectedPackageId }) => {
  const t = useTranslation();
const navigate = useNavigate();  
  return (
    <div className="pricing-section">
      <h3 className="section-title">{title}</h3>
      <Row>
        {items.map((plan, idx) => (
          <Col key={idx} md={3} className="mb-4">
            <Card 
              className={`pricing-card ${plan.recommended ? "best" : ""} ${selectedPackageId === plan.package_id ? "selected" : ""}`}
              onClick={() => onSelectPackage(plan.package_id, serviceId)}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(plan.package_id, serviceId);
                  }}
                >
                  {t('pricing.select')}
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
  const [selectedPackages, setSelectedPackages] = useState(null);
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

  const handleSelectPackage = (packageId, serviceId) => {
    setSelectedPackage(prev => {
        // If clicking the same package again, deselect it
        if (prev && prev.packageId === packageId && prev.serviceId === serviceId) {
        return null;
        }
        return { serviceId, packageId };
    });
    };

  const handleContinue = () => {
    // Convert selected packages to an array of objects
    const packagesList = Object.entries(selectedPackages).map(([serviceId, packageId]) => ({
      serviceId,
      packageId
    }));
    
    console.log("Selected packages:", packagesList);
    navigate("/confirmation");
  };

  if (loading && !pricingData) {
    return <div className="pricing-page"><LoadingPage /></div>;
  }

  if (!pricingData) {
    return null;
  }

  const transformData = (data) => {
    return data.map(service => ({
      service_id: service.service_id,
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

  // Check if at least one package is selected 
const isContinueDisabled = !selectedPackage;

  return (
    <>
      <MainNavbar />
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

          {activeServices.map((service) => (
            <Section 
              key={service.service_id}
              title={service.serviceName} 
              items={service.pkgs}
              onSelectPackage={handleSelectPackage}
              serviceId={service.service_id}
              isSelected={(selectedPackage?.packageId === plan.package_id && selectedPackage?.serviceId === service.service_id)}
            />
          ))}

          <div className="continue-btn-container">
            <button 
              className="continue-btn"
              onClick={handleContinue}
              disabled={isContinueDisabled}
            >
              {t('pricing.continue')}
            </button>
          </div>

          <div className="payment-security-section mt-5 mb-4">
            {/* ... existing payment security section ... */}
          </div>

          <div className="custom-package text-center">
            {/* ... existing custom package section ... */}
          </div>
        </Container>
      </div>
      <MainFooter />
    </>
  );
}; 

export default PricingPlansPage;