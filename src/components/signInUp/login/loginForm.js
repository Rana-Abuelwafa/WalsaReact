import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../../slices/RegisterSlice";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../shared/popoup/PopUp";

//normal login form

function LoginForm(props) {
  const t = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setvalidated] = useState(false);
  const [errorsLst, seterrorsLst] = useState({});
  const [formData, setformData] = useState({ email: "", password: "" });
  const { User, loading, errors } = useSelector((state) => state.register);
  const [showAlert, setShowAlert] = useState(false);

  //validate form inputs
  const validate = () => {
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
    return true;
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const signin = (event) => {
    let { isAuthRedirect, redirectPath } = props;
    //console.log("isAuthRedirect ", isAuthRedirect);
    event.preventDefault();
    if (validate()) {
      formData["lang"] = localStorage.getItem("lang") || getLanguage();
      let data = { payload: formData, path: "/LoginUser" };
      dispatch(LoginUser(data)).then((result) => {
        if (result.payload && result.payload.isSuccessed) {
          //if user login successfully and his email is confirmed , so navigate to home, if not should verify email first
          setShowAlert(false);
          if (result.payload.emailConfirmed == true) {
            if (isAuthRedirect) {
              navigate(redirectPath);
            } else {
              navigate("/");
            }
          } else {
            navigate("/verifyEmail", { replace: true, state: { path: "/" } });
          }
        } else {
          setShowAlert(true);
        }
      });
    }
  };
  const fillFormData = (e) => {
    setvalidated(false);
    seterrorsLst({});
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form onSubmit={signin} noValidate>
      <Form.Group className="mb-3">
        <Form.Label className="formLabel">{t("Login.email")}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t("Login.email")}
          required
          name="email"
          className="formInput"
          onChange={fillFormData}
        />
        {errorsLst.email && (
          <Form.Text type="invalid" className="errorTxt">
            {errorsLst.email}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="formLabel">{t("Login.password")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t("Login.password")}
          required
          name="password"
          className="formInput"
          minLength={6}
          onChange={fillFormData}
        />
        {errorsLst.password && (
          <Form.Text type="invalid" className="errorTxt">
            {errorsLst.password}
          </Form.Text>
        )}
      </Form.Group>
      <Button type="submit" className="frmBtn purbleBtn FullWidthBtn">
        {t("Login.signIn")}
      </Button>
      {loading ? <LoadingPage /> : null}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : errors} closeAlert={closeAlert} />
      ) : null}
    </Form>
  );
}

export default LoginForm;
