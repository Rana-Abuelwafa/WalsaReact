import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import ContactModal from "../shared/SendMailModal/SendMailModal";

const General = () => {
    const t = useTranslation();
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {showModal ? (
                <ContactModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
            ) : null}
            <div className="helpCenter-content-container">
                <p className="helpCenter-tab-content-text">{t("helpCenter.help_items.general_description")}</p>
                <div className="helpCenter-btns-container">
                 
                        <a
                        as="button"
                            href="https://wa.me/201011111111"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="helpCenter-btn"
                        >
                            {t("contact.chatBtn")}
                        </a>
                        {/* <Button className="btn"></Button> */}
                
                  
                        <Button onClick={() => setShowModal(true)} className="helpCenter-btn">
                            {t("contact.emailBtn")}
                        </Button>
            
                </div>
            </div>
        </>
    );
}

export default General; 