import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import { fetchBrand, saveBrand, resetBrandState } from "../../slices/brandSlice";
import LoadingPage from '../Loader/LoadingPage';
import PopUp from "../shared/popoup/PopUp";
import "./Brand.scss";

const Brand = () => {
  // Translation hook for multilingual support
  const t = useTranslation();
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const clientId = user?.id;
  
  // Redux hooks
  const dispatch = useDispatch();
  // Get brand data from Redux store
  const { data: brand, loading, error, saveSuccess } = useSelector((state) => state.brand);
  
  // State for popup management
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  
  // Form state management
  const [formData, setFormData] = useState({
    id: 0,
    client_Id: clientId || "",
    brand_name: "",
    brand_type: "",
    brand_desc: ""
  });

  // Effect to initialize form data when brand data is loaded or changes
  useEffect(() => {
    if (brand) {
      setFormData({
        id: brand.id || 0, // Ensure id is set to 0 if not provided
        client_Id: brand.client_Id || clientId,
        brand_name: brand.brand_name || "",
        brand_type: brand.brand_type || "",
        brand_desc: brand.brand_desc || ""
      });
    } else {
      // Initialize empty form if no brand data exists
      setFormData({
        id: 0,
        client_Id: clientId || "",
        brand_name: "",
        brand_type: "",
        brand_desc: ""
      });
    }
  }, [brand, clientId]);

  // Effect to fetch brand data when component mounts
  useEffect(() => {
    if (clientId && accessToken) {
      dispatch(fetchBrand({ clientId, accessToken }));
    }
    // Cleanup function to reset brand state when component unmounts
    return () => {
      dispatch(resetBrandState());
    };
  }, [clientId, accessToken, dispatch]);

  // Effect to handle success/error messages
  useEffect(() => {
    if (saveSuccess) {
      setPopupMessage("Brand information saved successfully!");
      setPopupType("success");
      setShowPopup(true);
      // Reset success state after 3 seconds
      setTimeout(() => dispatch(resetBrandState()), 3000);
    } else if (error) {
      setPopupMessage(error);
      setPopupType("error");
      setShowPopup(true);
    }
  }, [saveSuccess, error, dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare payload ensuring id is never undefined
    const payload = {
      ...formData,
      id: formData.id || 0
    };
    dispatch(saveBrand({ formData: payload, accessToken }));
  };
  
  // Close popup and reset related states
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
    dispatch(resetBrandState());
  };
  
  // Show loading spinner while data is being fetched (initial load)
  if (loading && !brand) {
    return <div className="brand-settings"><LoadingPage /></div>;
  }

  return (
    <div className="brand-settings">
      {/* Success/Error Popup */}
      {showPopup && (
        <PopUp 
          msg={popupMessage} 
          closeAlert={closePopup} 
          type={popupType} 
        />
      )}
      
      {/* Main Form Container */}
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {/* Brand Name and Type in a row */}
          <Row className="mb-3">
            {/* Brand Name Field */}
            <Col md={6}>
              <Form.Group controlId="brandName" className="input-group">
                <Form.Label>{t("brand.nameLabel")}</Form.Label>
                <Form.Control
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  placeholder={t("brand.namePlaceholder")}
                  className="custom-input"
                  required
                />
              </Form.Group>
            </Col>

            {/* Brand Type Field */}
            <Col md={6}>
              <Form.Group controlId="brandType" className="input-group">
                <Form.Label>{t("brand.typeLabel")}</Form.Label>
                <Form.Control
                  type="text"
                  name="brand_type"
                  value={formData.brand_type}
                  onChange={handleChange}
                  placeholder={t("brand.typePlaceholder")}
                  className="custom-input"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Brand Description Field */}
          <Form.Group controlId="aboutBrand" className="input-group">
            <Form.Label>{t("brand.aboutLabel")}</Form.Label>
            <Form.Control
              as="textarea"
              name="brand_desc"
              value={formData.brand_desc}
              onChange={handleChange}
              rows={12}
              placeholder={t("brand.aboutPlaceholder")}
              className="area-input"
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="button-wrapper">
            <Button 
              type="submit" 
              className="save-btn" 
              disabled={loading} // Disable during save operation
            >
              {loading ? "Saving..." : (brand ? "Update" : "Save")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Brand;