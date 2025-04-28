import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Brand.scss";

const Brand = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const clientId = user?.id;

  const [formData, setFormData] = useState({
    id: 0,
    client_Id: clientId || "",
    brand_name: "",
    brand_type: "",
    brand_desc: ""
  });
  const [loading, setLoading] = useState(true);
  const [brandExists, setBrandExists] = useState(false);

  // Fetch brand data
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.post(
          "https://waslaa.de:4431/api/WaslaClient/GetClientBrands",
          {}, // Empty request body
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.data && Array.isArray(response.data)) {
          // Find the brand for the current client
          const clientBrand = response.data.find(brand => 
            brand.client_Id === clientId
          );
          
          if (clientBrand) {
            setFormData({
              id: clientBrand.id || 0,
              client_Id: clientBrand.client_Id || clientId,
              brand_name: clientBrand.brand_name || "",
              brand_type: clientBrand.brand_type || "",
              brand_desc: clientBrand.brand_desc || ""
            });
            setBrandExists(true);
          }
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clientId && accessToken) {
      fetchBrandData();
    } else {
      setLoading(false);
    }
  }, [clientId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/saveClientBrand",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Brand saved successfully:", response.data);
      alert("Brand information saved successfully!");
      
      // Update the form with the returned data (including any server-generated ID)
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          id: response.data.id || prev.id
        }));
        setBrandExists(true);
      }
    } catch (error) {
      console.error("Error saving brand:", error);
      alert("Error saving brand information. Please try again.");
    }
  };

  if (loading) {
    return <div className="brand-settings">Loading brand data...</div>;
  }

  return (
    <div className="brand-settings">
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="brandName" className="input-group">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  placeholder="Enter your Brand Name"
                  className="custom-input"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="brandType" className="input-group">
                <Form.Label>Brand Type</Form.Label>
                <Form.Control
                  type="text"
                  name="brand_type"
                  value={formData.brand_type}
                  onChange={handleChange}
                  placeholder="Enter your Brand Type"
                  className="custom-input"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="aboutBrand" className="input-group">
            <Form.Label>About Brand</Form.Label>
            <Form.Control
              as="textarea"
              name="brand_desc"
              value={formData.brand_desc}
              onChange={handleChange}
              rows={12}
              placeholder="Write a small summary of your business identity"
              className="area-input"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit" className="save-btn">
              {brandExists ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Brand;