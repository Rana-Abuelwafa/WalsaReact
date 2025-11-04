import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./NoResults.scss";
const NoResults = () => {
  const navigate = useNavigate(); // React Router hook to navigate between pages
  const t = useTranslation(); // Hook for multilingual translations
  return (
    <>
      <MainNavbar />
      <Container className="pageContainer">
        <div className="contentWrapper">
          <img
            src="/images/no-results.png"
            alt={t("NoResults.title")}
            className="illustration"
            loading="lazy"
          />
          <h1 className="mainTitle">{t("NoResults.title")}</h1>
          <p className="subText">{t("NoResults.subTitle")}</p>
        </div>
      </Container>
      {/* Footer at the bottom */}
      {/* <MainFooter /> */}
    </>
  );
};

export default NoResults;
