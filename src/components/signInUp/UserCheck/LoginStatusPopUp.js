import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-multi-lang";
import "./statuspopup.scss";

function LoginStatusPopUp(props) {
  const t = useTranslation();
  const navigate = useNavigate(); // Hook to navigate programmatically
  // Function to handle user logout
  const logOut = () => {
    localStorage.removeItem("token"); // Remove auth token
    localStorage.removeItem("user"); // Remove user info
    window.location.reload();
  };
  return (
    <div className="popupBack">
      <div className="login_popup">
        <p>{props.msg}</p>
        <div className="inlineDiv">
          <Button className="popUpBtn purbleBtn" onClick={logOut}>
            {t("Login.LogOut")}
          </Button>
          <Button className="popUpBtn transBtn" onClick={() => navigate("/")}>
            {t("Register.BackHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginStatusPopUp;
