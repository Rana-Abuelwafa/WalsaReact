import React, { useState, useEffect } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import { Container, Button } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useSelector, useDispatch } from "react-redux";
import {
  GetQuestionsData,
  saveQuesList,
  CompleteMyProfile,
} from "../../../slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import StepComp from "./StepComp";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../shared/popoup/PopUp";
import "./RegisterQues.scss";

function RegisterQues() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const [active, setActive] = useState(1);
  const [quesLst, setQuesLst] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [myEmail, setMyEmail] = useState("");
  const [completeprofile, setcompleteProfile] = useState(0);
  const { Quesions, loading, errors } = useSelector((state) => state.register);
  useEffect(() => {
    //get user data from local storage
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        setMyEmail(user.email);
        setcompleteProfile(user.completeprofile);
      }
    }
    const payload = { lang: localStorage.getItem("lang") || getLanguage() };
    //get questions List from API depend on lang, and each ques has default answer yes
    dispatch(GetQuestionsData(payload)).then((result) => {
      const arr = result.payload;
      if (arr != null) {
        arr.forEach((ques) => {
          const obj = {
            answer: "yes",
            client_id: "",
            id: 0,
            lang_code: localStorage.getItem("lang") || getLanguage(),
            ques_id: ques.ques_id,
          };
          quesLst.push(obj);
        });
      }
    });
    return () => {
      setQuesLst([]);
    };
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };
  //send Ques List with answers to API
  const saveLst = () => {
    dispatch(saveQuesList(quesLst)).then((result) => {
      if (result.payload && result.payload.success) {
        setQuesLst([]);
        const cls = { email: myEmail };
        dispatch(CompleteMyProfile(cls));
        navigate("/Response", {
          replace: true,
          state: { msg: result.payload.WelcomeMsg },
        });
        //navigate("/Response");
      } else {
        setShowAlert(true);
      }
    });
  };
  //update Ques List with user's answers
  const updateLst = (newQues) => {
    if (quesLst != null && quesLst.length > 0) {
      const myNextList = [...quesLst];
      const ques = myNextList.find((a) => a.ques_id === newQues.ques_id);
      if (ques != null) {
        ques["answer"] = newQues.answer;
      }
      setQuesLst(myNextList);
    }
  };
  return (
    <Container>
      <div className="ques_container">
        {Quesions != null && Quesions.length > 0 ? (
          <div className="mutliStep_contain">
            <MultiStepForm activeStep={active}>
              {Quesions.map((ques, index) => {
                return (
                  <Step key={index}>
                    <StepComp
                      ques={ques}
                      updateLst={updateLst}
                      edit={completeprofile}
                    />
                  </Step>
                );
              })}
            </MultiStepForm>

            {/* if user first time  answer question, so show previous & next button and can sen data, if no so can browse question only then go to home*/}
            <div className="steps_btns">
              {active !== 1 && (
                <Button
                  onClick={() => setActive(active - 1)}
                  className="stepbtn roundedBtn SmallWidthBtn transBtn"
                >
                  {t("Register.Previous")}
                </Button>
              )}
              {active !== Quesions.length && (
                <Button
                  className="stepbtn roundedBtn SmallWidthBtn transBtn"
                  onClick={() => setActive(active + 1)}
                >
                  {t("Register.Next")}
                </Button>
              )}
              {active == Quesions.length &&
                (completeprofile == 0 ? (
                  <Button
                    className="stepbtn roundedBtn SmallWidthBtn transBtn"
                    onClick={saveLst}
                  >
                    {t("Register.Submit")}
                  </Button>
                ) : (
                  <Button
                    className="stepbtn roundedBtn SmallWidthBtn transBtn"
                    onClick={() => navigate("/")}
                  >
                    {t("Register.BackHome")}
                  </Button>
                ))}
            </div>
          </div>
        ) : null}
      </div>
      {loading ? <LoadingPage /> : null}
      {showAlert ? <PopUp msg={errors} closeAlert={closeAlert} /> : null}
    </Container>
  );
}

export default RegisterQues;
