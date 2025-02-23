import React, { useState } from "react";
import { Dropdown, Button, Row, Col, Card } from "react-bootstrap";
import { CiMenuFries } from "react-icons/ci"; // Menu Icon
import { useTranslation } from "react-multi-lang"; // Import translation hook
import './MenuDropdown.scss';

const MenuDropdown = () => {
  const t = useTranslation(); // Initialize translation
  const [show, setShow] = useState(false);

  return (
    <Dropdown show={show} onToggle={() => setShow(!show)} className="Menu-dropdown">
      <Dropdown.Toggle as={Button} variant="light" className="dropdown-toggle">
        <CiMenuFries className="menu-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="dropdown-menu-custom">
        <Row className="px-3 py-2">
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img src="/images/brand-identity.png" alt="Brand Identity" className="icon-img" />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.brandIdentity")}</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img src="/images/marketing.png" alt="Marketing" className="icon-img" />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.marketing")}</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img src="/images/ads-campaign.png" alt="Ads Campaign" className="icon-img" />
                </Col>
                <Col xs={9}>
                  <span>{t("MenuDropdown.adsCampaign")}</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="dropdown-card">
              <Row>
                <Col xs={3}>
                  <img src="/images/graphic-design.png" alt="Website Design" className="icon-img" />
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
