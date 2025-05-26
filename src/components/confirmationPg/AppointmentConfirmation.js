import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./AppointmentConfirmation.scss";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";

const AppointmentConfirmation = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <Container fluid className="confirmation-container text-center">
      <Row className="justify-content-center">
        <Col>
          <Card className="confirmation-card p-4">
            <Card.Body>
              <h5 className="mb-4">{t("confirmation.dearCustomer")}</h5>
              <p>{t("confirmation.appointmentConfirmed")}</p>
              <p>{t("confirmation.detailsSent")}</p>
              <p className="mt-4">{t("confirmation.thankYou")}</p>
              <Button variant="outline-primary" className="mt-3" onClick={() => navigate("/")}>
                {t("confirmation.backToHome")}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentConfirmation;
