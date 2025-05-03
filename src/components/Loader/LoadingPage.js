import React from 'react';
import './LoadingPage.scss'; 

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <img 
          src="/loading.gif" 
          alt="Loading..."
          className="loading-gif"
        />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;