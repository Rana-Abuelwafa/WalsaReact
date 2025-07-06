import { Button } from "react-bootstrap";
import React from "react";
// import Popup from 'react-animated-popup'
import "./popup.scss";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
function PopUp(props) {
  const navigate = useNavigate();
  const closePOPUP = () => {
    props.closeAlert();
    if (props.path != null) {
      navigate(props.path);
    }
  };
  const t = useTranslation();
  return (
    <div className="popupBack">
      <div className="popup" onClose={closePOPUP}>
        <div className="popup-header">{props.icon}</div>
        <p>{props.msg}</p>
        <Button className="close" onClick={closePOPUP}>
          {t("PopUp.Close")}
        </Button>
      </div>
    </div>
  );
}

export default PopUp;
