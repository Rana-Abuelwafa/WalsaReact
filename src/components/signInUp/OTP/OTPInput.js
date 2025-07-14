import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-multi-lang";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ConfirmOTP } from "../../../slices/RegisterSlice";
import PopUp from "../../shared/popoup/PopUp";
import LoadingPage from "../../Loader/LoadingPage";
import "./otp.scss";
function OTPInput(props) {
  const t = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [otp, setOtp] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const { User, loading, errors } = useSelector((state) => state.register);

  const sendOtpCode = () => {
    const data = { Email: myEmail, otp: otp };
    let path = state?.path || "/";
    dispatch(ConfirmOTP(data)).then((result) => {
      if (result.payload && result.payload.isSuccessed) {
        setShowAlert(false);
        navigate(path);
      } else {
        setShowAlert(true);
      }
    });
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    //get user data from local storage
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        setMyEmail(user.email);
      }
    }
    return () => {};
  }, []);
  console.log("User ", User);
  return (
    <section className="VerifySection">
      <div className="verify_content centerContainer">
        <div>
          <p>
            {t("Login.CodeVerifyTitle")}{" "}
            <strong className="marked">{myEmail}</strong>{" "}
            {t("Login.CodeVerifyTitle2")}
          </p>
        </div>
        <div>
          <OtpInput
            inputStyle="inputStyle"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Button
          className="purbleBtn SmallWidthBtn roundedBtn"
          onClick={sendOtpCode}
          disabled={otp.length < 6}
        >
          {t("Login.SendCode")}
        </Button>
      </div>
      {loading ? <LoadingPage /> : null}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : errors} closeAlert={closeAlert} />
      ) : null}
    </section>
  );
}

export default OTPInput;
