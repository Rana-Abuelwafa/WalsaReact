import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const GoogleLoginButton = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google Token:", credentialResponse.credential);
    const DecodedToken = jwtDecode(credentialResponse.credential);
    console.log("DecodedToken:", DecodedToken);
  };

  return (
    <GoogleOAuthProvider clientId="119221420950-q7ppb5tb25d8124v30q76np4ofm7k26l.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Google Login Failed")}
        className="frmBtn transBtn FullWidthBtn"
        logo_alignment="center"
        shape="rectangular"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
