import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import PrivacyPolicy from "./PrivacyPolicy";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";

const PrivacyPolicyPage = () => {
  return (
    <>
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