import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Row, Col, Container, Form, InputGroup } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { FiUser, FiLogOut, FiX } from "react-icons/fi";
import { useTranslation } from "react-multi-lang";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import MenuDropdown from "../Dropdowns/MenuDropdown";
import UserDropDown from "../Dropdowns/UserDropDown";
import { setCurrency } from "../../slices/currencySlice";
import { fetchSearchResults, setSearchTerm, clearSearch } from "../../slices/searchSlice";
import {
  fetchUserCountry,
  getCurrencyFromCountry,
} from "../../utils/currencyService";
import "./mainNavbar.scss";

const MainNavbar = () => {
  // State to hold the user's name from local storage
  const [MyName, setMyName] = useState("");
  const [currCode, setCurrCode] = useState("");
  // State to track profile completion (currently not used for logic)
  const [completeprofile, setcompleteProfile] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const t = useTranslation(); // Hook for translations

  // State to determine if the current screen size is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const searchInputRef = useRef(null);
    
    const currentLang = useSelector((state) => state.language.currentLang) || "en";
    const currency = useSelector((state) => state.currency.currentCurrency) || "USD";
    const { searchTerm, results } = useSelector((state) => state.search);
  

  // Effect to update 'isMobile' when the window is resized
  useEffect(() => {
    async function getCurrency() {
      //get default currency
      const countryCode = await fetchUserCountry();
      const currency = await getCurrencyFromCountry(countryCode);
      setCurrCode(currency);
      dispatch(setCurrency(currency)); // Dispatch to Redux
      console.log("Detected Currency:", currency);
    }
    getCurrency();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

    useEffect(() => {
      if (showSearchInput && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [showSearchInput]);

  // Function to handle user logout
  const logOut = () => {
    localStorage.removeItem("token"); // Remove auth token
    localStorage.removeItem("user"); // Remove user info
    navigate("/login"); // Redirect to login page
  };

  // Effect to fetch and set user name from local storage on component mount
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user != null && user.firstName != null) {
        setMyName(`${user.firstName} ${user.lastName}`);
      }
    }
  }, []);

const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput) {
      dispatch(clearSearch());
      setLocalSearchTerm("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      dispatch(setSearchTerm(localSearchTerm));
      dispatch(fetchSearchResults({ 
        lang: currentLang, 
        searchTerm: localSearchTerm, 
        curr_code: currency 
      })).then((action) => {
        if (action.payload && action.payload.length > 0) {
          navigate("/searchResults");
        } else {
          navigate("/NoResults");
        }
      });
    }
  };

  const clearSearchInput = () => {
    setLocalSearchTerm("");
    dispatch(clearSearch());
    setShowSearchInput(false);
  };

  return (
    // Bootstrap Navbar with custom styling, fixed at the top
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid>
        {/* Brand logo linking to the homepage */}
        <Navbar.Brand href="/" className="brand d-flex align-items-center">
          <img src="/logo/wasla logo.png" alt="Logo" className="logo" />
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar links and icons */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation links, direction-aware alignment */}
          <Nav
            className={`nav-items ${
              document.documentElement.dir === "rtl" ? "ms-auto" : "me-auto"
            }`}
          >
            {/* Home link */}
            <NavLink to="/" className="nav-item nav-link" end>
              {t("Navbar.home")}
            </NavLink>

            <NavLink to="/pricing" className="nav-item nav-link">
              {t("Navbar.pricing")}
            </NavLink>

            {/* Contact Us link */}
            <NavLink to="/contactUs" className="nav-item nav-link">
              {t("Navbar.contact")}
            </NavLink>

            {/* About Us link */}
            <NavLink to="/AboutUs" className="nav-item nav-link">
              {t("Navbar.about")}
            </NavLink>

            {/* Additional links can be enabled later */}
            {/* 
            <Nav.Link href="/" className="nav-item">
              {t("Navbar.ourWork")}
            </Nav.Link> 
            */}
          </Nav>

          {/* Right-aligned icons and dropdowns */}
          <div className="d-flex align-items-center nav-icons">
             
            
            {/* Dropdown with user info */}
            <UserDropDown MyName={MyName} completeprofile={completeprofile} />

            {/* Search icon */}
            {showSearchInput && (
                          <Form onSubmit={handleSearchSubmit} className="search-form">
                            <InputGroup>
                              <Form.Control
                                type="text"
                                placeholder={t("Navbar.search")}
                                value={localSearchTerm}
                                onChange={(e) => setLocalSearchTerm(e.target.value)}
                                ref={searchInputRef}
                                className="search-input"
                              />
                              <InputGroup.Text 
                                className="clear-search-icon" 
                                onClick={clearSearchInput}
                              >
                                <FiX />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form>
                        )}
           <GoSearch 
              className={`icon ${showSearchInput ? "active" : ""}`} 
              onClick={handleSearchClick} 
            />

            {/* Language switcher dropdown */}
            <LanguageDropdown />

            {/* Only show extra menu dropdown if not mobile */}
            {/* {!isMobile && <MenuDropdown />} */}
            <span>{currCode}</span>
            {/* Logout icon if user is logged in */}
            {MyName ? <FiLogOut className="icon" onClick={logOut} /> : null}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
