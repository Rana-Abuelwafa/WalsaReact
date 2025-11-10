import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import MainNavbar from "../navbars/mainNavbar";
import MainFooter from "../footer/mainFooter";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import Chat from "../chatIcon/chat";
import "./SearchResultsPage.scss";
import { useSelector } from "react-redux";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../shared/popoup/PopUp";

const Section = ({
  title,
  items,
  onSelectPackage,
  serviceId,
  selectedPackageId,
}) => {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="pricing-section">
      <h3 className="section-title">{title}</h3>
      <Row>
        {items.map((plan, idx) => (
          <Col key={idx} md={3} className="mb-4">
            <Card
              className={`pricing-card ${plan.recommended ? "best" : ""} ${
                selectedPackageId === plan.package_id ? "selected" : ""
              }`}
            >
              {plan.recommended && (
                <Badge className="best-badge">{t("pricing.recommended")}</Badge>
              )}
              <Card.Body>
                <Card.Title>{plan.package_name}</Card.Title>
                <p className="plan-desc">{plan.package_desc}</p>
                <div className="pricing-info">
                  {plan.isCustom ? (
                    <span className="old-price custom-price">
                      {t("pricing.Custom")}
                    </span>
                  ) : plan.oldPrice == plan.price ? (
                    plan.price > 0 && (
                      <span className="current-price ms-2">
                        {plan.price} {plan.curr_code}
                      </span>
                    )
                  ) : (
                    <>
                      {plan.oldPrice > 0 && (
                        <span className="old-price">
                          {plan.oldPrice} {plan.curr_code}
                        </span>
                      )}
                      {plan.price > 0 && (
                        <span className="current-price ms-2">
                          {plan.price} {plan.curr_code}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <hr className="pricingHr" />
                <ul className="features-list">
                  {plan.features.map((feat, i) => (
                    <li key={i}>{feat.feature_name}</li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? "warning" : "outline-dark"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(plan.package_id, serviceId);
                  }}
                >
                  {t("pricing.select")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const SearchResultsPage = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const direction = t("direction");
  const [selectedPackages, setSelectedPackages] = useState({});

  const { results, loading, error, searchTerm } = useSelector(
    (state) => state.search
  );
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    if (error) {
      setPopupMessage(error);
      setPopupType("error");
      setShowPopup(true);
    }
  }, [error]);

  const handleSelectPackage = (packageId, serviceId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setPopupMessage(t("pricing.LoginToSelect"));
      setPopupType("error");
      setShowPopup(true);
      setTimeout(
        () =>
          navigate("/login", {
            replace: true,
            state: { redirectPath: "/searchResults", isAuthRedirect: true },
          }),
        2000
      );
      return;
    }

    setSelectedPackages((prev) => {
      if (prev[serviceId] === packageId) {
        const newState = { ...prev };
        delete newState[serviceId];
        return newState;
      }
      return {
        ...prev,
        [serviceId]: packageId,
      };
    });
  };

  const handleContinue = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setPopupMessage(t("pricing.LoginToContinue"));
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    navigate("/confirmation", {
      state: {
        selectedPackages,
        allPackages: transformedData,
      },
    });
  };

  const transformData = (data) => {
    return data.map((service) => ({
      service_id: service.service_id,
      serviceName: service.service_name,
      pkgs: service.pkgs
        .map((pkg) => ({
          ...pkg,
          recommended: pkg.is_recommend,
          features: pkg.features || [],
          price: pkg.package_sale_price,
          oldPrice: pkg.package_price,
          isCustom: pkg.is_custom,
          isSelected: pkg.isSelected,
          service_package_id: pkg.service_package_id,
        }))
        .sort((a, b) => a.order - b.order),
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
  };

  if (loading) {
    return (
      <div className="search-results-page">
        <LoadingPage />
      </div>
    );
  }

  if (!results || results.length === 0) {
    navigate("/NoResults");
    return null;
  }

  const transformedData = transformData(results);
  const activeServices = transformedData.filter(
    (service) => service.pkgs.length > 0
  );

  const isContinueDisabled = Object.keys(selectedPackages).length === 0;

  return (
    <>
      <MainNavbar />
      {showPopup && (
        <PopUp msg={popupMessage} closeAlert={closePopup} type={popupType} />
      )}
      <div className="search-results-page" dir={direction}>
        <Container>
          <div className="text-center mt-5">
            <h2 className="search-header">
              {t("search.results_for")}: "
              <span className="searchTerm">{searchTerm}</span>"
            </h2>
            <hr className="pricingHr" />
          </div>

          {activeServices.map((service) => (
            <Section
              key={service.service_id}
              title={service.serviceName}
              items={service.pkgs}
              onSelectPackage={handleSelectPackage}
              serviceId={service.service_id}
              selectedPackageId={selectedPackages[service.service_id]}
            />
          ))}

          <div className="continue-btn-container">
            <button
              className="continue-btn"
              onClick={handleContinue}
              disabled={isContinueDisabled}
            >
              {t("pricing.next")}
            </button>
          </div>
        </Container>
      </div>
      <MainFooter />
      <Chat />
    </>
  );
};

export default SearchResultsPage;
