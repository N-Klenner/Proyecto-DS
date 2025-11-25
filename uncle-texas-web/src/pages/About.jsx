// src/pages/About.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="quienes-somos" className="section">
      <div className="section-inner">
        <div className="section-content">
          <header className="section-header">
            <div className="section-pill">{t("about.pill")}</div>
          </header>

          <div className="section-body">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
