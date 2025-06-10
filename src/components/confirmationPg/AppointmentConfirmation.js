import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "./AppointmentConfirmation.scss";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";

const AppointmentConfirmation = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <Container fluid className="confirmation-container text-center">
      <Row className="justify-content-center">
        <Col>
          <Card className="confirmation-card p-4">
            <Card.Body>
              <h5 className="mb-4">{t("confirmation.termsConditions")}</h5>
              {/* <p>{t("confirmation.appointmentConfirmed")}</p>
              <p>{t("confirmation.detailsSent")}</p>
              <p className="mt-4">{t("confirmation.thankYou")}</p> */}

              <Form.Check
                type="checkbox"
                id="agreeTerms"
                className="mt-4 d-flex align-items-center justify-content-center check-terms"
                label={t("confirmation.agreetoterms")}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/pricing")}
                  disabled={!agreed}
                >
                  {t("confirmation.back")}
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/")}
                  disabled={!agreed}
                >
                  {t("confirmation.continue")}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentConfirmation;
