import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-multi-lang";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RegisterUser } from "../../slices/RegisterSlice";
import Loader from "../Loader/Loader";
import PopUpMsg from "../shared/PopupMsg";
import { Button } from "react-bootstrap";
import axios from "axios";
const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const { User, loading } = useSelector((state) => state.register);

  const handleLoginSuccess = async (credentialResponse) => {
    //console.log("Google Token:", credentialResponse.code);
    const DecodedToken = jwtDecode(credentialResponse.code);
    console.log("DecodedToken:", DecodedToken);
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const token = "Bearer " + tokenResponse.access_token;
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: token } }
      );
      console.log(userInfo);
      if (userInfo && userInfo.data) {
        let { family_name, given_name, email } = userInfo.data;

        let data = {
          payload: {
            FirstName: given_name,
            LastName: family_name,
            email: email,
          },
          path: "/ExternalRegister",
        };
        dispatch(RegisterUser(data)).then((result) => {
          if (result.payload && result.payload.isSuccessed) {
            let path = `/Welcome`;
            navigate(path);
          }
        });
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
        {t("Login.LoginWithGoogle")}
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
      {User != null && User.isSuccessed == false ? (
        <PopUpMsg text={User.msg} show={true} />
      ) : null}
    </>
  );
};

export default GoogleLoginButton;
