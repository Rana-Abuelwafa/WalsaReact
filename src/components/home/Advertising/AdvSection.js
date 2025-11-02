import React, { useEffect, useState } from "react";
import bgImage from "../../../imgs/bf2.png";
import "./AdvSection.scss";
function AdvSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  useEffect(() => {
    // 🎯 Set your target date here
    const targetDate = new Date("2025-12-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section
      className="adv-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="countdown-box">
        <div className="time-item">
          <span className="number">
            {timeLeft.days.toString().padStart(2, "0")}
          </span>
          <span className="label">days</span>
        </div>
        <div className="time-item">
          <span className="number">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="label">Hrs</span>
        </div>
        <div className="time-item">
          <span className="number">
            {timeLeft.mins.toString().padStart(2, "0")}
          </span>
          <span className="label">Mins</span>
        </div>
        <div className="time-item">
          <span className="number">
            {timeLeft.secs.toString().padStart(2, "0")}
          </span>
          <span className="label">Secs</span>
        </div>
      </div>
    </section>
  );
}

export default AdvSection;
