import React, { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import { checkIsLogin } from "../../../helper/helperFN";
import LoginStatusPopUp from "./LoginStatusPopUp";
function UserCheck(props) {
  const t = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [MyEmail, setMyEmail] = useState("");
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        setMyEmail(`${user.email}`);
      }
    }
    if (checkIsLogin()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    return () => {};
  }, []);

  const msg = t("Login.AlreadyLogin") + MyEmail;
  return (
    <>
      {" "}
      {isLogin ? <LoginStatusPopUp msg={msg} /> : null}
      {props.children}
    </>
  );
}

export default UserCheck;
