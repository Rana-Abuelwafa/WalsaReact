import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import "./OfferPopup.scss";
import popupImage from "../../imgs/popup-image.png";

const OfferPopup = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to control modal visibility
  const [show, setShow] = useState(false);

  // Translation hook for multilingual support
  const t = useTranslation();

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to handle "Check Offer" button click
  const handlecheck = () => {
    setShow(false); // Close modal
    navigate("/login"); // Navigate to login page
  };

  // Effect to check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setShow(true); // Show popup only if no user is logged in
    }
  }, []); // Empty dependency array means this runs only once on mount

  return (
    // Bootstrap Modal component with custom styling
    <Modal
      show={show} // Controlled by 'show' state
      onHide={handleClose} // Close handler
      centered // Centers modal vertically
      className="offer-popup" // Custom class for styling
    >
      <Modal.Body className="text-center">
        {/* Close button (X) in top corner */}
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        {/* Call-to-action button */}
        <Button className="check-btn" onClick={handlecheck}>
          {t("OfferPopup.checkButton")}
        </Button>
      </Modal.Body>
    </Modal>
    // <Modal
    //   show={show} // Controlled by 'show' state
    //   onHide={handleClose} // Close handler
    //   centered // Centers modal vertically
    //   className="offer-popup" // Custom class for styling
    // >
    //   <Modal.Body className="text-center">
    //     {/* Popup image with floating animation */}
    //     <img
    //       src={popupImage}
    //       alt={t("OfferPopup.imageAlt")} // Translated alt text
    //       className="floating-image"
    //     />

    //     {/* Close button (X) in top corner */}
    //     <button className="close-btn" onClick={handleClose}>
    //       ×
    //     </button>

    //     {/* Main content container */}
    //     <div className="offer-content">
    //       {/* First line of offer text */}
    //       <p>{t("OfferPopup.getOffer")}</p>

    //       {/* Discount percentage - emphasized */}
    //       <h2 className="discount">{t("OfferPopup.discount")}</h2>

    //       {/* Description text */}
    //       <p>{t("OfferPopup.description")}</p>

    //       {/* Call-to-action button */}
    //       <Button
    //         className="check-btn"
    //         onClick={handlecheck}
    //       >
    //         {t("OfferPopup.checkButton")}
    //       </Button>
    //     </div>
    //   </Modal.Body>
    // </Modal>
  );
};

export default OfferPopup;
