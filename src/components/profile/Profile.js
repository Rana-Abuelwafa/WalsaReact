import React from "react";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import ProfileTabPanel from './ProfileTabPanel';

const Profile = () => {
 
  return (
    <>
      <MainNavbar /> {/* Main navigation bar */}
      <ProfileTabPanel /> {/* profile tabpanels */}
      <MainFooter /> {/* Main footer at bottom */}
    </>
  );
};

export default Profile;