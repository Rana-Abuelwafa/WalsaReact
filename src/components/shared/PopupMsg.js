import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import Alert from "react-popup-alert";

const PopupMsg = ({ text, show, closeAlert, onConfirm }) => {
  const t = useTranslation();

  useEffect(() => {
    // This ensures the popup stays visible until manually closed
    if (show) {
      const timer = setTimeout(() => {
        // Optional: Auto-close after long time if needed
      }, 30000); // 30 seconds timeout as fallback
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    closeAlert?.();
    onConfirm?.(); // Call the confirmation callback
  };

  return (
    <Alert
      header={t("PopUp.Header")}
      btnText={t("PopUp.Close")}
      text={text}
      type={"error"}
      show={show}
      onClosePress={handleClose}
      pressCloseOnOutsideClick={false} // Prevent accidental closes
      showBorderBottom={true}
      alertStyles={{ zIndex: 9999 }} // Ensure it appears above everything
      headerStyles={{}}
      textStyles={{}}
      buttonStyles={{ backgroundColor: "#00bc82" }}
    />
  );
};

export default PopupMsg;