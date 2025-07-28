import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import MainFooter from "../footer/mainFooter";
import { useTranslation } from "react-multi-lang";
import "./NotFound.scss";
const NotFound = () => {
  const t = useTranslation();
  return (
    <>
      <MainNavbar />
      <div className="NotFound">
        <div className="content">
          <h1>{t("NotFound.Title")}</h1>
          <p>{t("NotFound.SubTitle")}</p>
        </div>
      </div>
      {/* Footer at the bottom */}
      <MainFooter />
    </>
  );
};

export default NotFound;
