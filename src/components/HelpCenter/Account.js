import React from "react";
import { useTranslation } from "react-multi-lang";

const Account = () => {
    const t = useTranslation();

  return (
    <>
    <div className="helpCenter-content-container">
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.account_step1")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.account_step2")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.account_step3")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.account_step4")}</p>
        <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.account_Congrates")}</p>
    </div>
    </>
  );
}

export default Account; 