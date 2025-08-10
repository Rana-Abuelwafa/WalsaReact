import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import HelpCenterTabs from "./HelpCenterTabs";
import MainFooter from "../footer/mainFooter";
import Chat from "../chatIcon/chat";

const HelpCenterTabsPage = () => {
  return (
    <>
      {/* Top navigation bars */}
      <MainNavbar />
      {/* <SaleNavbar /> */}
      
      {/* Main HelpCenter page wrapper */}
      <HelpCenterTabs />

      {/* Footer */}
      <MainFooter />
      <Chat /> {/* Floating chat icon for quick support */}
    </>
  );
};

export default HelpCenterTabsPage;