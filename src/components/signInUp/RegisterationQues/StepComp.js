import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { Form } from "react-bootstrap";
function StepComp(props) {
  const t = useTranslation();
  const [answer, setAnswer] = useState("yes");
  return (
    <div className="ques_content">
      <p className="ques_title">{props.title}</p>
      <Form className="answer_content">
        <div key={`inline-radio`}>
          <Form.Check
            inline
            label={t("Register.Yes")}
            name="group1"
            type="radio"
            id={"yes"}
            onChange={(e) => setAnswer(e.target.id)}
            checked={answer === "yes"}
          />
          <Form.Check
            inline
            label={t("Register.No")}
            name="group1"
            type="radio"
            id={"no"}
            onChange={(e) => setAnswer(e.target.id)}
            checked={answer === "no"}
          />
        </div>
      </Form>
    </div>
  );
}

export default StepComp;
