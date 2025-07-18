import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../shared/popoup/PopUp";
import { useTranslation } from "react-multi-lang";
function Validuser(props) {
  const navigate = useNavigate();
  const t = useTranslation();
  const [Auth, setAuth] = useState(true);
  const [msg, setMsg] = useState(true);

  const [mailConfirmed, setMailConfirmed] = useState(true);
  const [answerQues, setIsAnswerQues] = useState(true);
  const [error, setIsError] = useState(false);
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        console.log("user ", user);
        //check if user confirm its mail or not (otp checked)
        if (user.emailConfirmed != null && user.emailConfirmed == false) {
          setMailConfirmed(false);
          setMsg(t("general.MailConfirmedErr"));
          setIsError(true);
          //   navigate("/verifyEmail", {
          //     replace: true,
          //     state: { path: "/" },
          //   });
        }
        //check if user answer to questions or not
        else if (user.completeprofile != null && user.completeprofile == 0) {
          setIsAnswerQues(false);

          setMsg(t("general.CompleteProfileErr"));
          setIsError(true);
          // navigate("/RegisterQues");
        } else {
          setMailConfirmed(true);
          setMsg("");
          setIsError(false);
          setIsAnswerQues(true);
        }
      }
    }
    return () => {};
  }, []);

  return (
    <>
      {" "}
      {error ? (
        <PopUp
          msg={msg}
          path={
            answerQues == false
              ? "/RegisterQues"
              : mailConfirmed == false
              ? "/login"
              : "/login"
          }
          closeAlert={() => setIsError(false)}
        />
      ) : (
        props.children
      )}
    </>
  );
}

export default Validuser;
