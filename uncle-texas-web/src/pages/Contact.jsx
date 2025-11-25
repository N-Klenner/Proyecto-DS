// src/pages/Contact.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";

const Contact = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [opinions, setOpinions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // cartel "Howdy amigo!"
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const openLoginAlert = () => setShowLoginAlert(true);
  const closeLoginAlert = () => setShowLoginAlert(false);

  // cargar opiniones en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "opiniones"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data(),
      }));
      setOpinions(items);
    });

    return () => unsubscribe();
  }, []);

  // si hay usuario logueado, usar su nombre al entrar
  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      openLoginAlert();
      return;
    }

    if (!comment.trim()) {
      alert(t("contact.mustWriteComment"));
      return;
    }
    if (rating === 0) {
      alert(t("contact.mustChooseRating"));
      return;
    }

    const finalName = name.trim() || user.displayName || "Invitado";

    try {
      await addDoc(collection(db, "opiniones"), {
        name: finalName,
        comment: comment.trim(),
        rating,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      // limpiar campos
      setComment("");
      setRating(0);
      setName(user.displayName || "");
      if (e.target && e.target.reset) {
        e.target.reset();
      }
    } catch (err) {
      console.error("Error al guardar la opinión", err);
      alert(t("contact.errorCreate"));
    }
  };

  const startEdit = (opinion) => {
    if (!user || !opinion.userId || user.uid !== opinion.userId) {
      alert(t("contact.onlyOwnCanEdit"));
      return;
    }
    setEditingId(opinion.id);
    setEditingText(opinion.comment);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) {
      alert(t("contact.commentCantBeEmpty"));
      return;
    }
    try {
      const ref = doc(db, "opiniones", id);
      await updateDoc(ref, {
        comment: editingText.trim(),
      });
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error("Error al editar la opinión", err);
      alert(t("contact.errorUpdate"));
    }
  };

  const removeOpinion = async (opinion) => {
    if (!user || !opinion.userId || user.uid !== opinion.userId) {
      alert(t("contact.onlyOwnCanDelete"));
      return;
    }

    const ok = window.confirm(t("contact.deleteConfirm"));
    if (!ok) return;

    try {
      const ref = doc(db, "opiniones", opinion.id);
      await deleteDoc(ref);
    } catch (err) {
      console.error("Error al eliminar la opinión", err);
      alert(t("contact.errorDelete"));
    }
  };

  const renderStars = (value) => {
    const safe = Math.max(1, Math.min(5, value || 0));
    return (
      <span className="opinions-stars-display">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < safe ? "star-icon star-icon--filled" : "star-icon"
            }
          >
            ★
          </span>
        ))}
        <span className="opinions-stars-number">{safe}/5</span>
      </span>
    );
  };

  // placeholders dependientes de login
  const namePlaceholder = user?.displayName
    ? t("contact.formNamePlaceholderLogged").replace(
        "{{name}}",
        user.displayName
      )
    : t("contact.formNamePlaceholderGuest");

  // handlers cuando alguien intenta escribir sin login
  const handleNameFocus = (e) => {
    if (!user) {
      e.target.blur();
      openLoginAlert();
    }
  };

  const handleCommentFocus = (e) => {
    if (!user) {
      e.target.blur();
      openLoginAlert();
    }
  };

  const handleStarClick = (value) => {
    if (!user) {
      openLoginAlert();
      return;
    }
    setRating(value);
  };

  return (
    <section id="contacto" className="section">
      <div className="section-inner">
        <div className="section-content">
          <header className="section-header">
            <div className="section-pill">
              {t("contact.sectionPill")}
            </div>
          </header>

          <div className="section-body">
            <p>{t("contact.contactIntro")}</p>

            <ul className="menu-list" style={{ marginTop: "1.5rem" }}>
              <li className="menu-item">
                <span className="menu-item-name">
                  {t("contact.phoneLabel")}
                </span>
                <span>+56 9 1234 5678</span>
              </li>
              <li className="menu-item">
                <span className="menu-item-name">
                  {t("contact.instagramLabel")}
                </span>
                <span>@uncletexaspuertovaras</span>
              </li>
              <li className="menu-item">
                <span className="menu-item-name">
                  {t("contact.emailLabel")}
                </span>
                <span>contacto@uncletexas.cl</span>
              </li>
            </ul>
          </div>

          <hr className="contact-divider" />

          <div className="opinions">
            <h3 className="opinions-title">
              {t("contact.opinionsTitle")}
            </h3>
            <p className="opinions-subtitle">
              {t("contact.opinionsSubtitle")}
            </p>

            {/* Formulario */}
            <form className="opinions-form" onSubmit={handleSubmit}>
              <div className="opinions-field">
                <label>{t("contact.formNameLabel")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleNameFocus}
                  className="opinions-input"
                  placeholder={namePlaceholder}
                />
              </div>

              <div className="opinions-field">
                <label>{t("contact.formRatingLabel")}</label>
                <div className="opinions-stars">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        className={
                          value <= rating
                            ? "star-button star-button--active"
                            : "star-button"
                        }
                        onClick={() => handleStarClick(value)}
                      >
                        ★
                      </button>
                    );
                  })}
                  <span className="opinions-stars-label">
                    {!user
                      ? t("contact.formRatingNoUser")
                      : rating === 0
                      ? t("contact.formRatingNoSelect")
                      : `${rating} / 5`}
                  </span>
                </div>
              </div>

              <div className="opinions-field">
                <label>{t("contact.formCommentLabel")}</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={handleCommentFocus}
                  className="opinions-textarea"
                  placeholder={
                    user
                      ? t("contact.formCommentPlaceholderLogged")
                      : t("contact.formCommentPlaceholderGuest")
                  }
                />
              </div>

              <button type="submit" className="opinions-submit">
                {t("contact.submitButton")}
              </button>
            </form>

            {/* Lista de opiniones */}
            <div className="opinions-list">
              {opinions.length === 0 ? (
                <p className="opinions-empty">
                  {t("contact.emptyOpinions")}
                </p>
              ) : (
                opinions.map((op) => {
                  const isOwner =
                    user && op.userId && user.uid === op.userId;

                  return (
                    <div key={op.id} className="opinions-card">
                      <div className="opinions-card-header">
                        <span className="opinions-card-name">
                          {op.name || "Invitado"}
                        </span>
                        {op.rating && renderStars(op.rating)}
                      </div>

                      {editingId === op.id ? (
                        <>
                          <textarea
                            className="opinions-textarea"
                            rows={3}
                            value={editingText}
                            onChange={(e) =>
                              setEditingText(e.target.value)
                            }
                          />
                          {isOwner && (
                            <div className="opinions-card-actions">
                              <button
                                type="button"
                                onClick={() => saveEdit(op.id)}
                                className="opinions-btn opinions-btn-save"
                              >
                                {t("contact.saveButton") || "Guardar"}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="opinions-btn opinions-btn-cancel"
                              >
                                {t("contact.cancelButton") || "Cancelar"}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="opinions-card-text">
                            {op.comment}
                          </p>
                          {isOwner && (
                            <div className="opinions-card-actions">
                              <button
                                type="button"
                                onClick={() => startEdit(op)}
                                className="opinions-btn"
                              >
                                {t("contact.editButton") || "Editar"}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeOpinion(op)}
                                className="opinions-btn opinions-btn-danger"
                              >
                                {t("contact.deleteButton") || "Eliminar"}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cartel "Howdy amigo!" */}
      {showLoginAlert && (
        <div className="login-alert-backdrop" onClick={closeLoginAlert}>
          <div
            className="login-alert-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="login-alert-title">
              {t("contact.modalTitle")}
            </h3>
            <p className="login-alert-text">
              {t("contact.modalText")}
            </p>
            <button
              type="button"
              className="login-alert-button"
              onClick={closeLoginAlert}
            >
              {t("contact.modalButton")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
