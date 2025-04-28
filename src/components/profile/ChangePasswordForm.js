import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./ChangePasswordForm.scss";

const ChangePasswordForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const accessToken = user?.accessToken;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password must match!");
      return;
    }

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://waslaa.de:4430/api/Authentication/changePassword",
        {
          userId,
          oldPassword,
          newPassword,
          confirmNewPassword: confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data) {
        setSuccess("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.msg || "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <Form className="change-password-form" onSubmit={handleSubmit}>
        {/* Old Password */}
        <Form.Group controlId="oldPassword" className="input-group">
          <Form.Label>Old password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? "text" : "password"}
              placeholder="Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="custom-input"
            />
            <InputGroup.Text 
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="eye-button"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* New Password */}
        <Form.Group controlId="newPassword" className="input-group">
          <Form.Label>New password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="custom-input"
            />
            <InputGroup.Text 
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="eye-button"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* Confirm New Password */}
        <Form.Group controlId="confirmNewPassword" className="input-group">
          <Form.Label>Confirm new password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="custom-input"
              isInvalid={!!error}
            />
            <InputGroup.Text 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="eye-button"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {success && (
          <div className="text-success mb-3" style={{ fontSize: "14px" }}>
            {success}
          </div>
        )}

        <div className="button-wrapper">
          <Button 
            type="submit" 
            className="change-password-btn"
            disabled={isLoading}
          >
            {isLoading ? "Changing..." : "Change password"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;