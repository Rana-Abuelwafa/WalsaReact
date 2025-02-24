import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import Alert from "react-popup-alert";
import "react-popup-alert/dist/index.css";
function PopUpMsg(props) {
  const t = useTranslation();
  const [show, setshow] = useState(props.show);
  const onCloseAlert = () => {
    setshow(!show);
  };
  console.log("show ", show);
  return (
    <Alert
      header={t("PopUp.Header")}
      btnText={t("PopUp.Close")}
      text={props.text}
      type={"error"}
      show={show}
      onClosePress={onCloseAlert}
      pressCloseOnOutsideClick={true}
      showBorderBottom={true}
      alertStyles={{}}
      headerStyles={{}}
      textStyles={{}}
      buttonStyles={{ backgroundColor: "#00bc82" }}
    />
  );
}

export default PopUpMsg;
