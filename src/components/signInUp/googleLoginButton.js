import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google Token:", credentialResponse.credential);
  };

  return (
    <GoogleOAuthProvider clientId="119221420950-q7ppb5tb25d8124v30q76np4ofm7k26l.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Google Login Failed")}
        className="frmBtn transBtn FullWidthBtn"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
