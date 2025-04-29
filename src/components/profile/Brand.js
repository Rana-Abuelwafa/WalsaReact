import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import { fetchBrand, saveBrand, resetBrandState } from "../../slices/brandSlice";
import PopUp from "../shared/popoup/PopUp";
import "./Brand.scss";

const Brand = () => {
  const t = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  console.log(user)
  const clientId = user?.id;
  const dispatch = useDispatch();
  const { data: brand, loading, error, saveSuccess } = useSelector((state) => state.brand);
   
  const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("");
  
    const [formData, setFormData] = useState({
      id: 0,
      client_Id: clientId || "",
      brand_name: "",
      brand_type: "",
      brand_desc: ""
    });
  useEffect(() => {
      if (brand) {
        setFormData({
          id: brand.id || 0,
          client_Id: brand.client_Id || clientId,
          brand_name: brand.brand_name || "",
          brand_type: brand.brand_type || "",
          brand_desc: brand.brand_desc || ""
        });
      }
    }, [brand, clientId]);
     // Fetch brand data on mount
      useEffect(() => {
        if (clientId && accessToken) {
          dispatch(fetchBrand({ clientId, accessToken }));
        }
        return () => {
          dispatch(resetBrandState());
        };
      }, [clientId, accessToken, dispatch]);
    
      // Handle success/error messages
      useEffect(() => {
        if (saveSuccess) {
          setPopupMessage("Brand information saved successfully!");
          setPopupType("success");
          setShowPopup(true);
          // Reset success state after showing message
          setTimeout(() => dispatch(resetBrandState()), 3000);
        } else if (error) {
          setPopupMessage(error);
          setPopupType("error");
          setShowPopup(true);
        }
      }, [saveSuccess, error, dispatch]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveBrand({ formData, accessToken }));
    };
    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupType("");
        dispatch(resetBrandState());
      };
    
      if (loading && !brand) {
        return <div className="brand-settings">Loading brand data...</div>;
      }

  return (
    <div className="brand-settings">
      {showPopup && (
              <PopUp 
                msg={popupMessage} 
                closeAlert={closePopup} 
                type={popupType} 
              />
            )}
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
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

          <div className="button-wrapper">
            <Button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : (brand ? "Update" : "Save")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Brand;