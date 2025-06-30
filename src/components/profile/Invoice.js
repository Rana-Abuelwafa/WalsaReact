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
  UpdateInvoicePrices,
} from "../../slices/invoiceSlice";
import "./Invoice.scss";

const Invoice = () => {
  const t = useTranslation();
  const direction = t("direction");
  const dispatch = useDispatch();
  const { loading, error, success, invoices, coupon } = useSelector(
    (state) => state.invoice
  );

  const [couponCodes, setCouponCodes] = useState({}); // Track coupon codes per tab
  const [coupons, setCoupons] = useState({}); // Track applied coupons per invoice
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");
  const [activeTab, setActiveTab] = useState(0);

  const currentLang =
    useSelector((state) => state.language.currentLang) || "en";

  useEffect(() => {
    if (invoices.length > 0) {
      if (activeTab >= invoices.length) {
        setActiveTab(invoices.length - 1);
      }
    } else {
      setActiveTab(0);
    }
  }, [invoices]);

  useEffect(() => {
    const getData = {
      active: true,
      status: 1,
      lang_code: currentLang,
    };
    dispatch(getInvoices(getData));
    dispatch(clearInvoiceState());
  }, [dispatch, currentLang]);

  useEffect(() => {
    if (error && error.trim() !== "") {
      setPopupMessage(error);
      setPopupVariant("error");
      setShowPopup(true);
      dispatch(clearInvoiceState());
    }
    if (success && success.trim() !== "") {
      setPopupMessage(success);
      setPopupVariant("success");
      setShowPopup(true);
      dispatch(clearInvoiceState());
    }
  }, [error, success, dispatch]);

  const handleApplyCoupon = async () => {
    const currentInvoice = invoices[activeTab];
    const couponCode = currentCouponCode; // Get the current tab's coupon code
    if (!couponCode.trim()) {
      setPopupMessage(t("checkout.couponRequired"));
      setPopupVariant("error");
      setShowPopup(true);
      return;
    }

    try {
      const action = await dispatch(validateCoupon({ copoun: couponCode }));
      const result = action.payload;

      if (result?.valid) {
        // Update the applied coupons state for this invoice
        setCoupons((prev) => ({
          ...prev,
          [currentInvoice.invoice_id]: result.couponData,
        }));

        setPopupMessage(result.msg || t("checkout.couponAppliedSuccessfully"));
        setPopupVariant("success");
        setShowPopup(true);

        // Update invoice prices with the coupon
        await dispatch(
          UpdateInvoicePrices({
            total_price: currentInvoice.total_price,
            copoun_id: result.couponData.id,
            invoice_id: currentInvoice.invoice_id,
            copoun_discount: result.couponData.discount_value,
            tax_id: currentInvoice.tax_id,
            deduct_amount: 0,
          })
        ).unwrap();

        const getData = {
          active: true,
          status: 1,
          lang_code: currentLang,
        };
        // Refresh invoices
        await dispatch(getInvoices(getData)).unwrap();
      } else {
        // Coupon is not valid
        setPopupMessage(result?.msg || t("checkout.invalidCoupon"));
        setPopupVariant("error");
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage(error?.msg || t("checkout.couponValidationError"));
      setPopupVariant("error");
      setShowPopup(true);
    }
  };
  const handleCheckout = async () => {
    if (invoices.length === 0) return;

    try {
      const currentInvoice = invoices[activeTab];
      await dispatch(
        checkoutInvoice({
          status: 2,
          // grand_total_price: currentInvoice.grand_total_price,
          //copoun_id: coupon?.valid ? coupon.id : 0,
          invoice_id: currentInvoice.invoice_id,
          // copoun_discount: coupon?.valid ? coupon.discount_value : 0,
        })
      ).unwrap();
      const getData = {
        active: true,
        status: 1,
        lang_code: currentLang,
      };
      // Refresh invoices after successful checkout
      const updatedInvoices = await dispatch(getInvoices(getData)).unwrap();

      // Determine which tab to show after checkout
      if (updatedInvoices.length > 0) {
        // If the current tab still exists (unlikely after checkout), stay on it
        // Otherwise go to the first tab
        const newActiveTab = updatedInvoices.some(
          (inv) => inv.invoice_id === currentInvoice.invoice_id
        )
          ? activeTab
          : 0;
        setActiveTab(newActiveTab);
      } else {
        // No invoices left after checkout
        setActiveTab(0);
      }

      // Clear any applied coupon for the checked out invoice
      setCoupons((prev) => {
        const newCoupons = { ...prev };
        delete newCoupons[currentInvoice.invoice_id];
        return newCoupons;
      });

      // Clear coupon code for the checked out invoice
      setCouponCodes((prev) => {
        const newCodes = { ...prev };
        delete newCodes[currentInvoice.invoice_id];
        return newCodes;
      });

      setPopupMessage(t("checkout.checkoutSuccess"));
      setPopupVariant("success");
      setShowPopup(true);
    } catch (error) {
      setPopupMessage(error.message || t("checkout.checkoutError"));
      setPopupVariant("error");
      setShowPopup(true);
    }

    // Clear any applied coupon for the checked out invoice
    setCoupons((prev) => {
      const newCoupons = { ...prev };
      delete newCoupons[currentInvoice.invoice_id];
      return newCoupons;
    });

    // Clear coupon code for the checked out invoice
    setCouponCodes((prev) => {
      const newCodes = { ...prev };
      delete newCodes[currentInvoice.invoice_id];
      return newCodes;
    });

    // setPopupMessage(t("checkout.checkoutSuccess"));
    // setPopupVariant("success");
    // setShowPopup(true);
  };
  //rana comment
  //  catch (error) {
  //   setPopupMessage(error.message || t("checkout.checkoutError"));
  //   setPopupVariant("error");
  //   setShowPopup(true);
  // }
  // };

  const handleRemovePackage = async (invoiceId, total_price, pkg) => {
    try {
      const currentTabBeforeRemoval = activeTab;
      const invoiceCoupon = coupons[invoiceId] || {};

      await dispatch(
        removeInvoice({
          active: true,
          invoice_id: invoiceId,
          service_id: pkg.service_id,
          package_id: pkg.package_id,
        })
      ).unwrap();

      await dispatch(
        UpdateInvoicePrices({
          total_price: total_price,
          copoun_id: invoiceCoupon.valid ? invoiceCoupon.id : 0,
          invoice_id: invoiceId,
          copoun_discount: invoiceCoupon.valid
            ? invoiceCoupon.discount_value
            : 0,
          tax_id: pkg.tax_id,
          deduct_amount: pkg.package_sale_price,
        })
      ).unwrap();
      const getData = {
        active: true,
        status: 1,
        lang_code: currentLang,
      };
      await dispatch(getInvoices(getData)).unwrap();
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

      // setPopupMessage(t("checkout.packageRemovedSuccessfully"));
      // setShowPopup(true);
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

  // In the render method, get the current invoice's coupon
  const currentInvoice = invoices[activeTab] || {};
  const currentCouponCode = couponCodes[currentInvoice.invoice_id] || "";
  const currentCoupon = coupons[currentInvoice.invoice_id] || {};

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
                  className="invoice-tab"
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
                          <strong>{pkg.package_sale_price}</strong>
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
                              invoice.total_price,
                              pkg
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
                          value={currentCouponCode}
                          onChange={(e) =>
                            setCouponCodes((prev) => ({
                              ...prev,
                              [currentInvoice.invoice_id]: e.target.value,
                            }))
                          }
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
                                {currentCoupon.valid
                                  ? currentCoupon.discount_value
                                  : 0}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between total-row">
                              <span>{invoice.tax_code}</span>
                              <span>{invoice.tax_amount}</span>
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
