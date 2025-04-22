import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import Alert from "react-popup-alert";
// import "react-popup-alert/dist/index.css";
const PopUpMsg = ({ text, show, closeAlert }) => {
  const t = useTranslation();
  //const [show, setshow] = useState(props.show);
  // const onCloseAlert = () => {
  //   closeAlert;
  // };
  console.log("props.shows ", show);
  return (
    // <ReactJsAlert
    //   status={show}
    //   type="error"
    //   title={text}
    //   color="#ff4d4f"
    //   isQuotes={true}
    //   quote="Ok."
    //   Close={closeAlert}
    // />
    <Alert
      header={t("PopUp.Header")}
      btnText={t("PopUp.Close")}
      text={text}
      type={"error"}
      show={show}
      onClosePress={closeAlert}
      pressCloseOnOutsideClick={true}
      showBorderBottom={true}
      alertStyles={{}}
      headerStyles={{}}
      textStyles={{}}
      buttonStyles={{ backgroundColor: "#00bc82" }}
    />
  );
};

export default PopUpMsg;
