import React, { useState, useEffect } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { useSelector, useDispatch } from "react-redux";
import { GetQuestionsData, saveQuesList } from "../../../slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import StepComp from "./StepComp";
import "./RegisterQues.scss";
import Loader from "../../Loader/Loader";
import PopUpMsg from "../../shared/PopupMsg";
function RegisterQues() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [active, setActive] = useState(1);
  const [quesLst, setQuesLst] = useState([]);
  const dispatch = useDispatch();
  const { Quesions, loading, isSuccessed, errors } = useSelector(
    (state) => state.register
  );
  useEffect(() => {
    const payload = { lang: "en" };
    dispatch(GetQuestionsData(payload));

    return () => {};
  }, []);
  const saveLst = () => {
    dispatch(saveQuesList(quesLst)).then((result) => {
      if (result.payload && result.payload.success) {
        navigate("/Response");
      }
    });
  };

  const fillQuesList = (ques) => {
    quesLst.push(ques);
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
                      fillQuesList={fillQuesList}
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
              {active == Quesions.length && (
                <Button
                  className="stepbtn roundedBtn SmallWidthBtn transBtn"
                  onClick={saveLst}
                  // onClick={() => navigate("/Response")}
                  //style={{ float: "right" }}
                >
                  {t("Register.Submit")}
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </div>
      {loading ? <Loader /> : null}
      {isSuccessed != null && isSuccessed == false ? (
        <PopUpMsg text={errors} show={true} />
      ) : null}
    </Container>
  );
}

export default RegisterQues;
