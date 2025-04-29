import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

function RecaptchaForm() {
  const onChange = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <ReCAPTCHA
      sitekey={process.env.REACT_APP_GOOGLE_SITEKEY}
      onChange={onChange}
      type="image"
    />
  );
}

export default RecaptchaForm;
