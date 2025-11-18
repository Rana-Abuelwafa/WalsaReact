import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../shared/popoup/PopUp";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../helper/helperFN";
import {
  validateCoupon,
  checkoutInvoice,
  removeInvoice,
  getInvoices,
  clearInvoiceState,
  UpdateInvoicePrices,
} from "../../slices/invoiceSlice";
import { useNavigate } from "react-router-dom";
import "./Invoice.scss";

const Invoice = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const direction = t("direction");
  const dispatch = useDispatch();

  const { loading, error, success, message, invoices, coupon } = useSelector(
    (state) => state.invoice
  );

  const [couponCodes, setCouponCodes] = useState({}); // Track coupon codes per tab
  const [coupons, setCoupons] = useState({}); // Track applied coupons per invoice
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupIcon, setPopupIcon] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const currentLang =
    useSelector((state) => state.language.currentLang) || "en";
  const currencySymbol = localStorage.getItem("currencySymbol");
  useEffect(() => {
    if (invoices.length > 0) {
      // if (activeTab >= invoices.length) {
      //   setActiveTab(invoices.length - 1);
      // }
      setActiveTab(invoices.length - 1);
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
    // console.log(success, message);
    if (success !== null) {
      if (success && message === "Checkout successful") {
        setPopupMessage(""); // Empty message for successful checkout
        setPopupType("success");
        setPopupIcon(<FaCheck className="success-icon" size={30} />);
        setShowPopup(true);
      } else if (!success && message && !message.includes("GetInvoices")) {
        setPopupMessage(message);
        setPopupType("error");
        setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
        setShowPopup(true);
      }
    }
  }, [success, message]);

  const handleApplyCoupon = async () => {
    const currentInvoice = invoices[activeTab];
    const couponCode = currentCouponCode; // Get the current tab's coupon code

    if (!couponCode.trim()) {
      setPopupMessage(t("checkout.couponRequired"));
      setPopupType("error");
      setShowPopup(true);
      setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
      return;
    }

    try {
      const validationResult = await dispatch(
        validateCoupon({ copoun: couponCode })
      ).unwrap();
      // console.log(validationResult)
      if (validationResult.valid) {
        // Update invoice prices with the coupon
        // console.log(validationResult)
        await dispatch(
          UpdateInvoicePrices({
            total_price: currentInvoice.total_price,
            copoun_id: validationResult.couponData.id,
            invoice_id: currentInvoice.invoice_id,
            copoun_discount: validationResult.couponData.discount_value,
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

        setCoupons((prev) => ({
          ...prev,
          [currentInvoice.invoice_id]: validationResult.couponData,
        }));
      }
    } catch (error) {
      //console.error("Coupon validation error:", error);
      // Clear any previous coupon if validation fails
      setCoupons((prev) => {
        const newCoupons = { ...prev };
        delete newCoupons[currentInvoice.invoice_id];
        return newCoupons;
      }); // Store the validated coupon in local state
    }
  };
  const handleCheckout = async () => {
    if (invoices.length === 0) return;

    try {
      const currentInvoice = invoices[activeTab];
      //.log("currentInvoice ", currentInvoice);
      await dispatch(
        checkoutInvoice({
          status: 2,
          invoice_id: currentInvoice.invoice_id,
          invoice_code: currentInvoice.invoice_code,
          lang: currentLang,
          //pkgs: currentInvoice.pkgs,
        })
      ).unwrap();

      // const getData = {
      //   active: true,
      //   status: 1,
      //   lang_code: currentLang,
      // };
      // // Refresh invoices after successful checkout
      // const updatedInvoices = await dispatch(getInvoices(getData)).unwrap();

      // // Determine which tab to show after checkout
      // if (updatedInvoices.length > 0) {
      //   // If the current tab still exists (unlikely after checkout), stay on it
      //   // Otherwise go to the first tab
      //   const newActiveTab = updatedInvoices.some(
      //     (inv) => inv.invoice_id === currentInvoice.invoice_id
      //   )
      //     ? activeTab
      //     : 0;
      //   setActiveTab(newActiveTab);
      // } else {
      //   // No invoices left after checkout
      //   setActiveTab(0);
      // }

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
      window.location.href = "/profile/MyInvoices";
      //setTimeout(() => navigate("/profile/MyInvoices"), 200);
    } catch (error) {
      //console.error("Checkout error:", error);
    }
  };

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
      // console.error("Remove package error:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
    setPopupIcon(null);
    dispatch(clearInvoiceState());
  };

  // In the render method, get the current invoice's coupon
  const currentInvoice = invoices[activeTab] || {};
  const currentCouponCode = couponCodes[currentInvoice.invoice_id] || "";
  const currentCoupon = coupons[currentInvoice.invoice_id] || {};
  // console.log("currentCoupon ", currentCoupon);
  return (
    <div className="checkout-page" dir={direction}>
      <h2>{t("checkout.PendingInvoices")}</h2>
      <hr />
      {loading && <LoadingPage />}
      {showPopup && (
        <PopUp
          msg={popupMessage}
          closeAlert={closePopup}
          type={popupType}
          icon={popupIcon}
        />
      )}

      <Card className="checkout-card p-3">
        {/* <h2>{t("checkout.MyInvoices")}</h2>
        <hr /> */}
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
                  title={invoice.invoice_code}
                  // title={`${t("checkout.invoice")} ${invoice.invoice_code}`}
                  className="invoice-tab"
                >
                  <Table responsive className="invoice_tbl" bordered hover>
                    <thead>
                      <tr>
                        <th>{t("checkout.service")}</th>
                        <th>{t("checkout.package")}</th>
                        <th>{t("checkout.details")}</th>
                        <th>
                          {t("checkout.price")}{" "}
                          {/* <small className="price_info">
                            ({t("pricing.PerMonth")})
                          </small> */}
                        </th>
                        <th>{t("checkout.currency")}</th>
                        <th>{t("checkout.state")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.pkgs.map((pkg, pkgIndex) => (
                        <tr key={pkgIndex} className="invoice-row">
                          <td className="service-text">{pkg.service_name}</td>

                          <td className="service-text">{pkg.package_name}</td>

                          <td className="service-text">{pkg.package_desc}</td>

                          <td className="service-text">
                            {formatNumber(Number(pkg.package_sale_price))}
                            <small className="price_info">
                              {pkg.price_calc_type == 3
                                ? t("pricing.PerProject")
                                : t("pricing.PerMonth")}
                            </small>
                          </td>

                          <td className="service-text">{pkg.curr_code}</td>

                          <td className="remove-text">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* <Row className="align-items-center text-center text-md-start service-title-row">
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
                  </Row> */}

                  {/* {invoice.pkgs.map((pkg, pkgIndex) => (
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
                  ))} */}

                  <hr />
                  <Row className="justify-content-between align-items-start voucher-price-wrapper">
                    <Col md={5} className="voucher-column">
                      <div className="voucher-row d-flex gap-2">
                        <Form.Control
                          type="text"
                          placeholder={t("checkout.couponPlaceholder")}
                          className="voucher-input flex-grow-1"
                          // value={currentCouponCode}
                          value={
                            invoice.copoun_id != null && invoice.copoun_id > 0
                              ? invoice.copoun
                              : currentCouponCode
                          }
                          onChange={(e) =>
                            setCouponCodes((prev) => ({
                              ...prev,
                              [currentInvoice.invoice_id]: e.target.value,
                            }))
                          }
                          disabled={
                            invoice.copoun_id != null && invoice.copoun_id > 0
                          }
                        />
                        <Button
                          className="apply-btn"
                          onClick={handleApplyCoupon}
                          disabled={
                            invoice.copoun_id != null && invoice.copoun_id > 0
                          }
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
                              <span>
                                {t("checkout.subtotal")}{" "}
                                {/* <small className="price_info">
                                  ({t("pricing.PerYear")})
                                </small> */}
                              </span>

                              <strong>
                                {/* {invoice.curr_code}{" "} */}
                                {formatNumber(Number(invoice.total_price))}
                                <small className="price_info">
                                  {currencySymbol}
                                </small>
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>{t("checkout.discount")}</span>
                              <span>
                                {formatNumber(Number(invoice.discount))}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>{t("checkout.giftVoucher")}</span>
                              <span>
                                {invoice.copoun_id != null &&
                                invoice.copoun_id > 0
                                  ? formatNumber(
                                      Number(invoice.copoun_discount)
                                    ) +
                                    " " +
                                    invoice.copoun_discount_type
                                  : "0"}
                                {/* {currentCoupon != null && currentCoupon.valid
                                  ? currentCoupon.discount_value
                                  : invoice.copoun_id != null &&
                                    invoice.copoun_id > 0
                                  ? invoice.copoun_discount +
                                    invoice.copoun_discount_type
                                  : 0} */}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between total-row">
                              <span>{invoice.tax_code}</span>
                              <span>{invoice.tax_amount}</span>
                            </div>
                            <div className="d-flex justify-content-between total-row">
                              <span>
                                {t("checkout.grandTotal")}
                                {/* <small className="price_info">
                                  ({t("pricing.PerYear")})
                                </small> */}
                              </span>

                              <strong>
                                {formatNumber(
                                  Number(invoice.grand_total_price)
                                )}
                                <small className="price_info">
                                  {currencySymbol}{" "}
                                </small>
                                {/* <small className="price_info">
                                  ({t("pricing.PerYear")})
                                </small> */}
                              </strong>
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
