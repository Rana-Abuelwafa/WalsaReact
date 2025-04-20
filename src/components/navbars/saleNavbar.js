import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import "./saleNavbar.scss";

const SaleNavbar = () => {
  const navigate = useNavigate();
  const t = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [targetDate] = useState(() => {
    const date = new Date("2025-03-01T00:00:00");
    date.setDate(date.getDate() + 100);
    return date;
  });

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    return difference > 0 ? {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    } : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Navbar fixed="top" className="sale-navbar">
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col md={4} className="sale-text-col">
            <span className="sale-text">
              {t("SaleNavbar.saleText")} <span className="highlight">{t("SaleNavbar.saleEndsIn")}</span>
            </span>
          </Col>
          
          <Col md={4} className="countdown-col">
            <div className="countdown-timer">
              {`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
              <div className="countdown-labels">
                <span>{t("SaleNavbar.days")}</span>
                <span>{t("SaleNavbar.hours")}</span>
                <span>{t("SaleNavbar.minutes")}</span>
                <span>{t("SaleNavbar.seconds")}</span>
              </div>
            </div>
          </Col>
          
          <Col md={4} className="button-col">
            <Button className="check-button" onClick={() => navigate("/login")}>
              {t("SaleNavbar.checkItOut")}
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default SaleNavbar;