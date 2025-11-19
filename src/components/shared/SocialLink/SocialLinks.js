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
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
function SocialLinks() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <ContactModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      ) : null}
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
            <FaXTwitter />
          </Link>
        </div>
        <div>
          {/* <Button onClick={() => setShowModal(true)} className="icon">
            <FaEnvelope />
          </Button> */}
          <Link to="https://www.linkedin.com/" className="icon" target="_blank">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
    </>
  );
}

export default SocialLinks;
