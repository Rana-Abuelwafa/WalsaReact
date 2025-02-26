import React from "react";
import { useTranslation } from "react-multi-lang";
import { Button } from "react-bootstrap";
import GoogleLoginButton from "./googleLoginButton";
// import FacebookLoginButton from "./FacebookLoginButton";
function SignInUpShared(props) {
  const t = useTranslation();
  return (
    <div>
      {props.login ? (
        <>
          <h2> {t("Login.HeaderTitle")}</h2>
          <p>{t("Login.HeaderSubTitle")}</p>
        </>
      ) : (
        <>
          <h2>
            {" "}
            {t("Register.HeaderTitle")}
            <span>{t("Register.Client")}</span>
          </h2>
          <p>{t("Register.HeaderSubTitle")}</p>
        </>
      )}

      {/* <Button
        // type="submit"
        //disabled={this.state.progressVariant == "danger" || this.state.userErr}
        className="frmBtn transBtn FullWidthBtn"
      >
        <img src="../images/gmail_icon.png" className="gmail_icon" />
        {t("Login.LoginWithGoogle")}
      </Button> */}
      <GoogleLoginButton />
      {/* <FacebookLoginButton /> */}
      <p className="or_line_tit">
        <span className="or_line"></span>
        <span>{t("Login.Or")}</span>
        <span className="or_line"></span>
      </p>
    </div>
  );
}

export default SignInUpShared;


