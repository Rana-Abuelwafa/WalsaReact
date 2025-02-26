import React, { useState } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser, GetQuestionsData } from "../../../slices/RegisterSlice";
import Loader from "../../Loader/Loader";
import PopUpMsg from "../../shared/PopupMsg";
function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setvalidated] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { User, loading } = useSelector((state) => state.register);
  const signin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(RegisterUser(formData)).then((result) => {
        if (result.payload && result.payload.isSuccessed) {
          // const payload = { lang: "en", token: result.payload.accessToken };
          // dispatch(GetQuestionsData(payload));
          let path = `/Welcome`;
          navigate(path);
        }
      });
    }
    setvalidated(true);
  };
  const fillFormData = (e) => {
    setvalidated(false);
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const t = useTranslation();

  return (
    <Form validated={validated} onSubmit={signin} noValidate>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>{t("Register.firstname")}</Form.Label>
          <Form.Control type="text" placeholder={t("Register.firstname")} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{t("Register.lastname")}</Form.Label>
          <Form.Control type="text" placeholder={t("Register.lastname")} />
        </Form.Group>
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
          isInvalid={validated && !/^\S+@\S+\.\S+$/.test(formData.email)}
        />
        <Form.Control.Feedback type="invalid">
          {t("Login.EmailError")}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>{t("Login.password")}</Form.Label>
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
            {t("Login.PasswordError")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{t("Register.confirmPassword")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("Register.confirmPassword")}
            name="ConfirmPassword"
            className="formInput"
            minLength={6}
            onChange={fillFormData}
            isInvalid={
              validated && formData.password !== formData.ConfirmPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            {t("Register.ConfirmPasswordError")}
          </Form.Control.Feedback>
        </Form.Group>
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

      <Button
        type="submit"
        //disabled={this.state.progressVariant == "danger" || this.state.userErr}
        className="frmBtn purbleBtn FullWidthBtn"
      >
        {t("Register.CreateAccount")}
      </Button>
      {loading ? <Loader /> : null}
      {User != null && User.isSuccessed == false ? (
        <PopUpMsg text={User.msg} show={true} />
      ) : null}
    </Form>
  );
}

export default RegisterForm;
