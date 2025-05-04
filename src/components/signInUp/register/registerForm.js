import React, { useState } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser } from "../../../slices/RegisterSlice";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../shared/popoup/PopUp";
import RecaptchaForm from "../RecaptchaForm";
function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setvalidated] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [errorsLst, seterrorsLst] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setformData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  const { User, loading, errors } = useSelector((state) => state.register);
  const validate = () => {
    if (formData.FirstName == null || formData.FirstName.trim() == "") {
      seterrorsLst({
        ...errorsLst,
        firstname: t("Register.fillField"),
      });
      return false;
    }

    if (formData.LastName == null || formData.LastName.trim() == "") {
      seterrorsLst({
        ...errorsLst,
        lastname: t("Register.fillField"),
      });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email) || formData.email.trim() == "") {
      seterrorsLst({
        ...errorsLst,
        email: t("Login.EmailError"),
      });
      return false;
    }

    if (formData.password.trim() == "" || formData.password.length < 6) {
      seterrorsLst({
        ...errorsLst,
        password: t("Login.PasswordError"),
      });
      return false;
    }
    if (formData.ConfirmPassword !== formData.password) {
      seterrorsLst({
        ...errorsLst,
        ConfirmPassword: t("Register.ConfirmPasswordError"),
      });
      return false;
    }
    return true;
  };
  const signin = (event) => {
    event.preventDefault();
    // validation
    if (validate()) {
      formData["lang"] = localStorage.getItem("lang") || getLanguage();
      let data = { payload: formData, path: "/RegisterUser" };
      dispatch(RegisterUser(data)).then((result) => {
        if (result.payload && result.payload.isSuccessed) {
          // const payload = { lang: "en", token: result.payload.accessToken };
          // dispatch(GetQuestionsData(payload));
          // let path = `/Welcome`;
          //let path = `/verifyEmail`;
          setShowAlert(false);
          navigate("/verifyEmail", {
            replace: true,
            state: { path: "/welcome" },
          });
          // navigate(path);
        } else {
          setShowAlert(true);
        }
      });
    }
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const fillFormData = (e) => {
    setvalidated(false);
    seterrorsLst({});
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const t = useTranslation();

  return (
    <Form onSubmit={signin} noValidate>
      <Row className="mb-3">
        <Col lg={6} md={12} sm={12} xs={12}>
          <Form.Group>
            <Form.Label>{t("Register.firstname")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("Register.firstname")}
              className="formInput"
              required
              name="FirstName"
              onChange={fillFormData}
            />
            {errorsLst.firstname && (
              <Form.Text type="invalid" className="errorTxt">
                {errorsLst.firstname}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col lg={6} md={12} sm={12} xs={12}>
          <Form.Group>
            <Form.Label>{t("Register.lastname")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("Register.lastname")}
              className="formInput"
              required
              name="LastName"
              onChange={fillFormData}
            />
            {errorsLst.lastname && (
              <Form.Text type="invalid" className="errorTxt">
                {errorsLst.lastname}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      {/* <Form.Group>
        <Form.Label>{t("Register.username")}</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder={t("Register.username")}
          onChange={fillFormData}
          pattern="^[a-zA-Z0-9]+$"
          className="formInput"
          required
          isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(formData.username)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid username (alphanumeric characters only).
        </Form.Control.Feedback>
      </Form.Group> */}
      <Form.Group className="mb-3">
        <Form.Label className="formLabel">{t("Login.email")}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t("Login.email")}
          required
          name="email"
          className="formInput"
          onChange={fillFormData}
          // isInvalid={validated && !/^\S+@\S+\.\S+$/.test(formData.email)}
        />
        {errorsLst.email && (
          <Form.Text type="invalid" className="errorTxt">
            {errorsLst.email}
          </Form.Text>
        )}
        {/* <Form.Control.Feedback type="invalid">
          {t("Login.EmailError")}
        </Form.Control.Feedback> */}
      </Form.Group>
      <Row className="mb-3">
        <Col lg={6} md={12} sm={12} xs={12}>
          <Form.Group>
            <Form.Label>{t("Login.password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("Login.password")}
              required
              name="password"
              className="formInput"
              minLength={6}
              //onChange={handlePasswordChange}
              onChange={fillFormData}
              // isInvalid={formData.password.length < 6}
            />
            {errorsLst.password && (
              <Form.Text type="invalid" className="errorTxt">
                {errorsLst.password}
              </Form.Text>
            )}
            {/* <Form.Control.Feedback type="invalid">
            {t("Login.PasswordError")}
          </Form.Control.Feedback> */}
          </Form.Group>
        </Col>
        <Col lg={6} md={12} sm={12} xs={12}>
          <Form.Group>
            <Form.Label>{t("Register.confirmPassword")}</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder={t("Register.confirmPassword")}
              name="ConfirmPassword"
              className="formInput"
              minLength={6}
              //onChange={handleConfirmPasswordChange}
              onChange={fillFormData}
              // isInvalid={
              //   validated && formData.password !== formData.ConfirmPassword
              // }
            />
            {errorsLst.ConfirmPassword && (
              <Form.Text className="errorTxt">
                {errorsLst.ConfirmPassword}
              </Form.Text>
            )}
            {/* {isMatch == false ? (
            <Form.Text className="errorTxt">
              {t("Register.ConfirmPasswordError")}
            </Form.Text>
          ) : null} */}
            {/* <Form.Control.Feedback type="invalid">
            {t("Register.ConfirmPasswordError")}
          </Form.Control.Feedback> */}
          </Form.Group>
        </Col>
      </Row>
      {/* <Form.Group className="mb-3">
        <Form.Label className="formLabel">{t("Login.password")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t("Login.password")}
          required
          name="password"
          className="formInput"
          minLength={6}
          onChange={fillFormData}
          isInvalid={validated && formData.password.length < 6}
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 6 characters long.
        </Form.Control.Feedback>
      </Form.Group> */}
      <RecaptchaForm />
      <Button type="submit" className="frmBtn purbleBtn FullWidthBtn">
        {t("Register.CreateAccount")}
      </Button>
      {loading ? <LoadingPage /> : null}
      {/* {User != null && User.isSuccessed == false ? ( */}
      {/* {showAlert ? (
        <PopUpMsg
          text={User.msg}
          show={showAlert}
          closeAlert={() => setShowAlert(false)}
        />
      ) : null} */}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : errors} closeAlert={closeAlert} />
      ) : null}
    </Form>
  );
}

export default RegisterForm;
