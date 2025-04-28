import React from "react";
import MainNavbar from '../navbars/mainNavbar';
import MainFooter from '../footer/mainFooter';
import ProfileTabPanel from './ProfileTabPanel';

const Profile = () => {
 
  return (
    <>
      <MainNavbar />
      <ProfileTabPanel />
      <MainFooter />
    </>
  );
};

export default Profile;