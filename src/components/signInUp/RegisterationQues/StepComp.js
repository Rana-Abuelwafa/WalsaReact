import React, { useState } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import { Form } from "react-bootstrap";
function StepComp(props) {
  const t = useTranslation();
  const [answer, setAnswer] = useState(props.ques.answer || "yes");
  const [Ques, setQues] = useState({
    id: 0,
    ques_id: props.ques != null ? props.ques.ques_id : 0,
    client_id: "",
    answer: props.ques.answer || "yes",
    lang_code: localStorage.getItem("lang") || getLanguage(),
  });
  const updateAnswer = (e) => {
    setAnswer(e.target.id);
    setQues({
      ...Ques,
      answer: e.target.id,
    });
    Ques["answer"] = e.target.id;
    props.updateLst(Ques);
  };
  //each question has default answer "yes"
  //if props edit = 1 , so this mean user answer questions before in this case can browse question only and cannot edit
  return (
    <div className="ques_content">
      <p className="ques_title">{props.ques.ques_title}</p>
      <Form className="answer_content">
        <div key={`inline-radio`}>
          <Form.Check
            inline
            label={t("Register.Yes")}
            name="group1"
            type="radio"
            id={"yes"}
            onChange={updateAnswer}
            checked={answer === "yes"}
            disabled={props.edit == 1}
          />
          <Form.Check
            inline
            label={t("Register.No")}
            name="group1"
            type="radio"
            id={"no"}
            onChange={updateAnswer}
            checked={answer === "no"}
            disabled={props.edit == 1}
          />
        </div>
      </Form>
    </div>
  );
}

export default StepComp;
