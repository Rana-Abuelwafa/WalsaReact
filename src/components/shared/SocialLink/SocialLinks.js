import React, { useState } from "react";
import ContactModal from "../SendMailModal/SendMailModal";
import "./SocialLinks.scss";
import {
  FaEnvelope,
  FaComments,
  FaQuestionCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
function SocialLinks() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ContactModal show={showModal} handleClose={() => setShowModal(false)} />
      <div className="social-icons">
        <div>
          <Link
            to="https://www.facebook.com/Waslaa.de"
            className="icon"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
        </div>
        <div>
          <Link
            to="https://www.instagram.com/waslaa.de"
            className="icon"
            target="_blank"
          >
            <FaInstagram />
          </Link>
        </div>
        <div>
          <Link to="https://x.com/waslaade" className="icon" target="_blank">
            <FaTwitter />
          </Link>
        </div>
        <div>
          <Button onClick={() => setShowModal(true)} className="icon">
            <FaEnvelope />
          </Button>
        </div>
      </div>
    </>
  );
}

export default SocialLinks;
