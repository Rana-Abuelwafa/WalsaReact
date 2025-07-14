import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import "./saleNavbar.scss";

const SaleNavbar = () => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  // Translation hook for multilingual support
  const t = useTranslation();

  // State to track if the screen is mobile size (width < 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle window resize events for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // State for the target date (100 days from March 1, 2025)
  const [targetDate] = useState(() => {
    const date = new Date("2025-03-01T00:00:00");
    date.setDate(date.getDate() + 200); // Add 100 days to the initial date
    return date;
  });

  // Function to calculate remaining time until target date
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Return zeros if sale has ended
  };

  // State to store and update remaining time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Effect to update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [targetDate]);

  return (
    // Fixed top navbar with custom styling
    <Navbar fixed="top" className="sale-navbar">
      {/* Fluid container for full-width layout */}
      <Container fluid>
        {/* Single row with three equal columns */}
        <Row className="w-100 align-items-center">
          {/* First column: Sale text */}
          <Col md={4} className="sale-text-col">
            <span className="sale-text">
              {t("SaleNavbar.saleText")} {/* Translated text */}
              <span className="highlight">
                {t("SaleNavbar.saleEndsIn")}
              </span>{" "}
              {/* Highlighted text */}
            </span>
          </Col>

          {/* Second column: Countdown timer */}
          <Col md={4} className="countdown-col">
            <div className="countdown-timer">
              {/* Display time values separated by colons */}
              {`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
              {/* Labels for each time unit */}
              <div className="countdown-labels">
                <span>{t("SaleNavbar.days")}</span>
                <span>{t("SaleNavbar.hours")}</span>
                <span>{t("SaleNavbar.minutes")}</span>
                <span>{t("SaleNavbar.seconds")}</span>
              </div>
            </div>
          </Col>

          {/* Third column: Action button */}
          <Col md={4} className="button-col">
            <Button
              className="check-button"
              onClick={() => navigate("/login")} // Navigate to login page on click
            >
              {t("SaleNavbar.checkItOut")} {/* Translated button text */}
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default SaleNavbar;
