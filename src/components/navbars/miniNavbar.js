import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import "./mainNavbar.scss";

const MiniNavbar = () => {
  // State to track if the screen is mobile size (width < 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle window resize events
  useEffect(() => {
    // Function to update isMobile state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    
    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    // Navbar component fixed to top of page with custom class
    <Navbar fixed="top" className="navbar-mini">
      {/* Bootstrap Container for proper alignment and padding */}
      <Container>
        {/* Navbar brand/logo section */}
        <Navbar.Brand href="/" className="brand">
          {/* Logo image with dynamic width based on isMobile state */}
          <img
            src="logo/wasla logo.png"
            alt="Logo"
            className="logo"
            style={{ width: isMobile ? "100px" : "135px" }} // Smaller width on mobile
          />
        </Navbar.Brand>
        
        {/* Right-aligned section for additional components */}
        <div className="d-flex align-items-center">
          {/* Language dropdown component */}
          <LanguageDropdown />
        </div>
      </Container>
    </Navbar>
  );
};

export default MiniNavbar;