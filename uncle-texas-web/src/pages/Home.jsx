// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import "./Home.css";

const Home = () => {
  const { t } = useLanguage();

  const slides = [
    {
      src: "/img/Imagen de WhatsApp 2025-11-22 a las 11.58.01_b8853b97.jpg",
      alt: "Interior Uncle Texas",
      type: "brand",
      title: "UNCLE TEXAS", // la marca NO se traduce
      subtitle: t("home.subtitle"),
      body: ""
    },
    {
      src: "/img/Imagen de WhatsApp 2025-11-22 a las 17.43.06_9b6c4edf.jpg",
      alt: "Comida Uncle Texas",
      type: "section",
      title: t("home.slider.title2"),
      body: t("home.slider.body2")
    },
    {
      src: "/img/Imagen de WhatsApp 2025-11-22 a las 12.01.12_c3e38660.jpg",
      alt: "Patio y juegos para niños",
      type: "section",
      title: t("home.slider.title3"),
      body: t("home.slider.body3")
    }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSlide = slides[current];

  return (
    <main id="inicio" className="home">
      <section className="hero-section">
        <div className="carousel">
          <img
            src={currentSlide.src}
            alt={currentSlide.alt}
            className="hero-image"
          />

          <button className="carousel-btn prev" onClick={prev}>
            ‹
          </button>
          <button className="carousel-btn next" onClick={next}>
            ›
          </button>

          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={index === current ? "dot dot-active" : "dot"}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>

        <div className="hero-text">
          {currentSlide.type === "brand" ? (
            <>
              <h1>{currentSlide.title}</h1>
              <p className="hero-sub">{currentSlide.subtitle}</p>
            </>
          ) : (
            <>
              <h2 className="hero-title-small">{currentSlide.title}</h2>
              <p className="hero-sub">{currentSlide.body}</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
