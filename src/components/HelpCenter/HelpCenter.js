import React, { useState } from "react";
import { Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-multi-lang";

import "./HelpCenter.scss";

const HelpCenter = () => {
  const t = useTranslation();
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");

  const cards = [
    { img: "/images/start.png", text: t("helpCenter.account"), desc:t("helpCenter.account_desc"), alt: "Account Icon", tab: "account" },
    { img: "/images/help.png", text: t("helpCenter.general"), desc:t("helpCenter.general_desc"), alt: "General Icon", tab: "general" },
    { img: "/images/competitive.png", text: t("helpCenter.plans"), desc:t("helpCenter.plans_desc"), alt: "Plans Icon", tab: "plans" },
    { img: "/images/graphic-design.png", text: t("helpCenter.website"), desc:t("helpCenter.website_desc"), alt: "Website Design Icon", tab: "website" },
    { img: "/images/brand-identity.png", text: t("helpCenter.brand_identity"), desc:t("helpCenter.brand_desc"), alt: "Brand Identity Icon", tab: "brand" },
    { img: "/images/marketing.png", text: t("helpCenter.marketing"), desc:t("helpCenter.marketing_desc"), alt: "Marketing Icon", tab: "marketing" },
  ];

  const filteredCards = cards.filter(card =>
    card.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="helpCenterContainer" dir={t("direction")}>
      <Container className="helpCenter-section">
        <section className="heroSection">
          <h1 className="heroTitle">{t("helpCenter.welcome_title")}</h1>
          <div className="searchInputWrapper">
            <Form.Control
              type="search"
              placeholder={t("helpCenter.search_placeholder")}
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className="categoriesSection">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <Card 
              onClick={() => navigate(`/helpCenter/${card.tab}`)}
              className="categoryCard" 
              key={index}
              >
                <Card.Body className="cardBody">
                  <img src={card.img} alt={card.alt} className="cardImage" />
                  <p className="cardText">{card.text}</p>
                  <p className="cardDesc">{card.desc}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="noResults">{t("helpCenter.noResultsFound")}</p>
          )}
        </section>
      </Container>
    </div>
  );
};

export default HelpCenter;