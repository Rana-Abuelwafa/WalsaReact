import React, { useState, useEffect } from "react";
import { Tab, Tabs, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../shared/popoup/PopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  validateCoupon,
  checkoutInvoice,
  removeInvoice,
  getInvoices,
  clearInvoiceState,
} from "../../slices/invoiceSlice";
import "./Invoice.scss";

const Invoice = () => {
  const t = useTranslation();
  const direction = t("direction");
  const dispatch = useDispatch();
  const { loading, error, success, invoices, coupon } = useSelector(
    (state) => state.invoice
  );

  const [couponCode, setCouponCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
  // Ensure activeTab is valid after invoices change
  if (invoices.length > 0) {
    if (activeTab >= invoices.length) {
      setActiveTab(invoices.length - 1);
    }
  } else {
    setActiveTab(0);
  }
}, [invoices]);
  useEffect(() => {
    dispatch(getInvoices());
    dispatch(clearInvoiceState());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.trim() !== "") {
      setPopupMessage(error);
      setPopupVariant("error");
      setShowPopup(true);
      dispatch(clearInvoiceState());
    }
    if (success && success.trim() !== "") {
      setPopupMessage("success");
      setShowPopup(true);
      dispatch(clearInvoiceState());
    }
  }, [error, success, dispatch]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setPopupMessage(t("checkout.couponRequired"));
      setShowPopup(true);
      return;
    }
    dispatch(validateCoupon({ copoun: couponCode })).then((action) => {
      if (validateCoupon.fulfilled.match(action)) {
        setPopupMessage(t("checkout.couponAppliedSuccessfully"));
        setShowPopup(true);
      }
    });
  };

  const handleCheckout = () => {
    if (invoices.length === 0) return;

    const currentInvoice = invoices[activeTab];
    dispatch(
      checkoutInvoice({
        status: 2,
        grand_total_price: currentInvoice.grand_total_price,
        copoun_id: coupon?.valid ? coupon.id : 0,
        invoice_id: currentInvoice.invoice_id,
        copoun_discount: coupon?.valid ? coupon.discount_value : 0,
      })
    );
    dispatch(getInvoices());
    setActiveTab(0);
  };

  const handleRemovePackage = async (invoiceId, packageId, service_id) => {
try {
     const currentTabBeforeRemoval = activeTab;
    await dispatch(
      removeInvoice({
        active: true,
        invoice_id: invoiceId,
        service_id: service_id,
        package_id: packageId,
      })
    ).unwrap();
     await dispatch(getInvoices()).unwrap();
    // Check if the tab the user was on still exists
    if (invoices[currentTabBeforeRemoval]) {
      setActiveTab(currentTabBeforeRemoval);
    } else if (currentTabBeforeRemoval > 0) {
      // If not, try the previous tab
      setActiveTab(currentTabBeforeRemoval - 1);
    } else {
      // Default to first tab
      setActiveTab(0);
    }

    setPopupMessage(t("checkout.packageRemovedSuccessfully"));
    setShowPopup(true);
  } catch (error) {
    setPopupMessage(error.message || t("checkout.removePackageError"));
    setShowPopup(true);
  }
};

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    dispatch(clearInvoiceState());
  };
  console.log("invoices ", invoices);
  return (
    <div className="checkout-page" dir={direction}>
      {loading && <LoadingPage />}
      {showPopup && <PopUp msg={popupMessage} closeAlert={closePopup} />}

      <Card className="checkout-card p-3">
        {invoices.length > 0 ? (
          <>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(Number(k))}
              className="mb-3"
            >
              {invoices.map((invoice, index) => (
                <Tab
                  key={index}
                  eventKey={index}
                  title={`${t("checkout.invoice")} ${
                    invoice.invoice_code_auto
                  }`}
                >
                  <Row className="align-items-center text-center text-md-start service-title-row">
                    <Col md={2}>
                      <p>{t("checkout.service")}</p>
                    </Col>
                    <Col md={2}>
                      <p>{t("checkout.package")}</p>
                    </Col>
                    <Col md={2}>
                      <p>{t("checkout.details")}</p>
                    </Col>
                    <Col md={2}>
                      <p>{t("checkout.price")}</p>
                    </Col>
                    <Col md={2}>
                      <p>{t("checkout.currency")}</p>
                    </Col>
                    <Col md={2}>
                      <p>{t("checkout.state")}</p>
                    </Col>
                  </Row>

                  {invoice.pkgs.map((pkg, pkgIndex) => (
                    <Row
                      key={pkgIndex}
                      className="align-items-center text-center text-md-start service-item-row"
                    >
                      <Col md={2}>
                        <p className="service-text">{pkg.service_name}</p>
                      </Col>
                      <Col md={2}>
                        <p className="service-text">
                          <strong>{pkg.package_name}</strong>
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="service-text">{pkg.package_desc}</p>
                      </Col>
                      <Col md={2}>
                        <p className="service-text">
                          <strong>{pkg.total_price}</strong>
                        </p>
                      </Col>
                      <Col md={2}>
                        <p className="service-text">{pkg.curr_code}</p>
                      </Col>
                      <Col md={2} className="remove-text">
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() =>
                            handleRemovePackage(
                              invoice.invoice_id,
                              pkg.package_id,
                              pkg.service_id
                            )
                          }
                        >
                          {t("checkout.remove")}
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <hr />
                  <Row className="justify-content-between align-items-start voucher-price-wrapper">
                    <Col md={5} className="voucher-column">
                      <div className="voucher-row d-flex gap-2">
                        <Form.Control
                          type="text"
                          placeholder={t("checkout.couponPlaceholder")}
                          className="voucher-input flex-grow-1"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          className="apply-btn"
                          onClick={handleApplyCoupon}
                        >
                          {t("checkout.apply")}
                        </Button>
                      </div>
                      <div className="gift-voucher-text mt-2">
                        {t("checkout.giftVoucher")}
                      </div>
                    </Col>

                    <Col md={5} className="price-details-column">
                      {invoice.pkgs.length > 0 && (
                        <>
                          <div className="price-details mt-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>{t("checkout.subtotal")}</span>
                              <span>
                                {invoice.curr_code} {invoice.total_price}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>{t("checkout.discount")}</span>
                              <span>{invoice.discount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>{t("checkout.giftVoucher")}</span>
                              <span>
                                {coupon?.valid ? coupon.discount_value : 0}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between total-row">
                              <span>{t("checkout.grandTotal")}</span>
                              <span>
                                {invoice.curr_code} {invoice.grand_total_price}
                              </span>
                            </div>
                          </div>
                          <div className="checkout-btn-container text-end mt-4">
                            <Button
                              className="checkout-btn"
                              onClick={handleCheckout}
                            >
                              {t("checkout.checkout")}
                            </Button>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>
                </Tab>
              ))}
            </Tabs>
          </>
        ) : (
          <Row className="text-center py-4">
            <Col>
              <p>{t("checkout.noInvoices")}</p>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default Invoice;
