<section className="hero-section" dir={t("dir")}>
  <Row className="align-items-center">
    <Col lg={6} className={`order-lg-1 order-2 text-lg-${t("dir") === "rtl" ? "end" : "start"}`}>
      <h1 className="hero-heading">
        {t("Home.heroTitle1")} {t("Home.heroTitle2")} <br /><span className="highlight">{t("Home.heroHighlight")}</span>
      </h1>
      <p className="service-description">
        {t("Home.heroDescription").split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <Button className="cta-button" onClick={() => navigate("/login")}>
        {t("Home.getStarted")}
      </Button>
    </Col>
    <Col lg={6} className="order-lg-2 order-1 text-center">
      <img
        src="images/webs3.png"
        alt={t("Home.heroImageAlt")}
        className="img-fluid illustration"
      />
    </Col>
  </Row>
</section>