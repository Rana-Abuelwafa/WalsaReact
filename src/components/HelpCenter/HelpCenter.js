import React from "react";
import { Form, Card ,Container} from "react-bootstrap";
import { useTranslation } from "react-multi-lang"; 
import "./HelpCenter.scss";

 const HelpCenter = () => {
    const t = useTranslation();
  return (
    <div className="helpCenterContainer" dir={t("direction")}>
      <Container className="helpCenter-section">
      <section className="heroSection">
        <h1 className="heroTitle">{t("helpCenter.welcomeToHelp")}</h1>
        <div className="searchInputWrapper">
          <Form.Control
            type="search"
            placeholder={t("helpCenter.searchPlacholder")}
            className="searchInput"
          />
        </div>
      </section>

      <section className="categoriesSection">
        <Card className="categoryCard">
          <Card.Body className="cardBody">
            <img src="/images/brand-identity.png" alt="Brand Identity Icon" className="cardImage" />
            <p className="cardText">{t("MenuDropdown.brandIdentity")}</p>
          </Card.Body>
        </Card>
        <Card className="categoryCard">
          <Card.Body className="cardBody">
            <img src="/images/marketing.png" alt="Marketing Icon" className="cardImage" />
            <p className="cardText">{t("MenuDropdown.marketing")}</p>
          </Card.Body>
        </Card>
        <Card className="categoryCard">
          <Card.Body className="cardBody">
            <img src="/images/ads-campaign.png" alt="Ads Campaign Icon" className="cardImage" />
            <p className="cardText">{t("MenuDropdown.adsCampaign")}</p>
          </Card.Body>
        </Card>
        <Card className="categoryCard">
          <Card.Body className="cardBody">
            <img src="/images/graphic-design.png" alt="Website Design Icon" className="cardImage" />
            <p className="cardText">{t("MenuDropdown.websiteDesign")}</p>
          </Card.Body>
        </Card>
      </section>
      </Container>
    </div>
  );
};

export default HelpCenter; 