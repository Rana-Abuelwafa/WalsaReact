import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Spinner } from "react-bootstrap";
import "./AppointmentConfirmation.scss";
import { useTranslation } from "react-multi-lang";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveClientServices } from "../../slices/pricingPlansSlice";
import LoadingPage from '../Loader/LoadingPage';
import PopUp from "../shared/popoup/PopUp";

const AppointmentConfirmation = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [agreed, setAgreed] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const { selectedPackages } = location.state || {};
const { loading, error } = useSelector((state) => state.pricingPlans);

const handleSubmit = async () => {
  if (!agreed) return;

  try {
    // Get the full package data from location state
    const { allPackages } = location.state || {};
    
    // Create the request data by mapping selected packages
    const invoiceData = Object.entries(selectedPackages).map(([serviceId, packageId]) => {
      // Find the full package details
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
      <Container fluid className="confirmation-container text-center">
        <Row className="justify-content-center">
          <Col>
            <Card className="confirmation-card p-4">
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
    <Container fluid className="confirmation-container text-center">
        {/* Success/Error Popup */}
            {showPopup && (
              <PopUp 
                msg={popupMessage} 
                closeAlert={closePopup} 
                type={popupType} 
              />
            )}
      <Row className="justify-content-center">
        <Col>
          <Card className="confirmation-card p-4">
            <Card.Body>
              <h5 className="mb-4">{t("confirmation.termsConditions")}</h5>

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
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentConfirmation;