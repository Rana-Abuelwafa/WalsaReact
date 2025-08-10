import React from "react";
import { useTranslation } from "react-multi-lang";

const Brand = () => {
    const t = useTranslation();

  return (
    <>
    <div className="helpCenter-content-container">
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_step1")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_step2")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_step3")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_step4")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_step5")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.brand_identity_mail")}</p>
    </div>
    </>
  );
}

export default Brand; 