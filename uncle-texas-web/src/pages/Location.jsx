// src/pages/Location.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const Location = () => {
  const { t } = useLanguage();

  return (
    <section id="donde-estamos" className="section">
      <div className="section-inner">
        <div className="section-content">
          {/* Título */}
          <header className="section-header">
            <div className="section-pill">{t("locationSection.pill")}</div>
          </header>

          {/* Contenido en 2 columnas (desktop) / 1 columna (mobile) */}
          <div className="location-grid">
            {/* Columna izquierda → texto + dirección */}
            <div>
              <p className="section-body">{t("locationSection.paragraph")}</p>

              <ul className="menu-list" style={{ marginTop: "1.2rem" }}>
                <li className="menu-item">
                  <span className="menu-item-name">
                    {t("locationSection.addressLabel")}
                  </span>
                  <span>{t("locationSection.addressValue")}</span>
                </li>
                <li className="menu-item">
                  <span className="menu-item-name">
                    {t("locationSection.refLabel")}
                  </span>
                  <span>{t("locationSection.refValue")}</span>
                </li>
              </ul>
            </div>

            {/* Columna derecha → MAPA */}
            <div className="location-grid-map">
              <div
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1" // cuadrado
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.7294909902844!2d-72.89444628684844!3d-41.31474804200339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9618297c1c4b9e29%3A0x8034f67498106323!2sUncle%20Texas!5e0!3m2!1ses-419!2scl!4v1763865000053!5m2!1ses-419!2scl"
                    style={{
                      border: 0,
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%"
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Uncle Texas"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* fin location-grid */}
        </div>
      </div>
    </section>
  );
};

export default Location;
