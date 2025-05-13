import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./RegisterQues.scss";
function RegisterationResponse() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { WelcomeMsg } = useSelector((state) => state.register);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg(state.msg);
  }, []);

  return (
    //message come automatic from API
    <div className="registrationMsg centerContainer">
      <div dangerouslySetInnerHTML={{ __html: msg }} />
      <div>
        <Link to={"/"}>
          <Button className="SmallWidthBtn transBtn roundedBtn">
            {t("Register.BackHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterationResponse;
