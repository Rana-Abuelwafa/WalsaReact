import React, { useState } from "react";
import { Dropdown, Button, Row, Col, Card } from "react-bootstrap";
import { CiMenuFries } from "react-icons/ci"; // Menu Icon
import './MenuDropdown.scss';

const MenuDropdown = () => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown show={show} onToggle={() => setShow(!show)} className="Menu-dropdown">
      <Dropdown.Toggle as={Button} variant="light" className="dropdown-toggle">
        <CiMenuFries className="menu-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="dropdown-menu-custom">
        <Row className="px-3 py-2">
          {/* <Col xs={6}>
            <Card className="dropdown-card">
              <img src="/images/chat.png" alt="Chat" className="icon-img" />
              <span>CHAT</span>
            </Card>
          </Col> */}
           <Col xs={6}>
            <Card className="dropdown-card">
            <Row>
                <Col xs={3}>
                  <img src="/images/brand-identity.png" alt="Brand Identity" className="icon-img" />
                </Col>
            
                <Col xs={9}>
                  <span>BRAND IDENTITY</span>
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
                <span>MARKETING</span>
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
                <span>ADS CAMPAIGN</span>
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
                <span>WEBSITE DESIGN</span>
                </Col>
            </Row>
            </Card>
          </Col>
          {/* <Col xs={12}>
            <Card className="dropdown-card full-width">
              <span>ENTIRE SCOPE OF SERVICE</span>
            </Card>
          </Col> */}
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MenuDropdown;
