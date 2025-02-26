import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import "./OfferPopup.scss";
import popupImage from "../../imgs/popup-image.png"; // Update the path

const OfferPopup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const t = useTranslation(); 

  const handleClose = () => setShow(false);
  const handlecheck = () =>{
    setShow(false);
    navigate("/login");
  }

  return (
    <Modal show={show} onHide={handleClose} centered className="offer-popup">
      <Modal.Body className="text-center">
        <img src={popupImage} alt={t("OfferPopup.imageAlt")} className="floating-image" />

        <button className="close-btn" onClick={handleClose}>×</button>

        <div className="offer-content">
          <p>{t("OfferPopup.getOffer")}</p>
          <h2 className="discount">{t("OfferPopup.discount")}</h2>
          <p>{t("OfferPopup.description")}</p>
          <Button className="check-btn" onClick={handlecheck}>{t("OfferPopup.checkButton")}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OfferPopup;
