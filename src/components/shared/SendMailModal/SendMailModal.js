import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
function SendMailModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    mail: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} centered className="contact-modal">
      <Modal.Header closeButton>
        <Modal.Title>Send Us a Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMessage" className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-4 w-100">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SendMailModal;
