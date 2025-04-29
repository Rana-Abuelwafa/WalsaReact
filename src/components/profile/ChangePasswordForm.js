import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearMessages } from "../../slices/authSlice";
import PopUp from "../shared/popoup/PopUp";
import { useTranslation } from "react-multi-lang";
import "./ChangePasswordForm.scss";

const ChangePasswordForm = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);
  const userId = user?.id;
  const accessToken = user?.accessToken;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (success) {
      setPopupMessage(t("changePassword.successMessage"));
      setShowPopup(true);
    } else if (error) {
      setPopupMessage(error);
      setShowPopup(true);
    }
  }, [success, error, t]);

  const validateForm = () => {
    const errors = {};
    
    if (!oldPassword) {
      errors.oldPassword = t("changePassword.errors.oldPasswordRequired");
    }
    
    if (!newPassword) {
      errors.newPassword = t("changePassword.errors.newPasswordRequired");
    } else if (newPassword.length < 8) {
      errors.newPassword = t("changePassword.errors.passwordLength");
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = t("changePassword.errors.confirmPasswordRequired");
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = t("changePassword.errors.passwordsDontMatch");
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    dispatch(clearMessages());

    if (!validateForm()) {
      return;
    }

    if (!userId) {
      setPopupMessage(t("changePassword.errors.userIdNotFound"));
      setShowPopup(true);
      return;
    }

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

  const handlePopupClose = () => {
    setShowPopup(false);
    if (success) {
      localStorage.removeItem("user");
      dispatch(clearMessages());
      navigate("/login");
    }
  };

  // RTL support for Arabic
  const isRTL = localStorage.getItem("lang") === "ar";
  const formClass = isRTL ? "change-password-form rtl" : "change-password-form";

  return (
    <div className={`change-password-container ${isRTL ? "rtl" : ""}`}>
      <Form className={formClass} onSubmit={handleSubmit} dir={isRTL ? "rtl" : "ltr"}>
        {/* Old Password */}
        <Form.Group controlId="oldPassword" className="input-group">
          <Form.Label>{t("changePassword.oldPasswordLabel")}</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? "text" : "password"}
              placeholder={t("changePassword.oldPasswordPlaceholder")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="custom-input"
              isInvalid={!!formErrors.oldPassword}
            />
            <InputGroup.Text 
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="eye-button"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {formErrors.oldPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* New Password */}
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

        {/* Confirm New Password */}
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

        <div className="button-wrapper">
          <Button 
            type="submit" 
            className="change-password-btn"
            disabled={loading}
          >
            {loading ? t("changePassword.changingButton") : t("changePassword.submitButton")}
          </Button>
        </div>
      </Form>

      {/* Popup for success/error messages */}
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