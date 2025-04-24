import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage,getLanguage } from "react-multi-lang";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  const t = useTranslation();
  const [currentLang, setCurrentLang] = useState(localStorage.getItem("lang") || getLanguage());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const applyLanguageSettings = async (lang) => {
      setIsLoading(true);
      
      try {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.body.classList.toggle("rtl", lang === "ar");
        document.body.classList.toggle("ltr", lang !== "ar");
        
        if (lang === "ar") {
          await loadArabicFont();
        }
        
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
      } catch (error) {
        console.error("Language change error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    applyLanguageSettings(currentLang);
  }, [currentLang]);

  const loadArabicFont = () => {
    return new Promise((resolve) => {
      if (document.fonts.check("1em 'Noto Sans Arabic'")) {
        resolve();
      } else {
        const font = new FontFace('Noto Sans Arabic', 'url(https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4ZrFXIEQ.woff2)');
        font.load().then(() => {
          document.fonts.add(font);
          resolve();
        });
      }
    });
  };

  const changeLang = (lang) => {
    if (lang !== currentLang && !isLoading) {
      setCurrentLang(lang);
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  };

  const languages = [
    { code: "en", name: "ENGLISH", nativeName: "English" },
    { code: "ar", name: "العربية", nativeName: "العربية" }
  ];

  return (
    <Dropdown className="language-dropdown">
      <Dropdown.Toggle id="dropdown-basic" disabled={isLoading}>
        <div className="language-toggle-content">
          <CiGlobe className="globe-icon" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu align={document.documentElement.dir === "rtl" ? "start" : "end"}>
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