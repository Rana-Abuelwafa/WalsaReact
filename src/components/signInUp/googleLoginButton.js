import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser, LoginUser } from "../../slices/RegisterSlice";
import LoadingPage from "../Loader/LoadingPage";
import { Button } from "react-bootstrap";
import PopUp from "../shared/popoup/PopUp";
import axios from "axios";

const GoogleLoginButton = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const { User, loading } = useSelector((state) => state.register);

  const closeAlert = () => {
    setShowAlert(false);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = "Bearer " + tokenResponse.access_token;
      //get user details with google token
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: token } }
      );
      if (userInfo && userInfo.data) {
        let { family_name, given_name, email } = userInfo.data;
        //check if this login or register (different in api path and payload)
        if (props.login) {
          let formData = {
            email: email,
            FirstName: given_name,
            LastName: family_name != null ? family_name : given_name,
            lang: localStorage.getItem("lang") || getLanguage(),
          };
          let data = { payload: formData, path: "/LoginGmail" };
          dispatch(LoginUser(data)).then((result) => {
            let { isAuthRedirect, redirectPath } = props;
            if (result.payload && result.payload.isSuccessed) {
              setShowAlert(false);
              //if user login successfully and his email is confirmed navigate to home and whole app , if no sholud verify mail first by OTP
              if (result.payload.emailConfirmed == true) {
                if (isAuthRedirect) {
                  navigate(redirectPath);
                } else {
                  navigate("/");
                }
              } else {
                navigate("/verifyEmail", {
                  replace: true,
                  state: { path: "/" },
                });
              }
            } else {
              setShowAlert(true);
            }
          });
        } else {
          //this register not login
          let data = {
            payload: {
              FirstName: given_name,
              LastName: family_name != null ? family_name : given_name,
              email: email,
              password: tokenResponse.access_token,
              lang: localStorage.getItem("lang") || getLanguage(),
            },
            path: "/ExternalRegister",
          };
          dispatch(RegisterUser(data)).then((result) => {
            if (result.payload && result.payload.isSuccessed) {
              //if user register successfully navigate to verify mail first by OTP
              setShowAlert(false);
              navigate("/verifyEmail", {
                replace: true,
                state: { path: "/welcome" },
              });
            } else {
              setShowAlert(true);
            }
          });
        }
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <>
      {/* <GoogleOAuthProvider clientId="119221420950-q7ppb5tb25d8124v30q76np4ofm7k26l.apps.googleusercontent.com"> */}
      <Button
        className="frmBtn transBtn FullWidthBtn"
        onClick={() => googleLogin()}
      >
        <img src="../images/gmail_icon.png" className="gmail_icon" />
        {props.login
          ? t("Login.LoginWithGoogle")
          : t("Login.RegisterWithGoogle")}
      </Button>
      {loading ? <LoadingPage /> : null}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : ""} closeAlert={closeAlert} />
      ) : null}
    </>
  );
};

export default GoogleLoginButton;
