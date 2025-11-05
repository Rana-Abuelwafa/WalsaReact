import React from "react";
import MainNavbar from "../navbars/mainNavbar";
import MainFooter from "../footer/mainFooter";
import ProfileTabPanel from "./ProfileTabPanel";
import { useTranslation } from "react-multi-lang";
import MetaTagsSeo from "../shared/MetaTagsSeo";
const Profile = () => {
  const t = useTranslation();
  return (
    <>
      <MetaTagsSeo
        description={t("SEO.Profile.description")}
        keywords={t("SEO.Profile.keywords")}
        title={t("SEO.Profile.title")}
        OGDescription={t("SEO.Profile.OGDescription")}
        url="https://waslaa.de/profile"
      />
      <MainNavbar /> {/* Main navigation bar */}
      <ProfileTabPanel /> {/* profile tabpanels */}
      <MainFooter /> {/* Main footer at bottom */}
    </>
  );
};

export default Profile;
