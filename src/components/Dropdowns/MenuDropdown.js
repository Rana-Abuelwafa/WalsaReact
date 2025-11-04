import React, { useState } from "react";
import { Dropdown, Button, Row, Col, Card } from "react-bootstrap";
import { CiMenuFries } from "react-icons/ci";
import { useTranslation } from "react-multi-lang";
import "./MenuDropdown.scss";

const MenuDropdown = () => {
  const t = useTranslation(); // Translation hook
  const [show, setShow] = useState(false); // State to toggle dropdown visibility

  return (
    <Dropdown
      show={show}
      onToggle={() => setShow(!show)} // Toggle the dropdown menu on click
      className="Menu-dropdown"
    >
      {/* Toggle Button with icon */}
      <Dropdown.Toggle as={Button} variant="light" className="dropdown-toggle">
        <CiMenuFries className="menu-icon" />
      </Dropdown.Toggle>

      {/* Dropdown Menu aligned based on language direction */}
      <Dropdown.Menu
        align={document.documentElement.dir === "rtl" ? "start" : "end"}
        className="dropdown-menu-custom"
      >
        {/* Menu Items Grid Layout */}
        <Row className="px-3 py-2">
          {/* Brand Identity Card */}
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img
                    src="/images/brand-identity.png"
                    alt="Brand Identity"
                    className="icon-img"
                    loading="lazy"
                  />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.brandIdentity")}</span>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Marketing Card */}
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img
                    src="/images/marketing.png"
                    alt="Marketing"
                    className="icon-img"
                    loading="lazy"
                  />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.marketing")}</span>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Ads Campaign Card */}
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img
                    src="/images/ads-campaign.png"
                    alt="Ads Campaign"
                    className="icon-img"
                  />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.adsCampaign")}</span>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Website Design Card */}
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img
                    src="/images/graphic-design.png"
                    alt="Website Design"
                    className="icon-img"
                  />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.websiteDesign")}</span>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MenuDropdown;
