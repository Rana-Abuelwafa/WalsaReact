import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import HelpCenter from "./HelpCenter";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";
import MetaTagsSeo from "../shared/MetaTagsSeo";
import { useTranslation } from "react-multi-lang";
const HelpCenterPage = () => {
  const t = useTranslation();
  return (
    <>
      <MetaTagsSeo
        description={t("SEO.HelpCenter.description")}
        keywords={t("SEO.HelpCenter.keywords")}
        title={t("SEO.HelpCenter.title")}
        OGDescription={t("SEO.HelpCenter.OGDescription")}
        url="https://waslaa.de/helpCenter"
      />
      {/* Top navigation bars */}
      <MainNavbar />
      {/* <SaleNavbar /> */}
      {/* Main HelpCenter page wrapper */}
      <HelpCenter />
      {/* Footer */}
      <MainFooter />
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default HelpCenterPage;
