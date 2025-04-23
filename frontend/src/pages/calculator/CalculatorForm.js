import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/public/data"; //ЗАМЕНИТЬ ЗАПРОС НА VPS!

const CalculatorForm = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service: "",
    subcategory: "",
    options: [],
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка услуг при монтировании
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/alltakes`);
        setServices(data);
      } catch (err) {
        setError("Ошибка загрузки услуг");
      }
    };
    loadServices();
  }, []);

  // Расчет стоимости
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service || !form.subcategory) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(`${API_URL}/calculate/`, {
        service: form.service,
        subcategory: form.subcategory,
        options: form.options,
      });

      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка расчета");
    } finally {
      setLoading(false);
    }
  };

  // Получаем уникальные услуги и подкатегории
  const serviceTypes = [...new Set(services.map((s) => s["Услуга"]))];
  const subcategories = services
    .filter((s) => s["Услуга"] === form.service)
    .map((s) => s["Подкатегория"]);

  // Текущая выбранная услуга
  const currentService = services.find(
    (s) =>
      s["Услуга"] === form.service && s["Подкатегория"] === form.subcategory
  );

  // Форматирование цены
  const formatPrice = (value) => {
    const num = Number(value);
    if (isNaN(num)) {
      return "N/A";
    }
    return num.toLocaleString("ru-RU");
  };

  return (
    <div className="calculator-form">
      <h2>Калькулятор услуг VelesIT</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Услуга:</label>
          <ul className="services-list">
            {serviceTypes.map((service) => (
              <li
                key={service}
                className={`service-item ${
                  form.service === service ? "active" : ""
                }`}
                onClick={() =>
                  setForm({
                    service: service,
                    subcategory: "",
                    options: [],
                  })
                }
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {form.service && (
          <div className="form-group">
            <label>Подкатегория:</label>
            <ul className="subcategories-list">
              {subcategories.map((sub) => (
                <li
                  key={sub}
                  className={`subcategory-item ${
                    form.subcategory === sub ? "active" : ""
                  }`}
                  onClick={() =>
                    setForm({
                      ...form,
                      subcategory: sub,
                      options: [],
                    })
                  }
                >
                  {sub.split(":")[0]}: <strong>{sub.split(":")[1]}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentService && (
          <div className="options-group">
            <h3>Дополнительные опции:</h3>
            {Object.entries(currentService["Дополнительные опции"]).map(
              ([option, price]) => (
                <label key={option} className="option">
                  <input
                    type="checkbox"
                    checked={form.options.includes(option)}
                    onChange={() => {
                      const newOptions = form.options.includes(option)
                        ? form.options.filter((o) => o !== option)
                        : [...form.options, option];
                      setForm({ ...form, options: newOptions });
                      setResult(null);
                    }}
                  />
                  {option} ({price > 0 ? "+" : ""}
                  {formatPrice(price)} ₽)
                </label>
              )
            )}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Расчет..." : "Рассчитать стоимость"}
        </button>
      </form>

      {result && (
        <div className="result">
          <h3>Результат:</h3>
          <p>
            Базовая цена:{" "}
            <strong>{formatPrice(result.base_price ?? result.price)} ₽</strong>
          </p>
          {result.base_price !== undefined &&
            result.price !== undefined &&
            Number(result.price) - Number(result.base_price) !== 0 && (
              <p>
                Доп. опции: +
                {formatPrice(Number(result.price) - Number(result.base_price))}{" "}
                ₽
              </p>
            )}
          <p className="total">
            Итого: <strong>{formatPrice(result.price)} ₽</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
