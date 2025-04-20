import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function RegisterationResponse() {
  const t = useTranslation();
  const { WelcomeMsg } = useSelector((state) => state.register);
  return (
    <div className="registrationMsg centerContainer">
      <div
        dangerouslySetInnerHTML={{
          __html:
            WelcomeMsg != null
              ? WelcomeMsg
              : localStorage.getItem("WelcomeMsg"),
        }}
      />
      {/* <div>
        <p className="welcomMsgSubTit">
          Dear customer, the form has been submitted to our designers for review
          and implementation, you will be contacted to obtain further details.
          <br />
          <br />
          Thank you for choosing our services.
        </p>
      </div> */}
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
