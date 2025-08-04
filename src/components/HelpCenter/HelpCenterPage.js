import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import HelpCenter from "./HelpCenter";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";

const HelpCenterPage = () => {
  return (
    <>
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