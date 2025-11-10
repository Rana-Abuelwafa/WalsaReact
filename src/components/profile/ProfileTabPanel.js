import React, { useState } from "react";
import "./ProfileTabPanel.scss";
import ProfileSettings from "./ProfileSettings";
import Brand from "./Brand";
import ChangePasswordForm from "./ChangePasswordForm";
import Product from "./Product";
import Invoice from "./Invoice";
import InvoiceHistory from "./InvoiceHistory";
import InvoicePreview from "./InvoicePreview";
import ComingSoon from "./ComingSoon";
import { useNavigate, useParams, Navigate } from "react-router-dom";
// Tab icons - paths to image assets
const profileIcon = "/images/profile_tab.png";
const infoIcon = "/images/info_tab.png";
const passwordIcon = "/images/pass_tab.png";
const productIcon = "/images/shopping_tab.png";
const previewIcon = "/images/preview_tab.png";
const booknoteIcon = "/images/pay_tab.png";
const shoppingIcon = "/images/shopping_tab.png";
const historyIcon = "/images/history-tab.png";

const ProfileTabPanel = () => {
  const navigate = useNavigate();
  const { tabId } = useParams();
  // State to track which tab is currently active
  // Defaults to 'profile' tab on initial render
  const [activeTab, setActiveTab] = useState(tabId || "Setting");
  const [previewInvoice, setPreviewInvoice] = useState(null);

  // Array defining all available tabs and their properties
  const tabs = [
    { id: "Setting", icon: profileIcon }, // User profile settings
    { id: "Brand", icon: infoIcon }, // Brand information
    { id: "ChangePassword", icon: passwordIcon }, // Password change form
    // { id: 'product', icon: productIcon },   // Product selection
    { id: "MyWorks", icon: previewIcon }, // Preview (coming soon)
    { id: "booknote", icon: booknoteIcon }, // Booknotes (coming soon)
    { id: "MyCart", icon: shoppingIcon }, // Shopping
    { id: "MyInvoices", icon: historyIcon }, // Shopping
    { id: "InvoicePreview", hidden: true },
  ];

  return (
    <div className="profile-tab-panel-container">
      {/* Main container for the entire tab panel */}
      <div className="profile-tab-panel">
        {/* Container for the tab buttons */}
        <div className="tabs-container">
          {/* Scrollable area for tabs (in case there are many) */}
          <div className="tabs-scroll">
            {/* Map through each tab definition to create tab buttons */}
            {tabs.map(
              (tab) =>
                !tab.hidden && (
                  <button
                    key={tab.id} // Unique key for React list rendering
                    className={`tab ${activeTab === tab.id ? "active" : ""}`} // Apply 'active' class if tab is selected
                    onClick={() => {
                      setActiveTab(tab.id);
                      navigate(`/profile/${tab.id}`);
                    }} // Set this tab as active when clicked
                    aria-label={tab.id} // Accessibility label
                  >
                    {/* Tab icon - using img tag with the path from tab definition */}
                    {tab.icon && (
                      <img
                        src={tab.icon}
                        alt={tab.id}
                        className="tab-icon"
                        loading="lazy"
                      />
                    )}
                  </button>
                )
            )}
          </div>
        </div>

        {/* Container for the content that changes based on active tab */}
        <div className="tab-content-container">
          <div className="tab-content">
            {/* Conditional rendering based on activeTab value */}
            {activeTab === "Setting" && <ProfileSettings />}
            {activeTab === "Brand" && <Brand />}
            {activeTab === "ChangePassword" && <ChangePasswordForm />}
            {/* {activeTab === 'product' && <Product />} */}
            {/* All other tabs show the ComingSoon placeholder component */}
            {activeTab === "MyWorks" && <ComingSoon />}
            {activeTab === "booknote" && <ComingSoon />}
            {activeTab === "MyCart" && <Invoice />}
            {/* {activeTab === 'history' && <InvoiceHistory />} */}
            {activeTab === "MyInvoices" && (
              <InvoiceHistory
                setActiveTab={setActiveTab}
                setPreviewInvoice={setPreviewInvoice}
              />
            )}
            {activeTab === "InvoicePreview" && previewInvoice && (
              <InvoicePreview
                invoice={previewInvoice}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabPanel;
