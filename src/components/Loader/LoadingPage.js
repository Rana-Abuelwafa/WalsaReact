import React from 'react';
import { useTranslation } from "react-multi-lang";
import './LoadingPage.scss'; 

const LoadingPage = () => {
    const t = useTranslation(); // Hook for multilingual translations
  return (
     // Main wrapper div with a class for styling the entire loading page
    <div className="loading-page">
      {/* Container for the loading content (GIF + text) */}
      <div className="loading-content">
        {/* Loading GIF to indicate loading progress */}
        <img 
          src="/loading.gif" 
          alt="Loading..."
          className="loading-gif"
        />
        {/* Optional text shown under the loading animation */}
        <p className="loading-text">{t("general.loading")}</p>
      </div>
    </div>
  );
};

export default LoadingPage;