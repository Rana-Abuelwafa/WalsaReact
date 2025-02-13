import React, { useState, useEffect } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { useSelector, useDispatch } from "react-redux";
import { GetQuestionsData } from "../../../slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import StepComp from "./StepComp";
import "./RegisterQues.scss";
function RegisterQues() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const { Quesions } = useSelector((state) => state.questions);
  console.log("Quesions: ", Quesions);
  useEffect(() => {
    dispatch(GetQuestionsData());
    return () => {};
  }, []);
  return (
    <Container>
      <div className="ques_container">
        <div className="mutliStep_contain">
          <MultiStepForm activeStep={active}>
            {(Quesions != null) & (Quesions.length > 0)
              ? Quesions.map((ques, index) => {
                  return (
                    <Step key={index}>
                      <StepComp title={ques.title} />
                    </Step>
                  );
                })
              : null}
          </MultiStepForm>

          {/* {active !== 1 && (
            <Button onClick={() => setActive(active - 1)}>
              {t("Register.Previous")}
            </Button>
          )} */}
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
              onClick={() => navigate("/Response")}
              //style={{ float: "right" }}
            >
              {t("Register.Submit")}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default RegisterQues;
