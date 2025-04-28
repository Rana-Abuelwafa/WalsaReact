import React, { useState } from 'react';
import './ProfileTabPanel.scss';
import ProfileSettings from "./ProfileSettings";
import Brand from "./Brand";
import ChangePasswordForm from "./ChangePasswordForm";

// Placeholder icons - replace these with your actual image imports
const profileIcon = '/images/profile_tab.png';
const infoIcon = '/images/info_tab.png';
const passwordIcon = '/images/pass_tab.png';
const previewIcon = '/images/preview_tab.png';
const booknoteIcon = '/images/pay_tab.png';
const shoppingIcon = '/images/shopping_tab.png';

const ProfileTabPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: profileIcon, showButton: true },  
    { id: 'info', icon: infoIcon, showButton: true },        
    { id: 'password', icon: passwordIcon, showButton: true },
    { id: 'preview', icon: previewIcon, showButton: false },   
    { id: 'booknote', icon: booknoteIcon, showButton: true },
    { id: 'shopping', icon: shoppingIcon, showButton: false }   
  ];
  // const shouldShowButton = tabs.find(tab => tab.id === activeTab)?.showButton;
  return (
    <div className="tab-panel-container">
      <div className="tab-panel">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <img src={tab.icon} alt={tab.label} className="tab-icon" />
            </button>
          ))}
        </div>
        <div className="selection-bar">
          <div className="tab-content">
            {activeTab === 'profile' && <div><ProfileSettings /></div>}
            {activeTab === 'info' && <div><Brand /></div>}
            {activeTab === 'password' && <div><ChangePasswordForm /></div>}
            {activeTab === 'preview' && <div>Preview content goes here</div>}
            {activeTab === 'booknote' && <div>Booknote content goes here</div>}
            {activeTab === 'shopping' && <div>Shopping content goes here</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabPanel;