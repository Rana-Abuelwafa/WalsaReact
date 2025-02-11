import React, { useState } from "react";
import { Row, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
function RegisterForm() {
  const [validated, setvalidated] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const signin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
      <Form.Group>
        <Form.Label>{t("Register.username")}</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={fillFormData}
          pattern="^[a-zA-Z0-9]+$"
          className="formInput"
          required
          isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(formData.username)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid username (alphanumeric characters only).
        </Form.Control.Feedback>
      </Form.Group>
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
        {t("Register.CreateAccount")}
      </Button>
    </Form>
  );
}

export default RegisterForm;
