import { Button } from "react-bootstrap";
import React, { Component } from "react";
// import Popup from 'react-animated-popup'
import "./popup.scss";
import { useTranslation } from "react-multi-lang";

import React from "react";

function PopUp(props) {
  const closePOPUP = () => {};
  const t = useTranslation();
  return (
    <div className="popup" onClose={closePOPUP}>
      <p>{props.msg}</p>
      <Button className="close" onClick={closePOPUP}>
        {t("Pofile.Close")}
      </Button>
    </div>
  );
}

export default PopUp;
