import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../shared/popoup/PopUp";
import {
  FaClock,
  FaShoppingCart,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";
import { formatNumber } from "../../helper/helperFN";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices, clearInvoiceState } from "../../slices/invoiceSlice";
import { fetchProfile } from "../../slices/profileSlice";
import downloadInvoice from "../../utils/downloadInvoice";
import "./InvoiceHistory.scss";

const InvoiceHistory = ({ setActiveTab, setPreviewInvoice }) => {
  const t = useTranslation();
  const direction = t("direction");
  const dispatch = useDispatch();
  const { loading, error, success, message, invoices } = useSelector(
    (state) => state.invoice
  );
  const { profileData } = useSelector((state) => state.profile);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupIcon, setPopupIcon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const currentLang =
    useSelector((state) => state.language.currentLang) || "en";

  useEffect(() => {
    const getData = {
      active: true,
      status: 2,
      lang_code: currentLang,
    };
    dispatch(getInvoices(getData));
    dispatch(clearInvoiceState());
    dispatch(fetchProfile());
  }, [dispatch, currentLang]);

  useEffect(() => {
    if (error && message) {
      setPopupMessage(message);
      setPopupType("error");
      setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
      setShowPopup(true);
      dispatch(clearInvoiceState());
    }
  }, [error, message, dispatch]);

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
    setPopupIcon(null);
    dispatch(clearInvoiceState());
  };

  const handlePreview = (invoice) => {
    setPreviewInvoice(invoice);
    setActiveTab("InvoicePreview");
  };

  const handleDownload = async (invoice) => {
    try {
      //console.log("start download", invoice.copoun_discount);
      // Ensure we have the latest profile data
      await dispatch(fetchProfile()).unwrap();

      downloadInvoice({
        forceLang: currentLang,
        user: profileData?.full_name || invoice.client_name || "",
        contact: profileData?.phone_number || invoice.contact_info || "",
        address: profileData?.address || invoice.user_address || "",
        InvoiceNo: invoice.invoice_code || "",
        Date: invoice.invoice_date || new Date().toLocaleDateString(),
        SubTtotal: invoice.total_price || "0",
        // Discount: invoice.discount || "0",
        Discount:
          invoice.copoun_discount != null
            ? invoice.copoun_discount + invoice.copoun_discount_type
            : "0",
        curr_code: invoice.curr_code || "EGP",
        Total: invoice.grand_total_price || "0",
        tax_amount: invoice.tax_amount || 0,
        services: invoice.pkgs || [],
      });
    } catch (error) {
      //console.error("Failed to fetch profile:", error);
      // Fallback to invoice data if profile fetch fails
      downloadInvoice({
        forceLang: currentLang,
        user: invoice.client_name || "",
        contact: invoice.contact_info || "",
        address: invoice.user_address || "",
        InvoiceNo: invoice.invoice_code || "",
        Date: invoice.invoice_date || new Date().toLocaleDateString(),
        SubTtotal: invoice.total_price || "0",
        Discount:
          invoice.copoun_discount != null
            ? invoice.copoun_discount + invoice.copoun_discount_type
            : "0",
        curr_code: invoice.curr_code || "EGP",
        Total: invoice.grand_total_price || "0",
        tax_amount: invoice.tax_amount || 0,
        services: invoice.pkgs || [],
      });
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoice_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 1: // pending
        return <FaClock className="status-icon pending" />;
      case 2: // checkout
        return <FaShoppingCart className="status-icon checkout" />;
      case 3: // paid
        return <FaMoneyBillWave className="status-icon paid" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return t("invoiceHistory.statusPending");
      case 2:
        return t("invoiceHistory.statusCheckout");
      case 3:
        return t("invoiceHistory.statusPaid");
      default:
        return t("invoiceHistory.statusPending");
    }
  };

  return (
    <div className="history-page" dir={direction}>
      {loading && <LoadingPage />}
      {showPopup && (
        <PopUp
          msg={popupMessage}
          closeAlert={closePopup}
          type={popupType}
          icon={popupIcon}
        />
      )}

      {/* <Card className="history-card p-3"> */}
      <div>
        <h2>{t("checkout.MyInvoices")}</h2>
        <hr />
        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder={t("invoiceHistory.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Col>
        </Row>
        {/* new design for invoices by rana to make responsive */}
        {filteredInvoices.length > 0 ? (
          <Table responsive className="invoice_tbl">
            <thead>
              <tr>
                <th>{t("invoiceHistory.invoiceCode")}</th>
                <th>
                  {t("invoiceHistory.price")}{" "}
                  <small className="price_info">({t("pricing.PerYear")})</small>
                </th>
                <th>{t("invoiceHistory.currency")}</th>
                <th>{t("invoiceHistory.date")}</th>
                <th>{t("invoiceHistory.status")}</th>
                <th>{t("invoiceHistory.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr key={index} className="invoice-row">
                  <td className="service-text">{invoice.invoice_code}</td>

                  <td className="service-text">
                    {formatNumber(Number(invoice.grand_total_price))}
                    {/* <small className="price_info">
                      ({t("pricing.PerYear")})
                    </small> */}
                  </td>

                  <td className="service-text">{invoice.curr_code}</td>

                  <td className="service-text">{invoice.invoice_date}</td>

                  <td className="service-text">
                    <div className="status-container">
                      {getStatusIcon(invoice.status)}
                      <span className={`status-text status-${invoice.status}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td md={2} className="state-btns">
                    <Button
                      variant="link"
                      className="p-3"
                      onClick={() => handlePreview(invoice)}
                    >
                      {t("invoiceHistory.preview")}
                    </Button>
                    <Button
                      variant="link"
                      className="p-3"
                      onClick={() => handleDownload(invoice)}
                    >
                      {t("invoiceHistory.download")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Row className="text-center py-4">
            <Col>
              <p>{t("invoiceHistory.noInvoices")}</p>
            </Col>
          </Row>
        )}
        {/* <Row className="align-items-center text-center text-md-start service-title-row">
              <Col md={2}>
                <p>{t("invoiceHistory.invoiceCode")}</p>
              </Col>
              <Col md={2}>
                <p>{t("invoiceHistory.price")}</p>
              </Col>
              <Col md={2}>
                <p>{t("invoiceHistory.currency")}</p>
              </Col>
              <Col md={2}>
                <p>{t("invoiceHistory.date")}</p>
              </Col>
              <Col md={2}>
                <p>{t("invoiceHistory.status")}</p>
              </Col>
              <Col md={2}>
                <p>{t("invoiceHistory.actions")}</p>
              </Col>
            </Row> */}
        {/* {filteredInvoices.map((invoice, index) => (
              <Row
                key={index}
                className="align-items-center text-center text-md-start service-item-row"
              >
                <Col md={2}>
                  <p className="service-text">{invoice.invoice_code}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">{invoice.grand_total_price}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">{invoice.curr_code}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">{invoice.invoice_date}</p>
                </Col>
                <Col md={2}>
                  <div className="status-container">
                    {getStatusIcon(invoice.status)}
                    <span className={`status-text status-${invoice.status}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                </Col>
                <Col md={2} className="state-btns">
                  <Button
                    variant="link"
                    className="p-3"
                    onClick={() => handlePreview(invoice)}
                  >
                    {t("invoiceHistory.preview")}
                  </Button>
                  <Button
                    variant="link"
                    className="p-3"
                    onClick={() => handleDownload(invoice)}
                  >
                    {t("invoiceHistory.download")}
                  </Button>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <Row className="text-center py-4">
            <Col>
              <p>{t("invoiceHistory.noInvoices")}</p>
            </Col>
          </Row>
        )} */}
        {/* </Card> */}
      </div>
    </div>
  );
};

export default InvoiceHistory;
