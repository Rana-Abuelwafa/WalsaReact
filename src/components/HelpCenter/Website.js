import React from "react";
import { useTranslation } from "react-multi-lang";

const Website = () => {
  const t = useTranslation();

  return (
    <>
     <div className="helpCenter-content-container">
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_step1")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_step2")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_step3")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_step4")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_step5")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.website_mail")}</p>
    </div>
    </>
  );
}

export default Website; 