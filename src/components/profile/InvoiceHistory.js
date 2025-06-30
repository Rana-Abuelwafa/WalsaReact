import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../shared/popoup/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices, clearInvoiceState } from "../../slices/invoiceSlice";
import downloadInvoice from "../../utils/downloadInvoice";
import "./InvoiceHistory.scss";

const InvoiceHistory = ({ setActiveTab, setPreviewInvoice }) => {
  const t = useTranslation();
  const direction = t("direction");
  const dispatch = useDispatch();
  const { loading, error, success, invoices, coupon } = useSelector(
    (state) => state.invoice
  );

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");
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

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    dispatch(clearInvoiceState());
  };

  const handlePreview = (invoice) => {
    setPreviewInvoice(invoice);
    setActiveTab("invoicePreview");
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoice_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history-page" dir={direction}>
      {loading && <LoadingPage />}
      {showPopup && <PopUp msg={popupMessage} closeAlert={closePopup} />}

      <Card className="history-card p-3">
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

        {filteredInvoices.length > 0 ? (
          <>
            <Row className="align-items-center text-center text-md-start service-title-row">
              <Col md={3}>
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
              <Col md={3}>
                <p>{t("invoiceHistory.actions")}</p>
              </Col>
            </Row>

            {filteredInvoices.map((invoice, index) => (
              <Row
                key={index}
                className="align-items-center text-center text-md-start service-item-row"
              >
                <Col md={3}>
                  <p className="service-text">{invoice.invoice_code}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">{invoice.grand_total_price}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">{invoice.curr_code}</p>
                </Col>
                <Col md={2}>
                  <p className="service-text">25 May 2025</p>
                </Col>
                <Col md={3} className="state-btns">
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
                    onClick={() =>
                      downloadInvoice({
                        user: invoice.user_name || "",
                        contact: invoice.contact_info || "",
                        address: invoice.user_address || "",
                        InvoiceNo: invoice.invoice_code || "",
                        Date: invoice.date || new Date().toLocaleDateString(),
                        SubTtotal: invoice.total_price || "0",
                        Discount: invoice.discount || "0",
                        Total: invoice.grand_total_price || "0",
                        services: invoice.pkgs || [],
                      })
                    }
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
              <p>{t("checkout.noInvoices")}</p>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default InvoiceHistory;
