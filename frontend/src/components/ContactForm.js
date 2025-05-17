import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Пожалуйста, введите ваше имя" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === "") {
          return "Пожалуйста, введите email";
        } else if (!emailRegex.test(value)) {
          return "Пожалуйста, введите корректный email";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "name" || name === "email") {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);

    setErrors({
      name: nameError,
      email: emailError,
    });

    if (nameError || emailError) {
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post("/api/trello/create-card", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.comment,
      });

      if (response.data.status === "success") {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", phone: "", comment: "" });
        setErrors({ name: "", email: "" });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: response.data.message,
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || "Ошибка соединения",
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Контакты</h2>

      {status.success && (
        <div className="alert success">Заявка успешно отправлена!</div>
      )}

      {status.error && <div className="alert error">{status.error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше имя *"
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Телефон (необязательно)"
          />
        </div>

        <div className="form-group">
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Ваше сообщение"
            rows="3"
          />
        </div>

        <button type="submit" disabled={status.loading} className="submit-btn">
          {status.loading ? "Отправка..." : "Отправить"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
