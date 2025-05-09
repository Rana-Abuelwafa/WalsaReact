import React, { useState } from "react";
import { Row, Button, Form } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../../slices/RegisterSlice";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../shared/popoup/PopUp";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setvalidated] = useState(false);
  const [errorsLst, seterrorsLst] = useState({});
  const [formData, setformData] = useState({ email: "", password: "" });
  const { User, loading, errors } = useSelector((state) => state.register);
  const [showAlert, setShowAlert] = useState(false);
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
    event.preventDefault();
    if (validate()) {
      //let path = `/`;
      formData["lang"] = localStorage.getItem("lang") || getLanguage();
      let data = { payload: formData, path: "/LoginUser" };
      dispatch(LoginUser(data)).then((result) => {
        //console.log("result.payload.isSuccessed ", result.payload.isSuccessed);
        if (result.payload && result.payload.isSuccessed) {
          setShowAlert(false);
          if (result.payload.emailConfirmed == true) {
            navigate("/");
          } else {
            navigate("/verifyEmail", { replace: true, state: { path: "/" } });
          }
        } else {
          setShowAlert(true);
        }
      });
    }
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   let path = `/`;
    //   dispatch(LoginUser(formData)).then((result) => {
    //     if (result.payload && result.payload.isSuccessed) {
    //       navigate(path);
    //     }
    //   });
    // }
    // setvalidated(true);
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
  //console.log("showAlert ", showAlert);
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
          //isInvalid={validated && !/^\S+@\S+\.\S+$/.test(formData.email)}
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
          //isInvalid={validated && formData.password.length < 6}
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
      <Button type="submit" className="frmBtn purbleBtn FullWidthBtn">
        {t("Login.signIn")}
      </Button>
      {loading ? <LoadingPage /> : null}
      {/* {User != null && User.isSuccessed == false ? ( */}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : errors} closeAlert={closeAlert} />
      ) : null}
      {/* ) : */}
      {/* // <PopUpMsg text={User.msg} show={showAlert} closeAlert={closeAlert} /> */}
      {/* null} */}
    </Form>
  );
}

export default LoginForm;
