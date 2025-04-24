import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import { Form } from "react-bootstrap";
function StepComp(props) {
  const t = useTranslation();
  const [answer, setAnswer] = useState("yes");
  const [Ques, setQues] = useState({
    id: 0,
    ques_id: props.ques != null ? props.ques.ques_id : 0,
    client_id: "",
    answer: "yes",
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
  // useEffect(() => {
  //    Ques["answer"] = answer;
  //   Ques["ques_id"] = props.ques != null ? props.ques.ques_id : 0;
  //   Ques["lang_code"] = localStorage.getItem("lang") || "en";
  //   //props.updateLst(Ques);
  //   return () => {};
  // }, []);
  // useEffect(() => {
  //   Ques["answer"] = answer;
  //   Ques["ques_id"] = props.ques != null ? props.ques.ques_id : 0;
  //   Ques["lang_code"] = localStorage.getItem("lang") || "en";
  //   props.fillQuesList(Ques);
  //   return () => {};
  // }, []);
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
            // onChange={(e) => setAnswer(e.target.id)}
            checked={answer === "yes"}
          />
          <Form.Check
            inline
            label={t("Register.No")}
            name="group1"
            type="radio"
            id={"no"}
            onChange={updateAnswer}
            //onChange={(e) => setAnswer(e.target.id)}
            checked={answer === "no"}
          />
        </div>
      </Form>
    </div>
  );
}

export default StepComp;
