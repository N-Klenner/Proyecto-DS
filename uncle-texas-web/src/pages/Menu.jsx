// src/pages/Menu.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const Menu = () => {
  const { t } = useLanguage();

  return (
    <section id="menu" className="section">
      <div className="section-inner">
        <div className="section-content">
          <header className="section-header">
            <div className="section-pill">{t("menuSection.pill")}</div>
          </header>

          <div className="section-body">
            <p>{t("menuSection.intro")}</p>

            <div className="menu-grid">
              <div>
                <h3 className="menu-column-title">
                  {t("menuSection.col1Title")}
                </h3>
                <ul className="menu-list">
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.brisket")}
                    </span>
                    <span className="menu-item-price">$9.900</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.ribs")}
                    </span>
                    <span className="menu-item-price">$10.900</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.pulledPork")}
                    </span>
                    <span className="menu-item-price">$8.900</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.burger")}
                    </span>
                    <span className="menu-item-price">$8.500</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="menu-column-title">
                  {t("menuSection.col2Title")}
                </h3>
                <ul className="menu-list">
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.fries")}
                    </span>
                    <span className="menu-item-price">$3.500</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.macCheese")}
                    </span>
                    <span className="menu-item-price">$3.900</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.salad")}
                    </span>
                    <span className="menu-item-price">$3.200</span>
                  </li>
                  <li className="menu-item">
                    <span className="menu-item-name">
                      {t("menuSection.items.drinks")}
                    </span>
                    <span className="menu-item-price">
                      {t("menuSection.items.drinksNote")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
