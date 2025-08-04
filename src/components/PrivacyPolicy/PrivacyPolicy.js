import { useTranslation } from "react-multi-lang";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
  const t = useTranslation();
  const dir = t("direction");

  // Access translations
  const privacyPolicyTitle = t("privacyPolicy.privacyPolicy");
  const introText = t("privacyPolicy.intro");
  
  return (
    <div className="privacyPolicyContainer" dir={dir}>
      <div className="contentWrapper">
        <div className="headerSection">
          <div className="textContainer">
            <h1 className="mainTitle">{privacyPolicyTitle}</h1>
            <p className="introText">{introText}</p>
          </div>
          <img
            src="/images/PrivacyPolicy.png"
            alt="Privacy Policy Illustration"
            className="illustration"
          />
        </div>

        <div className="policySections">
            <div className="policySection">
              <h2>1. {t("privacyPolicy.sections.section1.title")}</h2>
                <p >{t("privacyPolicy.sections.section1.content.1")}</p>
                <p >{t("privacyPolicy.sections.section1.content.2")}</p>
                <p >{t("privacyPolicy.sections.section1.content.3")}</p>
            </div>

                        <div className="policySection">
              <h2>2. {t("privacyPolicy.sections.section2.title")}</h2>
                <p >{t("privacyPolicy.sections.section2.content.1")}</p>
                <p >{t("privacyPolicy.sections.section2.content.2")}</p>
                <p >{t("privacyPolicy.sections.section2.content.3")}</p>
            </div>

                        <div className="policySection">
              <h2>3. {t("privacyPolicy.sections.section3.title")}</h2>
                <p >{t("privacyPolicy.sections.section3.content.1")}</p>
                <p >{t("privacyPolicy.sections.section3.content.2")}</p>
            </div>

                        <div className="policySection">
              <h2>4. {t("privacyPolicy.sections.section4.title")}</h2>
                <p >{t("privacyPolicy.sections.section4.content.1")}</p>
                <p >{t("privacyPolicy.sections.section4.content.2")}</p>
            </div>

                        <div className="policySection">
              <h2>5. {t("privacyPolicy.sections.section5.title")}</h2>
                <p >{t("privacyPolicy.sections.section5.content.1")}</p>
            </div>


                        <div className="policySection">
              <h2>6. {t("privacyPolicy.sections.section6.title")}</h2>
                <p >{t("privacyPolicy.sections.section6.content.1")}</p>
                <p >{t("privacyPolicy.sections.section6.content.2")}</p>
            </div>

                        <div className="policySection">
              <h2>7. {t("privacyPolicy.sections.section7.title")}</h2>
                <p >{t("privacyPolicy.sections.section7.content.1")}</p>
            </div>

                        <div className="policySection">
              <h2>8. {t("privacyPolicy.sections.section8.title")}</h2>
                <p>{t("privacyPolicy.sections.section8.content.1")}</p>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;