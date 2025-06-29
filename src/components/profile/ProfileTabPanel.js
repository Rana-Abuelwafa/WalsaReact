import React, { useState } from 'react';
import './ProfileTabPanel.scss';
import ProfileSettings from "./ProfileSettings";
import Brand from "./Brand";
import ChangePasswordForm from "./ChangePasswordForm";
import Product from "./Product";
import Invoice from "./Invoice";
import InvoiceHistory from "./InvoiceHistory";
import ComingSoon from "./ComingSoon";

// Tab icons - paths to image assets
const profileIcon = '/images/profile_tab.png';
const infoIcon = '/images/info_tab.png';
const passwordIcon = '/images/pass_tab.png';
const productIcon = '/images/shopping_tab.png';
const previewIcon = '/images/preview_tab.png';
const booknoteIcon = '/images/pay_tab.png';
const shoppingIcon = '/images/shopping_tab.png';
const historyIcon = '/images/history-tab.png';

const ProfileTabPanel = () => {
  // State to track which tab is currently active
  // Defaults to 'profile' tab on initial render
  const [activeTab, setActiveTab] = useState('profile');

  // Array defining all available tabs and their properties
  const tabs = [
    { id: 'profile', icon: profileIcon },  // User profile settings
    { id: 'info', icon: infoIcon },        // Brand information
    { id: 'password', icon: passwordIcon }, // Password change form
    // { id: 'product', icon: productIcon },   // Product selection
    { id: 'preview', icon: previewIcon },   // Preview (coming soon)
    { id: 'booknote', icon: booknoteIcon }, // Booknotes (coming soon)
    { id: 'shopping', icon: shoppingIcon },  // Shopping
    { id: 'history', icon: historyIcon }  // Shopping  
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
            {tabs.map((tab) => (
              <button
                key={tab.id} // Unique key for React list rendering
                className={`tab ${activeTab === tab.id ? 'active' : ''}`} // Apply 'active' class if tab is selected
                onClick={() => setActiveTab(tab.id)} // Set this tab as active when clicked
                aria-label={tab.id} // Accessibility label
              >
                {/* Tab icon - using img tag with the path from tab definition */}
                <img src={tab.icon} alt={tab.id} className="tab-icon" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Container for the content that changes based on active tab */}
        <div className="tab-content-container">
          <div className="tab-content">
            {/* Conditional rendering based on activeTab value */}
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'info' && <Brand />}
            {activeTab === 'password' && <ChangePasswordForm />}
            {/* {activeTab === 'product' && <Product />} */}
            {/* All other tabs show the ComingSoon placeholder component */}
            {activeTab === 'preview' && <ComingSoon />}
            {activeTab === 'booknote' && <ComingSoon />}
            {activeTab === 'shopping' && <Invoice />}
            {activeTab === 'history' && <InvoiceHistory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabPanel;