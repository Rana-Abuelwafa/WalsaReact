import React from "react";
import { Formik } from "formik";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import LoginForm from "./loginForm";
import { Link } from "react-router-dom";
import SignInUpShared from "../signInUpShared";
import "../SignInUp.scss";
function Login() {
  const t = useTranslation();
  return (
    <div className="SignSection">
      {/* <Container> */}
      <Row className="justify-content-md-center">
        <Col md={5} sm={6} xs={12}>
          <div className="login_form">
            <SignInUpShared login={true} />
            <LoginForm />
            <p className="form_option">
              {t("Login.DontHaveAccount")}
              <Link to="/register">{t("Login.CreateAccount")}</Link>
            </p>
          </div>
        </Col>
        <Col md={7} sm={6} className="d-none d-sm-block">
          <div className="login_img_bg sign-img_bg">
            <img src="images/login_bg_img.png" alt="wasla_login_img" />
          </div>
        </Col>
      </Row>
      {/* </Container> */}
    </div>
  );
}

export default Login;
