import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { MdOutlineCameraAlt, MdOutlinePayment } from "react-icons/md";
import defaultProfileImg from "../../imgs/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-multi-lang";
import {
  fetchProfile,
  saveProfile,
  fetchProfileImage,
  uploadProfileImage,
  resetProfileStatus,
  clearFetchErrors,
} from "../../slices/profileSlice";
import PopUp from "../shared/popoup/PopUp";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const t = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const userId = user?.id;
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    profileData,
    profileImage,
    loading,
    saveSuccess,
    saveError,
    fetchError,
    uploadImageSuccess,
    uploadImageError,
    fetchImageError,
  } = useSelector((state) => state.profile);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
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
    client_birthdayStr: "",
  });
  const [birthdayComponents, setBirthdayComponents] = useState({
    year: "",
    month: "",
    day: "",
  });

  // Initialize form data from Redux store
  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      if (JSON.stringify(profileData) !== JSON.stringify(formData)) {
        setFormData((prev) => ({
          ...prev,
          ...profileData,
          client_name:
            profileData.client_name ||
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        }));

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

  // Fetch profile data on mount
  useEffect(() => {
    if (accessToken && userId) {
      dispatch(fetchProfile({ accessToken, userId }));
      dispatch(fetchProfileImage(accessToken));
    }
  }, [accessToken, userId, dispatch]);

  // Handle success/error messages
  // Update the success effect to handle the updated profile_id
  useEffect(() => {
    if (saveSuccess) {
      setPopupMessage(t("profile.saved_success"));
      setShowPopup(true);
      // if (profileData?.profile_id) {
      //   setFormData(prev => ({
      //     ...prev,
      //     profile_id: profileData.profile_id
      //   }));
      // }
      dispatch(resetProfileStatus());
    } else if (uploadImageSuccess) {
      setPopupMessage(t("profile.image_upload_success"));
      setShowPopup(true);
      dispatch(resetProfileStatus());
    }
    // Show error messages for any failed operation
    else if (saveError || uploadImageError) {
      setPopupMessage(saveError || uploadImageError);
      setShowPopup(true);
      dispatch(resetProfileStatus());
    }
    // Fetch errors might be handled differently (e.g., inline messages)
  }, [
    saveSuccess,
    saveError,
    uploadImageSuccess,
    uploadImageError,
    dispatch,
    t,
  ]);

  useEffect(() => {
    if (fetchError || fetchImageError) {
      console.error("Fetch error:", fetchError || fetchImageError);
      dispatch(clearFetchErrors());
    }
  }, [fetchError, fetchImageError, dispatch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setPopupMessage(t("profile.select_image_file"));
      setShowPopup(true);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPopupMessage(t("profile.image_size_limit"));
      setShowPopup(true);
      return;
    }

    try {
      await dispatch(
        uploadProfileImage({ accessToken, imageFile: file })
      ).unwrap();
      // Optionally refresh the image from server after upload
      dispatch(fetchProfileImage(accessToken));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProfileImg;
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

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

  const handleBirthdayChange = (e) => {
    const { name, value } = e.target;
    setBirthdayComponents((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProfile({
        accessToken,
        formData: {
          ...formData,
          client_birthdayStr: `${
            birthdayComponents.year
          }-${birthdayComponents.month.padStart(
            2,
            "0"
          )}-${birthdayComponents.day.padStart(2, "0")}`,
        },
      })
    );
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  if (loading && !profileData) {
    return <div className="profile-settings">{t("general.loading")}</div>;
  }
  return (
    <div className="profile-settings" dir={t("direction")}>
      {showPopup && <PopUp msg={popupMessage} closeAlert={closePopup} />}

      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Column 1 */}
            <div className="form-column">
              <div className="profile-picture">
                <div className="avatar-container">
                  <img
                    src={
                      profileImage?.url || // For newly uploaded images (local blob URL)
                      profileImage || // For fetched images (server URL)
                      defaultProfileImg // Fallback
                    }
                    alt="Profile"
                    className="avatar-image"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if default image fails
                      e.target.src = defaultProfileImg;
                    }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <div className="camera">
                    <MdOutlineCameraAlt
                      className="camera-icon"
                      onClick={handleCameraClick}
                    />
                  </div>
                </div>
              </div>

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

              <div className="input-group">
                <Form.Label>{t("profile.phone")}</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder={t("profile.enter_phone")}
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <Form.Label>{t("profile.nation")}</Form.Label>
                <Form.Control
                  type="text"
                  name="nation"
                  value={formData.nation}
                  onChange={handleChange}
                  placeholder={t("profile.enter_nation")}
                  className="custom-input"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="form-column">
              <div className="input-group">
                <Form.Label>{t("profile.gender")}</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="custom-input custom-toggle"
                >
                  <option value="">{t("profile.select_gender")}</option>
                  <option value="Male">{t("profile.male")}</option>
                  <option value="Female">{t("profile.female")}</option>
                </Form.Select>
              </div>

              <div className="input-group">
                <Form.Label>{t("profile.dob")}</Form.Label>
                <div className="dob-selects">
                  <Form.Select
                    name="month"
                    value={birthdayComponents.month}
                    onChange={handleBirthdayChange}
                    className="custom-input custom-toggle"
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

            {/* Column 3 */}
            <div className="form-column">
              <div className="input-group">
                <Form.Label>{t("profile.language")}</Form.Label>
                <Form.Select
                  name="lang"
                  value={formData.lang}
                  onChange={handleChange}
                  className="custom-input custom-toggle"
                >
                  <option value="">{t("profile.select_language")}</option>
                  <option value="English">{t("profile.english")}</option>
                  <option value="Arabic">{t("profile.arabic")}</option>
                  <option value="German">{t("profile.german")}</option>
                </Form.Select>
              </div>

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
    </div>
  );
};

export default ProfileSettings;
