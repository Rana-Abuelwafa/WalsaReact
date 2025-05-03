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
import { useNavigate, useLocation } from "react-router-dom";
import StepComp from "./StepComp";
import "./RegisterQues.scss";
import LoadingPage from "../../Loader/LoadingPage";
import PopUp from "../../shared/popoup/PopUp";

function RegisterQues() {
  // const { state } = useLocation();
  const navigate = useNavigate();
  const t = useTranslation();
  const [active, setActive] = useState(1);
  const [quesLst, setQuesLst] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const [myEmail, setMyEmail] = useState("");
  const [completeprofile, setcompleteProfile] = useState(0);
  const { Quesions, loading, isSuccessed, errors } = useSelector(
    (state) => state.register
  );
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    // console.log("userLocal ", userLocal);
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        setMyEmail(user.email);
        setcompleteProfile(user.completeprofile);
      }
    }
    const payload = { lang: localStorage.getItem("lang") || getLanguage() };
    dispatch(GetQuestionsData(payload)).then((result) => {
      //fillQuesList(result);
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
  const saveLst = () => {
    dispatch(saveQuesList(quesLst)).then((result) => {
      if (result.payload && result.payload.success) {
        setQuesLst([]);
        const cls = { email: myEmail };
        dispatch(CompleteMyProfile(cls));
        navigate("/Response");
      } else {
        setShowAlert(true);
      }
    });
  };
  const fillQuesList = () => {
    if (Quesions != null && Quesions.length > 0) {
      Quesions.forEach((ques) => {
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

    // console.log("quesssss ", quesLst);
    // setQuesLst([...quesLst, ques]);
  };
  const updateLst = (newQues) => {
    if (quesLst != null && quesLst.length > 0) {
      const myNextList = [...quesLst];
      const ques = myNextList.find((a) => a.ques_id === newQues.ques_id);
      if (ques != null) {
        ques["answer"] = newQues.answer;
      }
      setQuesLst(myNextList);
    } else {
      // let newarr = [];
      // newarr.push(newQues);
      // console.log("first ", newarr);
      // setQuesLst([...quesLst, newQues]);
      // setQuesLst(newarr);
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
                      //fillQuesList={fillQuesList}
                    />
                  </Step>
                );
              })}
            </MultiStepForm>

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
                  //style={{ float: "right" }}
                >
                  {t("Register.Next")}
                </Button>
              )}
              {active == Quesions.length &&
                (completeprofile == 0 ? (
                  <Button
                    className="stepbtn roundedBtn SmallWidthBtn transBtn"
                    onClick={saveLst}
                    // onClick={() => navigate("/Response")}
                    //style={{ float: "right" }}
                  >
                    {t("Register.Submit")}
                  </Button>
                ) : (
                  <Button
                    className="stepbtn roundedBtn SmallWidthBtn transBtn"
                    onClick={() => navigate("/")}
                    //style={{ float: "right" }}
                  >
                    {t("Register.BackHome")}
                  </Button>
                ))}
            </div>
          </div>
        ) : null}
      </div>
      {loading ? <LoadingPage /> : null}
      {showAlert ? (
        // <PopUpMsg text={errors} show={true} />
        <PopUp msg={errors} closeAlert={closeAlert} />
      ) : null}
    </Container>
  );
}

export default RegisterQues;
