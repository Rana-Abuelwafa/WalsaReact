import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useTranslation } from 'react-multi-lang';
import "./Invoice.scss";

const Invoice = () => {
  const t = useTranslation();
 const direction = t('direction');

  const serviceItems = [
    {
      service:"web Application",  
      package: "Business",
      description: "Grow Your Brand",
      price: "$00",
    },
    {
      service:"Branding",  
      package: "Core",
      description: "Grow Your Brand",
      price: "$00",
    },
    {
      service:"Marketing",  
      package: "Core",
      description: "Grow Your Brand",
      price: "$00",
    }
  ];

  return (
    <div className="checkout-page" dir={direction}>
      <Card className="checkout-card p-3">
        <Row className="align-items-center text-center text-md-start service-title-row">
            <Col md={3}>
             <p>Service</p>
            </Col>
            <Col md={2}>
              <p>Package</p>
            </Col>
            <Col md={3} >
              <p>Details</p>
            </Col>
            <Col md={2}>
              <p>State</p>
            </Col>
            <Col md={2}>
              <p>Total</p>
            </Col>
          </Row>
        {serviceItems.map((item, index) => (
          <Row key={index} className="align-items-center text-center text-md-start service-item-row">
            <Col md={3}>
             <p className="service-text">{item.service}</p>
            </Col>
            <Col md={2}>
              <p className="service-text">
                <strong>
                    {item.package}
                </strong>
              </p>
            </Col>
            <Col md={3}>
              <p className="service-text">{item.description}</p>
            </Col>
            <Col md={2} className="remove-text">
              <Button variant="link" className="p-0">
                {t("checkout.remove")}
              </Button>
            </Col>
            <Col md={2}>
              <p className="service-text"><strong>{item.price}</strong></p>
            </Col>
          </Row>
        ))}

        <hr />
       <Row className="justify-content-between align-items-start voucher-price-wrapper">
          <Col md={5} className="voucher-column">
            <div className="voucher-row d-flex gap-2">
              <Form.Control type="text" placeholder="Your Coupon" className="voucher-input flex-grow-1" />
              <Button className="apply-btn">{t("checkout.apply")}</Button>
            </div>
            <div className="gift-voucher-text mt-2">
              {t("checkout.giftVoucher")}
            </div>
          </Col>

          <Col md={5} className="price-details-column">
            <div className="price-details mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>{t("checkout.subtotal")}</span>
                <span>$00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>{t("checkout.discount")}</span>
                <span>%60</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>{t("checkout.giftVoucher")}</span>
                <span>%10</span>
              </div>
              <div className="d-flex justify-content-between total-row">
                <span>{t("checkout.grandTotal")}</span>
                <span>USD 23400</span>
              </div>
            </div>
            <div className="checkout-btn-container text-end mt-4">
              <Button className="checkout-btn">{t("checkout.checkout")}</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Invoice;
