import React, { useState } from 'react';
import './ProfileTabPanel.scss';
import ProfileSettings from "./ProfileSettings";
import Brand from "./Brand";
import ChangePasswordForm from "./ChangePasswordForm";
import ComingSoon from "./ComingSoon";

// Placeholder icons
const profileIcon = '/images/profile_tab.png';
const infoIcon = '/images/info_tab.png';
const passwordIcon = '/images/pass_tab.png';
const previewIcon = '/images/preview_tab.png';
const booknoteIcon = '/images/pay_tab.png';
const shoppingIcon = '/images/shopping_tab.png';

const ProfileTabPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: profileIcon },  
    { id: 'info', icon: infoIcon },        
    { id: 'password', icon: passwordIcon },
    { id: 'preview', icon: previewIcon },   
    { id: 'booknote', icon: booknoteIcon },
    { id: 'shopping', icon: shoppingIcon }   
  ];

  return (
    <div className="profile-tab-panel-container">
      <div className="profile-tab-panel">
        <div className="tabs-container">
          <div className="tabs-scroll">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.id}
              >
                <img src={tab.icon} alt={tab.id} className="tab-icon" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="tab-content-container">
          <div className="tab-content">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'info' && <Brand />}
            {activeTab === 'password' && <ChangePasswordForm />}
            {activeTab === 'preview' && <ComingSoon />}
            {activeTab === 'booknote' && <ComingSoon />}
            {activeTab === 'shopping' && <ComingSoon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabPanel;