import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-multi-lang";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser, LoginUser } from "../../slices/RegisterSlice";
import Loader from "../Loader/Loader";
import { Button } from "react-bootstrap";
import PopUp from "../shared/popoup/PopUp";
import axios from "axios";
const GoogleLoginButton = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const { User, loading } = useSelector((state) => state.register);

  const handleLoginSuccess = async (credentialResponse) => {
    //console.log("Google Token:", credentialResponse.code);
    const DecodedToken = jwtDecode(credentialResponse.code);
    // console.log("DecodedToken:", DecodedToken);
    let { family_name, given_name, email } = DecodedToken;

    let data = {
      payload: { FirstName: given_name, LastName: family_name, email: email },
      path: "/ExternalRegister",
    };
    dispatch(RegisterUser(data)).then((result) => {
      if (result.payload && result.payload.isSuccessed) {
        let path = `/Welcome`;
        navigate(path);
      }
    });
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const token = "Bearer " + tokenResponse.access_token;
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: token } }
      );
      //console.log(userInfo);
      if (userInfo && userInfo.data) {
        let { family_name, given_name, email } = userInfo.data;
        if (props.login) {
          // console.log("this is login");
          let formData = {
            email: email,
            FirstName: given_name,
            LastName: family_name != null ? family_name : given_name,
          };
          // let path = `/`;
          let data = { payload: formData, path: "/LoginGmail" };
          dispatch(LoginUser(data)).then((result) => {
            if (result.payload && result.payload.isSuccessed) {
              setShowAlert(false);
              if (result.payload.emailConfirmed == true) {
                navigate("/");
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
          //console.log("this is register");
          let data = {
            payload: {
              FirstName: given_name,
              LastName: family_name != null ? family_name : given_name,
              email: email,
              password: tokenResponse.access_token,
            },
            path: "/ExternalRegister",
          };
          dispatch(RegisterUser(data)).then((result) => {
            if (result.payload && result.payload.isSuccessed) {
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
      {/* <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Google Login Failed")}
          className="frmBtn transBtn FullWidthBtn"
          logo_alignment="center"
          shape="rectangular"
        /> */}
      {/* </GoogleOAuthProvider> */}
      {loading ? <Loader /> : null}
      {showAlert ? (
        <PopUp msg={User != null ? User.msg : ""} closeAlert={closeAlert} />
      ) : null}
      {/* {User != null && User.isSuccessed == false ? (
        <PopUpMsg text={User.msg} show={true} />
      ) : null} */}
    </>
  );
};

export default GoogleLoginButton;
