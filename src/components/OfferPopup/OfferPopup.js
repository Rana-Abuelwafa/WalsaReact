import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./OfferPopup.scss";
import popupImage from "../../imgs/popup-image.png"; // Update the path

const OfferPopup = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered className="offer-popup">
      <Modal.Body className="text-center">
        <img src={popupImage} alt="Offer" className="floating-image" />

        <button className="close-btn" onClick={handleClose}>×</button>

        <div className="offer-content">
          <p>Get our opening offers</p>
          <h2 className="discount">50%</h2>
          <p>on all our services for <br/>the first 60 days</p>
          <Button className="check-btn" onClick={handleClose}>Check it out</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OfferPopup;
