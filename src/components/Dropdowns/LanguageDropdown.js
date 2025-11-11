import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { setLanguages } from "../../slices/languageSlice";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage, getLanguage } from "react-multi-lang";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const t = useTranslation(); // Translation function (not directly used here but available for future use)

  // Get the saved language from localStorage or fallback to the default language
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("lang") || getLanguage()
  );

  // Loading state to prevent multiple changes or UI flickering
  const [isLoading, setIsLoading] = useState(false);

  // This effect runs when the selected language changes
  useEffect(() => {
    const applyLanguageSettings = async (lang) => {
      setIsLoading(true); // Begin loading

      try {
        // Set the lang and dir attributes on the <html> tag
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

        // Add or remove body class based on direction
        document.body.classList.toggle("rtl", lang === "ar");
        document.body.classList.toggle("ltr", lang !== "ar");

        // If Arabic is selected, load custom Arabic font
        if (lang === "ar") {
          await loadArabicFont();
        }

        // Dispatch a custom event so other components can listen to the change
        window.dispatchEvent(
          new CustomEvent("languageChanged", { detail: lang })
        );
      } catch (error) {
        // console.error("Language change error:", error);
      } finally {
        setIsLoading(false); // Done loading
      }
    };

    applyLanguageSettings(currentLang); // Apply settings on load or language change
  }, [currentLang]);

  // Function to dynamically load Arabic font if not already available
  const loadArabicFont = () => {
    return new Promise((resolve) => {
      // Check if the font is already available
      if (document.fonts.check("1em 'Noto Sans Arabic'")) {
        resolve();
      } else {
        // Otherwise, load it from Google Fonts
        const font = new FontFace(
          "Noto Sans Arabic",
          "url(https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4ZrFXIEQ.woff2)"
        );
        font.load().then(() => {
          document.fonts.add(font); // Add to available fonts
          resolve();
        });
      }
    });
  };

  // Function to handle language change from dropdown
  const changeLang = (lang) => {
    if (lang !== currentLang && !isLoading) {
      setCurrentLang(lang); // Update state
      setLanguage(lang); // Update library's language
      localStorage.setItem("lang", lang); // Persist in localStorage
      dispatch(setLanguages(lang)); // Dispatch to Redux
    }
  };

  // Available language options for the dropdown
  const languages = [
    { code: "en", name: t("Navbar.ENGLISH"), nativeName: t("Navbar.ENGLISH") },
    { code: "de", name: t("Navbar.GERMAN"), nativeName: t("Navbar.GERMAN") },
    { code: "ar", name: t("Navbar.Arabic"), nativeName: t("Navbar.Arabic") },
  ];

  return (
    <Dropdown className="language-dropdown d-inline">
      {/* Dropdown toggle button (disabled if loading) */}
      <Dropdown.Toggle id="dropdown-basic" disabled={isLoading}>
        <div className="language-toggle-content">
          <CiGlobe className="globe-icon" />
        </div>
      </Dropdown.Toggle>

      {/* Dropdown menu aligned based on current text direction */}
      <Dropdown.Menu
        align={document.documentElement.dir === "rtl" ? "start" : "end"}
      >
        {/* Render a dropdown item for each language */}
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            href="#"
            className={`lang-item ${currentLang === lang.code ? "active" : ""}`}
            onClick={() => changeLang(lang.code)}
            disabled={currentLang === lang.code || isLoading}
          >
            <strong>{lang.name}</strong>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
