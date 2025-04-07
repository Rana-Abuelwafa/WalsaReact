import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log("Facebook Response:", response);

    if (response.accessToken) {
      // Handle successful login
      console.log("User ID:", response.userID);
      console.log("Access Token:", response.accessToken);
    } else {
      // Handle login failure
      console.log("Facebook login failed");
    }
  };

  return (
    <FacebookLogin
      appId="619792974274963"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;
