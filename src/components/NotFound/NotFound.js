import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./NotFound.scss";
const NotFound = () => {
  const navigate = useNavigate(); // React Router hook to navigate between pages
  const t = useTranslation(); // Hook for multilingual translations
  return (
    <>
      <MainNavbar />
      <Container className="pageContainer">
        <div className="contentWrapper">
          <h1 className="mainTitle">{t("NotFound.title")}</h1>
          <img src="/images/404-error.png" alt="404 Error Illustration" className="illustration" />
          <Button onClick={() => navigate("/")} variant="primary" className="goBackButton">
            {t("NotFound.backBtn")}
          </Button>
        </div>
      </Container>    
      {/* Footer at the bottom */}
      {/* <MainFooter /> */}
    </>
  );
};

export default NotFound;
