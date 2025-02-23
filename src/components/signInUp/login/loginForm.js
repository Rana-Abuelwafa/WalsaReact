import React, { useState } from "react";
import { Row, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  const [validated, setvalidated] = useState(false);
  const [formData, setformData] = useState({ email: "", password: "" });
  const signin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      let path = `/`;
      navigate(path);
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
          Please enter a valid email address.
        </Form.Control.Feedback>
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
          isInvalid={validated && formData.password.length < 6}
        />
        <Form.Control.Feedback type="invalid">
          Password must be at least 6 characters long.
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        //disabled={this.state.progressVariant == "danger" || this.state.userErr}
        className="frmBtn purbleBtn FullWidthBtn"
      >
        {t("Login.signIn")}
      </Button>
    </Form>
  );
}

export default LoginForm;
