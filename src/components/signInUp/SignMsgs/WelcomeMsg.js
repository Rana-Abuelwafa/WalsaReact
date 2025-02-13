import React from "react";
import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { Link } from "react-router-dom";
function WelcomeMsg() {
  const t = useTranslation();
  return (
    <section className="centerSection">
      <Container>
        <div className="centerContainer">
          <div>
            <img
              src="images/wasla logo.png"
              alt="wasla logo"
              className="logo_img"
            />
          </div>
          <div>
            <h2 className="welcomMsgTitle">{t("Register.WelcomeMsg")}</h2>
            <p className="welcomMsgSubTit">
              {t("Register.WelcomeMsgSubTitle")}
            </p>
          </div>
          <div>
            <Link to="/RegisterQues">
              <Button className="SmallWidthBtn transBtn roundedBtn">
                {t("Register.GetStart")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WelcomeMsg;
