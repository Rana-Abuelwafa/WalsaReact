import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PopupMsg from '../components/shared/PopupMsg';

let popupRoot = null;
let currentCallback = null;

export const showAuthPopup = (message, callback) => {
  if (!popupRoot) {
    popupRoot = document.createElement('div');
    popupRoot.id = 'auth-popup-root';
    document.body.appendChild(popupRoot);
  }

  currentCallback = callback;

  const PopupWrapper = () => {
    const [show, setShow] = useState(true);

    const handleConfirm = () => {
      setShow(false);
      if (currentCallback) {
        currentCallback();
        currentCallback = null;
      }
      ReactDOM.unmountComponentAtNode(popupRoot);
    };

    return (
      <PopupMsg
        text={message}
        show={show}
        closeAlert={handleConfirm}
        onConfirm={handleConfirm}
      />
    );
  };

  ReactDOM.render(<PopupWrapper />, popupRoot);
};