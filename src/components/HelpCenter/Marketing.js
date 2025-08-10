import React from "react";
import { useTranslation } from "react-multi-lang";

const Marketing = () => {
  const t = useTranslation();

  return (
    <>
     <div className="helpCenter-content-container">
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_step1")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_step2")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_step3")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_step4")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_step5")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.marketing_mail")}</p>
    </div>
    </>
  );
}

export default Marketing; 