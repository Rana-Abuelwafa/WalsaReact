import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password visibility toggle
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearMessages } from "../../slices/authSlice";
import PopUp from "../shared/popoup/PopUp";
import LoadingPage from '../Loader/LoadingPage';
import { useTranslation } from "react-multi-lang";
import "./ChangePasswordForm.scss";

const ChangePasswordForm = () => {
  // Internationalization hook for translations
  const t = useTranslation();
  
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux store
  const { user, loading, error, success } = useSelector((state) => state.auth);
  const userId = user?.id;
  const accessToken = user?.accessToken;

  // Form state management
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form validation and feedback
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Effect to handle success/error messages
  useEffect(() => {
    if (success) {
      setPopupMessage(t("changePassword.successMessage"));
      setShowPopup(true);
    } else if (error) {
      setPopupMessage(error);
      setShowPopup(true);
    }
  }, [success, error, t]);

  // Form validation function
  const validateForm = () => {
    const errors = {};
    
    // Validate old password
    if (!oldPassword) {
      errors.oldPassword = t("changePassword.errors.oldPasswordRequired");
    }
    
    // Validate new password
    if (!newPassword) {
      errors.newPassword = t("changePassword.errors.newPasswordRequired");
    } else if (newPassword.length < 8) {
      errors.newPassword = t("changePassword.errors.passwordLength");
    }
    
    // Validate password confirmation
    if (!confirmPassword) {
      errors.confirmPassword = t("changePassword.errors.confirmPasswordRequired");
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = t("changePassword.errors.passwordsDontMatch");
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    dispatch(clearMessages());

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    // Check if user ID exists
    if (!userId) {
      setPopupMessage(t("changePassword.errors.userIdNotFound"));
      setShowPopup(true);
      return;
    }

    // Dispatch password change action
    dispatch(
      changePassword({
        userId,
        oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
        accessToken
      })
    );
  };

  // Popup close handler with success behavior
  const handlePopupClose = () => {
    setShowPopup(false);
    if (success) {
      // On successful password change, logout and redirect to login
      localStorage.removeItem("user");
      dispatch(clearMessages());
      navigate("/login");
    }
  };

  // RTL (Right-to-Left) support for languages like Arabic
  const isRTL = localStorage.getItem("lang") === "ar";
  const formClass = isRTL ? "change-password-form rtl" : "change-password-form";

  return (
    <div className={`change-password-container ${isRTL ? "rtl" : ""}`}>
      {/* Main Form */}
      <Form 
        className={formClass} 
        onSubmit={handleSubmit} 
        dir={isRTL ? "rtl" : "ltr"} // Set text direction
      >
        {/* Old Password Field */}
        <Form.Group controlId="oldPassword" className="input-group">
          <Form.Label>{t("changePassword.oldPasswordLabel")}</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? "text" : "password"} // Toggle visibility
              placeholder={t("changePassword.oldPasswordPlaceholder")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="custom-input"
              isInvalid={!!formErrors.oldPassword} // Show error state
            />
            {/* Password visibility toggle button */}
            <InputGroup.Text 
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="eye-button"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />} 
            </InputGroup.Text>
            {/* Error message display */}
            <Form.Control.Feedback type="invalid">
              {formErrors.oldPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* New Password Field */}
        <Form.Group controlId="newPassword" className="input-group">
          <Form.Label>{t("changePassword.newPasswordLabel")}</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder={t("changePassword.newPasswordPlaceholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="custom-input"
              isInvalid={!!formErrors.newPassword}
            />
            <InputGroup.Text 
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="eye-button"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {formErrors.newPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Confirm New Password Field */}
        <Form.Group controlId="confirmNewPassword" className="input-group">
          <Form.Label>{t("changePassword.confirmPasswordLabel")}</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("changePassword.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="custom-input"
              isInvalid={!!formErrors.confirmPassword}
            />
            <InputGroup.Text 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="eye-button"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Submit Button */}
        <div className="button-wrapper">
          <Button 
            type="submit" 
            className="change-password-btn"
            disabled={loading} // Disable during API call
          >
            {/* Show loading state or normal text */}
            {loading ? t("changePassword.changingButton") : t("changePassword.submitButton")}
          </Button>
        </div>
      </Form>

      {/* Success/Error Popup */}
      {showPopup && (
        <PopUp
          msg={popupMessage}
          closeAlert={handlePopupClose}
        />
      )}
    </div>
  );
};

export default ChangePasswordForm;