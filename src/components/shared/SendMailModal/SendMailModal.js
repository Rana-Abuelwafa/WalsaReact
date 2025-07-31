import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMail,
  resetContactState,
} from "../../../slices/contactSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-multi-lang";

function SendMailModal({ show, handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const { loading, error, success } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      handleClose();
      setTimeout(() => navigate("/login"), 2000);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (success) {
      // Reset form and close modal after successful submission
      setFormData({ subject: "", message: "" });
      const timer = setTimeout(() => {
        handleClose();
        dispatch(resetContactState());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, handleClose, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMail(formData));
    // handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="contact-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("sendMail.sendMsg")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{t("sendMail.successMsg")}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSubject" className="mb-3">
            <Form.Label>{t("sendMail.subject")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("sendMail.enterSubject")}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>{t("sendMail.message")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder={t("sendMail.enterMsg")}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {t("sendMail.send")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SendMailModal;
