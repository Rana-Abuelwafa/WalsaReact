import React from "react";
import { useTranslation } from "react-multi-lang";

const Plans = () => {
  const t = useTranslation();

  return (
    <>
    <div className="helpCenter-content-container">
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_step1")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_step2")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_step3")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_step4")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_step5")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.plans_mail")}</p>
    </div>
    </>
  );
}

export default Plans; 