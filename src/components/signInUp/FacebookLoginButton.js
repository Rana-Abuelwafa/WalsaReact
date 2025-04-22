import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log("Facebook Response:", response);

    // if (response.accessToken) {
    //   // Handle successful login
    //   console.log("User ID:", response.userID);
    //   console.log("Access Token:", response.accessToken);
    // } else {
    //   // Handle login failure
    //   console.log("Facebook login failed");
    // }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APPID}
      // fields="name,email,picture"
      fields="email"
      callback={responseFacebook}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>
          This is my custom FB button
        </button>
      )}
      // icon="fa-facebook"
      // textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;
