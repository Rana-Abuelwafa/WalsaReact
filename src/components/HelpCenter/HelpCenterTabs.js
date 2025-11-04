import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-multi-lang";
import "./HelpCenterTabs.scss";
import Account from "./Account";
import General from "./General";
import Plans from "./Plans";
import Website from "./Website";
import Brand from "./Brand";
import Marketing from "./Marketing";

// Tab icons - paths to image assets
const AccountIcon = "/images/start.png";
const GeneralIcon = "/images/help.png";
const PlansIcon = "/images/competitive.png";
const WebsiteIcon = "/images/graphic-design.png";
const BrandIcon = "/images/brand-identity.png";
const MarketingIcon = "/images/marketing.png";

const HelpCenterTabs = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const { tabId } = useParams();

  const [activeTab, setActiveTab] = useState(tabId || "account");

  useEffect(() => {
    if (tabId) {
      setActiveTab(tabId);
    }
  }, [tabId]);

  const tabs = [
    { id: "account", icon: AccountIcon, label: t("helpCenter.account") },
    { id: "plans", icon: PlansIcon, label: t("helpCenter.plans") },
    { id: "website", icon: WebsiteIcon, label: t("helpCenter.website") },
    { id: "brand", icon: BrandIcon, label: t("helpCenter.brand_identity") },
    { id: "marketing", icon: MarketingIcon, label: t("helpCenter.marketing") },
    { id: "general", icon: GeneralIcon, label: t("helpCenter.general") },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/helpCenter/${tabId}`);
  };

  return (
    <div className="helpCenter-tab-panel-container">
      <div className="helpCenter-tab-panel">
        {/* Tabs */}
        <div className="helpCenter-tabs-container">
          <div className="helpCenter-tabs-scroll">
            {tabs.map(
              (tab) =>
                !tab.hidden && (
                  <button
                    key={tab.id}
                    className={`helpCenter-tab ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                    aria-label={tab.id}
                  >
                    {tab.icon && (
                      <img
                        src={tab.icon}
                        alt={tab.id}
                        className="helpCenter-tab-icon"
                        loading="lazy"
                      />
                    )}
                    <span className="helpCenter-tab-label">{tab.label}</span>
                  </button>
                )
            )}
          </div>
        </div>

        {/* Content */}
        <div className="helpCenter-tab-content-container">
          <div className="helpCenter-tab-content">
            {activeTab === "account" && <Account />}
            {activeTab === "general" && <General />}
            {activeTab === "plans" && <Plans />}
            {activeTab === "website" && <Website />}
            {activeTab === "brand" && <Brand />}
            {activeTab === "marketing" && <Marketing />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterTabs;
