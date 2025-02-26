import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import "./saleNavbar.scss";

const SaleNavbar = () => {
  const navigate = useNavigate();
  const t = useTranslation(); // Initialize translation

  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 60);
    return date;
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Navbar fixed="top" className="sale-navbar">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <span className="sale-text">
          {t("SaleNavbar.saleText")} <span className="highlight">{t("SaleNavbar.saleEndsIn")}</span>
        </span>
        <div className="countdown-timer">
          {`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
          <div className="countdown-labels">
            <span className="countdown-label">{t("SaleNavbar.days")}</span>
            <span className="countdown-label">{t("SaleNavbar.hours")}</span>
            <span className="countdown-label">{t("SaleNavbar.minutes")}</span>
            <span className="countdown-label">{t("SaleNavbar.seconds")}</span>
          </div>
        </div>
        <Button className="check-button" onClick={() => navigate("/login")}>{t("SaleNavbar.checkItOut")}</Button>
      </Container>
    </Navbar>
  );
};

export default SaleNavbar;
