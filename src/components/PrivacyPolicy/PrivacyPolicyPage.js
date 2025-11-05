import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import PrivacyPolicy from "./PrivacyPolicy";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";
import MetaTagsSeo from "../shared/MetaTagsSeo";
import { useTranslation } from "react-multi-lang";
const PrivacyPolicyPage = () => {
  const t = useTranslation();
  return (
    <>
      <MetaTagsSeo
        description={t("SEO.Privacy.description")}
        keywords={t("SEO.Privacy.keywords")}
        title={t("SEO.Privacy.title")}
        OGDescription={t("SEO.Privacy.OGDescription")}
        url="https://waslaa.de/privacyPolicy"
      />
      {/* Top navigation bars */}
      <MainNavbar />
      {/* <SaleNavbar /> */}
      {/* Main privacy page wrapper */}
      <PrivacyPolicy />
      {/* Footer */}
      <MainFooter />
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default PrivacyPolicyPage;
