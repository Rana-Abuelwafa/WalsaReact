import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { MdOutlineCameraAlt, MdOutlinePayment } from "react-icons/md";
import defaultProfileImg from "../../imgs/profileImg.png";
import axios from "axios";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    profile_id: 0,
    client_id: user?.id || "",
    client_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    client_email: user?.email || "",
    phone_number: user?.phoneNumber || "",
    nation: "",
    gender: "",
    lang: "",
    pay_code: "",
    fb_link: "",
    twitter_link: "",
    birth_month: "",
    birth_day: "",
    birth_year: "",
  });
  const [profileImage, setProfileImage] = useState(defaultProfileImg);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  // Fetch profile image using POST
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        setLoadingImage(true);
        const response = await axios.post(
          "https://waslaa.de:4431/api/WaslaClient/GetProfileImage",
          {}, // Empty body or add required parameters if needed
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.img) {
          setProfileImage(response.data.img);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      } finally {
        setLoadingImage(false);
      }
    };

    if (accessToken) {
      fetchProfileImage();
    }
  }, [accessToken]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    try {
      console.log(file);
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/saveProfileImage",
        { img: file },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update image preview immediately
      setProfileImage(URL.createObjectURL(file));

      // Optionally refetch the image from server to confirm
      // await fetchProfileImage();

      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setProfileImage(defaultProfileImg);
      alert("Error uploading profile image. Please try again.");
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "https://waslaa.de:4431/api/WaslaClient/GetClientProfiles",
          {}, // Empty request body
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Handle response - assuming it returns an array of profiles
        if (response.data && Array.isArray(response.data)) {
          const userProfile = response.data.find(
            (profile) => profile.client_id === user.id
          );

          if (userProfile) {
            setFormData((prev) => ({
              ...prev,
              ...userProfile,
              client_name:
                userProfile.client_name ||
                `${user.firstName} ${user.lastName}`.trim(),
            }));
            setProfileExists(true);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && accessToken) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [user?.id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/saveMainProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile saved successfully:", response.data);
      alert("Profile saved successfully!");
      setProfileExists(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  if (loading) {
    return <div className="profile-settings">Loading profile data...</div>;
  }

  return (
    <div className="profile-settings">
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Column 1 */}
            <div className="form-column">
              <div className="profile-picture">
                {loadingImage ? (
                  <div className="avatar-loading">Loading...</div>
                ) : (
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${profileImage})` }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <MdOutlineCameraAlt
                      className="camera-icon"
                      onClick={handleCameraClick}
                    />
                  </div>
                )}
              </div>

              <div className="input-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="custom-input"
                  disabled
                />
              </div>

              <div className="input-group">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter your Phone number"
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <Form.Label>Nation</Form.Label>
                <Form.Control
                  type="text"
                  name="nation"
                  value={formData.nation}
                  onChange={handleChange}
                  placeholder="Enter your Nation"
                  className="custom-input"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="form-column">
              <div className="input-group">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="custom-input"
                >
                  <option>Enter your Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </div>

              <div className="input-group">
                <Form.Label>Date of birth</Form.Label>
                <div className="dob-selects">
                  <Form.Select
                    name="birth_month"
                    value={formData.birth_month}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option>Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name="birth_day"
                    value={formData.birth_day}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option>Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    name="birth_year"
                    value={formData.birth_year}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option>Year</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="payment-section">
                <Form.Label>Payments Method</Form.Label>
                <div className="payment-methods">
                  <div className="payment-card">
                    <div className="paypalImg"></div>
                    <span>************000</span>
                    <a href="#">Change</a>
                  </div>
                  <div className="payment-card">
                    <div className="visaImg"></div>
                    <span>************000</span>
                    <a href="#">Change</a>
                  </div>
                </div>
                <Button className="add-payment">
                  <MdOutlinePayment className="pay-icon" /> Add payments method
                </Button>
              </div>
            </div>

            {/* Column 3 */}
            <div className="form-column">
              <div className="input-group">
                <Form.Label>Language</Form.Label>
                <Form.Select
                  name="lang"
                  value={formData.lang}
                  onChange={handleChange}
                  className="custom-input"
                >
                  <option>Enter your Language</option>
                  <option>English</option>
                  <option>Arabic</option>
                  <option>German</option>
                </Form.Select>
              </div>

              <div className="input-group">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="text"
                  name="fb_link"
                  value={formData.fb_link}
                  onChange={handleChange}
                  placeholder="Facebook"
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="text"
                  name="twitter_link"
                  value={formData.twitter_link}
                  onChange={handleChange}
                  placeholder="Twitter"
                  className="custom-input"
                />
              </div>

              <div className="text-right">
                <Button type="submit" className="save-btn">
                  {profileExists ? "Update" : "Save"}
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
