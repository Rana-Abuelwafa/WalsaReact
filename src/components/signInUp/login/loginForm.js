import React, { useState } from "react";
import { Row, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../../slices/RegisterSlice";
import Loader from "../../Loader/Loader";
import PopUpMsg from "../../shared/PopupMsg";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setvalidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({ email: "", password: "" });
  const { User, loading } = useSelector((state) => state.register);
  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email) || formData.email.trim() == "") {
      setErrors({
        ...errors,
        email: t("Login.EmailError"),
      });
      return false;
    }
    if (formData.password.trim() == "" || formData.password.length < 6) {
      setErrors({
        ...errors,
        password: t("Login.PasswordError"),
      });
      return false;
    }
    return true;
  };
  const signin = (event) => {
    event.preventDefault();
    if (validate()) {
      let path = `/`;
      let data = { payload: formData, path: "/LoginUser" };
      dispatch(LoginUser(data)).then((result) => {
        if (result.payload && result.payload.isSuccessed) {
          navigate(path);
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
    setErrors({});
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const t = useTranslation();

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
        {errors.email && (
          <Form.Text type="invalid" className="errorTxt">
            {errors.email}
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
        {errors.password && (
          <Form.Text type="invalid" className="errorTxt">
            {errors.password}
          </Form.Text>
        )}
        {/* <Form.Control.Feedback type="invalid">
          {t("Login.PasswordError")}
        </Form.Control.Feedback> */}
      </Form.Group>

      <Button type="submit" className="frmBtn purbleBtn FullWidthBtn">
        {t("Login.signIn")}
      </Button>
      {loading ? <Loader /> : null}
      {User != null && User.isSuccessed == false ? (
        <PopUpMsg text={User.msg} show={true} />
      ) : null}
    </Form>
  );
}

export default LoginForm;
