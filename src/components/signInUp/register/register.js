import React from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { Link } from "react-router-dom";
import MiniNavbar from "../../navbars/miniNavbar";
import SignInUpShared from "../signInUpShared";
import RegisterForm from "./registerForm";
import "../SignInUp.scss";

function Register() {
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
            <SignInUpShared />
            <RegisterForm />

            <p className="form_option">
              {t("Register.HaveAccount")}
              <Link to="/login">{t("Login.signIn")}</Link>
            </p>
          </div>
        </Col>
        <Col lg={7} md={12} sm={12} xs={12} className="d-none d-md-block">
          <div className="sign-img_bg register_img_bg">
            <img src="images/register_bg.png" alt="wasla_login_img" />
          </div>
        </Col>
      </Row>
      {/* </Container> */}
    </div>
  );
}

export default Register;
