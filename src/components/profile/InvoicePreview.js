import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { formatNumber } from "../../helper/helperFN";
import "./InvoiceHistory.scss";

const InvoicePreview = ({ invoice, setActiveTab }) => {
  const t = useTranslation();
  const direction = t("direction");
  const currencySymbol = localStorage.getItem("currencySymbol");
  return (
    <div className="history-page" dir={direction}>
      <Card className="history-card">
        <div>
          <Button
            variant="link"
            className="mb-1"
            onClick={() => setActiveTab("MyInvoices")}
          >
            <img
              src="/images/back.png"
              alt="back Illustration"
              className="back-image"
            />
          </Button>

          <span className="invoice-title">
            {t("checkout.invoice")} : #{invoice.invoice_code}
          </span>
        </div>

        <div className="invoice-preview">
          <Row>
            {invoice.pkgs &&
              invoice.pkgs.map((pkg, index) => (
                <Col md={6} sm={6} xs={12} key={index} className="mb-4">
                  <div className="section-title">
                    <h3>{pkg.service_name}</h3>
                    <small>
                      {pkg?.price_calc_type == 2 ? t("pricing.PriceInfo") : ""}
                    </small>
                  </div>

                  <Card className="pricing-card">
                    <Card.Body>
                      <Card.Title>{pkg.package_name}</Card.Title>
                      <p className="plan-desc">{pkg.package_desc}</p>
                      <div className="pricing-info">
                        {pkg.package_price > 0 ? (
                          <>
                            {pkg.package_price > 0 && (
                              <span className="old-price">
                                {formatNumber(Number(pkg.package_price))}
                                <small className="price_sym">
                                  {currencySymbol}
                                </small>
                                {/* {pkg.curr_code} */}
                              </span>
                            )}
                            {pkg.package_sale_price > 0 && (
                              <span className="current-price ms-2">
                                {formatNumber(Number(pkg.package_sale_price))}
                                <small className="price_sym">
                                  {currencySymbol}
                                </small>
                                {/* {pkg.curr_code} */}
                                <small className="price_info">
                                  (
                                  {pkg.price_calc_type == 3
                                    ? t("pricing.PerProject")
                                    : t("pricing.PerMonth")}
                                  )
                                </small>
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="old-price custom-price">
                            {t("pricing.Custom")}
                          </span>
                        )}
                      </div>
                      <hr className="pricingHr" />
                      <ul className="features-list">
                        {pkg?.features?.map((feat, i) => (
                          <li key={i}>{feat.feature_name}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default InvoicePreview;
