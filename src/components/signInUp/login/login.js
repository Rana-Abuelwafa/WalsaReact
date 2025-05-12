import React from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoginForm from "./loginForm";
import { Link } from "react-router-dom";
import MiniNavbar from "../../navbars/miniNavbar";
import SignInUpShared from "../signInUpShared";
import "../SignInUp.scss";

function Login() {
  const t = useTranslation();
  const currentLang = localStorage.getItem("lang") || getLanguage();
  return (
    <div
      className={currentLang == "ar" ? "SignSection right" : "SignSection left"}
    >
      <MiniNavbar />
      <Row className="justify-content-md-center">
        <Col lg={5} md={12} sm={12} xs={12}>
          <div className="login_form">
            <SignInUpShared login={true} />
            <LoginForm />
            <p className="form_option">
              {t("Login.DontHaveAccount")}
              <Link to="/register">{t("Login.CreateAccount")}</Link>
            </p>
          </div>
        </Col>
        <Col lg={7} md={12} sm={12} xs={12} className="d-none d-md-block">
          <div className="login_img_bg sign-img_bg ">
            <img src="images/login_bg_img.png" alt="wasla_login_img" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
