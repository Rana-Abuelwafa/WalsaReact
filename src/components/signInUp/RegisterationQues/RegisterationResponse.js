import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function RegisterationResponse() {
  const t = useTranslation();
  const { WelcomeMsg } = useSelector((state) => state.register);
  return (
    //message come automatic from API
    <div className="registrationMsg centerContainer">
      <div dangerouslySetInnerHTML={{ __html: WelcomeMsg }} />
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
