import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Spinner } from "react-bootstrap";
import "./AppointmentConfirmation.scss";
import { useTranslation } from "react-multi-lang";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveClientServices } from "../../slices/pricingPlansSlice";
import LoadingPage from '../Loader/LoadingPage';
import PopUp from "../shared/popoup/PopUp";

// Agreement text imports
import agreementAr from '../../agreement/agreementAr.txt';
import agreementEn from '../../agreement/agreementEn.txt';
import agreementDe from '../../agreement/agreementDe.txt';

// Add this new component above the main component
const AgreementDisplay = ({ language }) => {
  const [agreementText, setAgreementText] = useState("");

  useEffect(() => {
    const loadAgreementText = async () => {
      try {
        let text = "";
        
        // Fetch the appropriate agreement text based on language
        switch(language) {
          case 'ar':
            text = await fetch(agreementAr).then(res => res.text());
            break;
          case 'de':
            text = await fetch(agreementDe).then(res => res.text());
            break;
          default: // Default to English
            text = await fetch(agreementEn).then(res => res.text());
        }
        
        setAgreementText(text);
      } catch (error) {
        console.error("Error loading agreement text:", error);
        setAgreementText("Agreement text not available");
      }
    };

    loadAgreementText();
  }, [language]);

  return (
    <div className="agreement-display mb-4">
      <div className="agreement-content">
        <pre className="agreement-text">{agreementText}</pre>
      </div>
    </div>
  );
};

const AppointmentConfirmation = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const direction = t("direction");
  const [agreed, setAgreed] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const { selectedPackages } = location.state || {};
const { loading, error } = useSelector((state) => state.pricingPlans);

const currentLang =
    useSelector((state) => state.language.currentLang) || "en";

const handleSubmit = async () => {
  if (!agreed) return;

  try {
    const { allPackages } = location.state || {};
    
    const invoiceData = Object.entries(selectedPackages).map(([serviceId, packageId]) => {
  
      const service = allPackages.find(s => s.service_id === parseInt(serviceId));
      const pkg = service?.pkgs.find(p => p.package_id === parseInt(packageId));
      
      return {
        lang_code: pkg?.lang_code,
        curr_code: pkg?.curr_code,
        discount_amount: 0,
        package_sale_price: pkg?.package_sale_price || 0,
        package_price: pkg?.package_price || 0,
        service_name: pkg?.service_name || "",
        service_code: pkg?.service_code || "",
        package_code: pkg?.package_code || "",
        package_name: pkg?.package_name || "",
        productId: parseInt(serviceId),
        package_id: parseInt(packageId)
      };
    });

    await dispatch(saveClientServices(invoiceData)).unwrap();
    setPopupMessage("Invoice saved successfully!");
    setPopupType("success");
    setShowPopup(true);
    setTimeout(() => navigate("/pricing"), 2000);
  } catch (error) {
    setPopupMessage(error || "Failed to save Invoice");
    setPopupType("error");
    setShowPopup(true);
  }
};

   const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupType("");
      };

if (loading) {
    return <LoadingPage />;
  }

  if (!selectedPackages) {
    return (
      <Container className="confirmation-container text-center">
        <Row className="justify-content-center">
          <Col>
            <Card className="confirmation-card">
              <Card.Body>
                <h5 className="mb-4">No packages selected</h5>
                <Button variant="primary" onClick={() => navigate("/pricing")}>
                  Go Back to Pricing
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="confirmation-container dir={direction}">
        {/* Success/Error Popup */}
            {showPopup && (
              <PopUp 
                msg={popupMessage} 
                closeAlert={closePopup} 
                type={popupType} 
              />
            )}
      <div className="confirmation-content-wrapper">
          <Card className="confirmation-card">
            <Card.Body>
              <h5 className="mb-4">{t("confirmation.termsConditions")}</h5>

               <div className="agreement-container mb-4">
                  <AgreementDisplay language={currentLang} />
                </div>

              <Form.Check
                type="checkbox"
                id="agreeTerms"
                className="mt-4 d-flex align-items-center justify-content-center check-terms"
                label={t("confirmation.agreetoterms")}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/pricing")}
                  disabled={loading}
                >
                  {t("confirmation.back")}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!agreed || loading}
                >
                    {t("confirmation.continue")}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
    </div>
  );
};

export default AppointmentConfirmation;