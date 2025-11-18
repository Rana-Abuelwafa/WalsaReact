import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { MdOutlineCameraAlt, MdOutlinePayment } from "react-icons/md";
import defaultProfileImg from "../../imgs/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import PhoneInput from "react-phone-number-input";
import {
  fetchProfile,
  saveProfile,
  fetchProfileImage,
  uploadProfileImage,
  resetProfileStatus,
} from "../../slices/profileSlice";
import { CompleteMyProfile } from "../../slices/RegisterSlice";
import PopUp from "../shared/popoup/PopUp";
import LoadingPage from "../Loader/LoadingPage";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  // Internationalization hook for translations
  const t = useTranslation();
  const [errors, setErrors] = useState({});
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const userId = user?.id;

  // Refs and Redux setup
  const fileInputRef = useRef(null); // Reference for hidden file input
  const dispatch = useDispatch();

  // Get state from Redux store
  const { profileData, profileImage, loading, error, success, message } =
    useSelector((state) => state.profile);

  // Local state for UI
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupIcon, setPopupIcon] = useState(null);

  // Form data state - initialized with user data from localStorage
  const [formData, setFormData] = useState({
    profile_id: 0,
    client_id: userId || "",
    client_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    client_email: user?.email || "",
    phone_number: user?.phoneNumber || "",
    nation: "",
    gender: "",
    lang: "",
    pay_code: "",
    fb_link: "",
    twitter_link: "",
    client_birthdayStr: null,
    address: "",
  });

  // Birthday components stored separately for easier select handling
  const [birthdayComponents, setBirthdayComponents] = useState({
    year: "",
    month: "",
    day: "",
  });

  // Initialize form data when profileData is loaded from Redux
  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      // Only update if data is different to prevent infinite loops
      if (JSON.stringify(profileData) !== JSON.stringify(formData)) {
        setFormData((prev) => ({
          ...prev,
          ...profileData,
          client_name:
            profileData.client_name ||
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        }));

        // Parse birthday string if it exists and is different from current
        if (
          profileData.client_birthdayStr &&
          profileData.client_birthdayStr !==
            `${birthdayComponents.year}-${birthdayComponents.month}-${birthdayComponents.day}`
        ) {
          const parts = profileData.client_birthdayStr.split("-");
          setBirthdayComponents({
            year: parts[0] || "",
            month: parts[1] || "",
            day: parts[2] || "",
          });
        }
      }
    }
  }, [profileData]);

  // Fetch profile data and image when component mounts
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile());
      dispatch(fetchProfileImage());
    }
  }, [accessToken, dispatch]);

  // Handle success/error messages from various operations
  useEffect(() => {
    if (success !== null) {
      if (success) {
        // Show only icon for successful saves
        setPopupMessage(""); // Empty message
        setPopupType("success");
        setPopupIcon(<FaCheck className="success-icon" size={30} />);
        setShowPopup(true);
        dispatch(resetProfileStatus());
      } else if (error && message) {
        // Show full error message for failures
        setShowPopup(true);
        setPopupMessage(message);
        setPopupType("error");
        setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
      }
    }
  }, [success, error, message, dispatch]);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      setPopupMessage(t("profile.select_image_file"));
      setPopupType("error");
      setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
      setShowPopup(true);
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setPopupMessage(t("profile.image_size_limit"));
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    try {
      // Dispatch upload action and wait for completion
      await dispatch(uploadProfileImage(file)).unwrap();
      // Refresh the image from server after successful upload
      dispatch(fetchProfileImage());
    } catch (error) {
      //console.error("Image upload failed:", error);
    }
  };

  // Fallback to default image if profile image fails to load
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = defaultProfileImg;
  };

  // Trigger file input click when camera icon is clicked
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Update birthday string in formData when components change
  useEffect(() => {
    if (
      birthdayComponents.year &&
      birthdayComponents.month &&
      birthdayComponents.day
    ) {
      const newBirthdayStr = `${
        birthdayComponents.year
      }-${birthdayComponents.month.padStart(
        2,
        "0"
      )}-${birthdayComponents.day.padStart(2, "0")}`;
      setFormData((prev) => ({
        ...prev,
        client_birthdayStr: newBirthdayStr,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        client_birthdayStr: "",
      }));
    }
  }, [birthdayComponents]);

  // Handle changes to birthday select fields
  const handleBirthdayChange = (e) => {
    const { name, value } = e.target;
    setBirthdayComponents((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone_number) {
      newErrors.phone = t("profile.enter_phone");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone_number: value,
    }));
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const updatedFormData = {
      ...formData,
      // Ensure birthday components are properly formatted
      client_birthdayStr: `${
        birthdayComponents.year
      }-${birthdayComponents.month.padStart(
        2,
        "0"
      )}-${birthdayComponents.day.padStart(2, "0")}`,
    };

    dispatch(saveProfile(updatedFormData)).then((result) => {
      if (result.payload?.success) {
        const cls = { email: formData.client_email, completeprofile: 2 };
        dispatch(CompleteMyProfile(cls));
      }
    });
  };

  // Close popup and clear message
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
    setPopupIcon(null);
    if (success) {
      dispatch(resetProfileStatus());
    }
  };

  // Show loading spinner if data is being fetched and profileData isn't loaded yet
  // if (loading && !profileData) {
  //   return (
  //     <div className="profile-settings">
  //       <LoadingPage />
  //     </div>
  //   );
  // }

  return (
    <div className="profile-settings" dir={t("direction")}>
      {/* Popup for showing success/error messages */}
      {showPopup && (
        <PopUp
          msg={popupMessage}
          closeAlert={closePopup}
          type={popupType}
          icon={popupIcon}
        />
      )}

      {/* Main form container */}
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {/* Form divided into 3 columns */}
          <div className="form-grid">
            {/* Column 1 - Profile picture and basic info */}
            <div className="form-column">
              {/* Profile picture section */}
              <div className="profile-picture">
                <div className="avatar-container">
                  <img
                    src={
                      profileImage?.url || // Newly uploaded images (local blob)
                      profileImage || // Fetched images (server URL)
                      defaultProfileImg // Fallback
                    }
                    alt="Profile"
                    className="avatar-image"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if default image fails
                      e.target.src = defaultProfileImg;
                    }}
                  />
                  {/* Hidden file input for image upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {/* Camera icon to trigger file input */}
                  <div className="camera">
                    <MdOutlineCameraAlt
                      className="camera-icon"
                      onClick={handleCameraClick}
                    />
                  </div>
                </div>
              </div>

              {/* Name field (disabled as it comes from auth system) */}
              <div className="input-group">
                <Form.Label>{t("profile.name")}</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  placeholder={t("profile.enter_name")}
                  className="custom-input"
                  disabled
                />
              </div>

              {/* Email field (disabled) */}
              <div className="input-group">
                <Form.Label>{t("profile.email")}</Form.Label>
                <Form.Control
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  placeholder={t("profile.enter_email")}
                  className="custom-input"
                  disabled
                />
              </div>

              {/* Phone number field */}
              {/* <div className="input-group">
                <Form.Label>{t("profile.phone")}</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder={t("profile.enter_phone")}
                  className="custom-input"
                  required
                />
              </div> */}
              <Form.Group className="input-group">
                <Form.Label>{t("profile.phone")}</Form.Label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="EG"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handlePhoneChange}
                  placeholder={t("profile.phone")}
                  className="custom-input"
                  // className={`phone-input ${errors.phone ? "is-invalid" : ""}`}
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </Form.Group>
              {/* Nationality field */}
              <div className="input-group">
                <Form.Label>{t("profile.nation")}</Form.Label>
                <Form.Control
                  type="text"
                  name="nation"
                  value={formData.nation}
                  onChange={handleChange}
                  placeholder={t("profile.enter_nation")}
                  className="custom-input"
                  required
                />
              </div>
            </div>

            {/* Column 2 - Gender, birthday, and payment info */}
            <div className="form-column">
              {/* Gender select */}
              <div className="input-group">
                <Form.Label>{t("profile.gender")}</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="custom-input custom-toggle"
                  required
                >
                  <option value="">{t("profile.select_gender")}</option>
                  <option value="Male">{t("profile.male")}</option>
                  <option value="Female">{t("profile.female")}</option>
                </Form.Select>
              </div>

              {/* Birthday selects (month/day/year) */}
              <div className="input-group">
                <Form.Label>{t("profile.dob")}</Form.Label>
                <div className="dob-selects">
                  <Form.Select
                    name="month"
                    value={birthdayComponents.month}
                    onChange={handleBirthdayChange}
                    className="custom-input custom-toggle"
                    required
                  >
                    <option value="">{t("profile.month")}</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>
                        {new Date(0, i).toLocaleString(t("locale"), {
                          month: "short",
                        })}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name="day"
                    value={birthdayComponents.day}
                    onChange={handleBirthdayChange}
                    className="custom-input custom-toggle"
                    required
                  >
                    <option value="">{t("profile.day")}</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name="year"
                    value={birthdayComponents.year}
                    onChange={handleBirthdayChange}
                    className="custom-input custom-toggle"
                    required
                  >
                    <option value="">{t("profile.year")}</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              {/* Address field */}
              <div className="input-group">
                <Form.Label>{t("profile.address")}</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  placeholder={t("profile.enter_address")}
                  className="custom-input"
                  required
                />
              </div>

              {/* Payment methods section (placeholder) */}
              <div className="payment-section">
                <Form.Label>{t("profile.payment_methods")}</Form.Label>
                <div className="payment-methods">
                  <div className="payment-card">
                    <div className="paypalImg"></div>
                    <span>************000</span>
                    <a href="/">{t("profile.change")}</a>
                  </div>
                  <div className="payment-card">
                    <div className="visaImg"></div>
                    <span>************000</span>
                    <a href="/">{t("profile.change")}</a>
                  </div>
                </div>
                <Button className="add-payment">
                  <MdOutlinePayment className="pay-icon" />{" "}
                  {t("profile.add_payment")}
                </Button>
              </div>
            </div>

            {/* Column 3 - Language and social links */}
            <div className="form-column">
              {/* Language select */}
              <div className="input-group">
                <Form.Label>{t("profile.language")}</Form.Label>
                <Form.Select
                  name="lang"
                  value={formData.lang}
                  onChange={handleChange}
                  className="custom-input custom-toggle"
                  required
                >
                  <option value="">{t("profile.select_language")}</option>
                  <option value="English">{t("profile.english")}</option>
                  <option value="Arabic">{t("profile.arabic")}</option>
                  <option value="German">{t("profile.german")}</option>
                </Form.Select>
              </div>

              {/* Facebook link */}
              <div className="input-group">
                <Form.Label>{t("profile.Facebook")}</Form.Label>
                <Form.Control
                  type="text"
                  name="fb_link"
                  value={formData.fb_link}
                  onChange={handleChange}
                  placeholder={t("profile.Facebook")}
                  className="custom-input"
                />
              </div>

              {/* Twitter link */}
              <div className="input-group">
                <Form.Label>{t("profile.Twitter")}</Form.Label>
                <Form.Control
                  type="text"
                  name="twitter_link"
                  value={formData.twitter_link}
                  onChange={handleChange}
                  placeholder={t("profile.Twitter")}
                  className="custom-input"
                />
              </div>

              {/* Save/Update button */}
              <div className="text-right">
                <Button type="submit" className="save-btn" disabled={loading}>
                  {loading
                    ? t("general.saving")
                    : formData.profile_id
                    ? t("profile.update")
                    : t("profile.save")}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      {loading ? <LoadingPage /> : null}
    </div>
  );
};

export default ProfileSettings;
