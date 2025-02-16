import React, { useState, useEffect } from "react";
import {Navbar,Container,Button} from "react-bootstrap";
import "./saleNavbar.scss";
const SaleNavbar = () => {
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
    return(
        <Navbar fixed="top" className="sale-navbar">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <span className="sale-text">
            Our Huge <span className="highlight">Sale Ends in</span>
          </span>
          <div className="countdown-timer">
            {`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
            <div className="countdown-labels">
              <span className="countdown-label">Days</span>
              <span className="countdown-label">Hrs</span>
              <span className="countdown-label">Mins</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>
          <Button className="check-button">Check it out</Button>
        </Container>
      </Navbar>
);
}

export default SaleNavbar;