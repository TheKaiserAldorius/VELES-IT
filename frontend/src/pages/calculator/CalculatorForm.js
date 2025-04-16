import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalculatorForm.css';

const API_URL = 'http://localhost:8000/api/v1';

const CalculatorForm = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service: '',
    subcategory: '',
    options: []
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка услуг при монтировании
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/services`);
        setServices(data);
      } catch (err) {
        setError('Ошибка загрузки услуг');
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
      const { data } = await axios.post(`${API_URL}/calculate`, {
        service: form.service,
        subcategory: form.subcategory,
        options: form.options
      });
      
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка расчета');
    } finally {
      setLoading(false);
    }
  };

  // Получаем уникальные услуги и подкатегории
  const serviceTypes = [...new Set(services.map(s => s["Услуга"]))];
  const subcategories = services
    .filter(s => s["Услуга"] === form.service)
    .map(s => s["Подкатегория"]);

  // Текущая выбранная услуга
  const currentService = services.find(s => 
    s["Услуга"] === form.service && 
    s["Подкатегория"] === form.subcategory
  );

  return (
    <div className="calculator-form">
      <h2>Калькулятор услуг VelesIT</h2>
      
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Услуга:</label>
          <select
            value={form.service}
            onChange={(e) => setForm({
              service: e.target.value,
              subcategory: '',
              options: []
            })}
            required
          >
            <option value="">Выберите услугу</option>
            {serviceTypes.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {form.service && (
          <div className="form-group">
            <label>Подкатегория:</label>
            <select
              value={form.subcategory}
              onChange={(e) => setForm({
                ...form,
                subcategory: e.target.value,
                options: []
              })}
              required
            >
              <option value="">Выберите подкатегорию</option>
              {subcategories.map(sub => (
                <option key={sub} value={sub}>
                  {sub.split(':')[0]}: <strong>{sub.split(':')[1]}</strong>
                </option>
              ))}
            </select>
          </div>
        )}

        {currentService && (
          <div className="options-group">
            <h3>Дополнительные опции:</h3>
            {Object.entries(currentService["Дополнительные опции"]).map(([option, price]) => (
              <label key={option} className="option">
                <input
                  type="checkbox"
                  checked={form.options.includes(option)}
                  onChange={() => {
                    const newOptions = form.options.includes(option)
                      ? form.options.filter(o => o !== option)
                      : [...form.options, option];
                    setForm({...form, options: newOptions});
                  }}
                />
                {option} ({price > 0 ? '+' : ''}{price.toLocaleString('ru-RU')} ₽)
              </label>
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Расчет...' : 'Рассчитать стоимость'}
        </button>
      </form>

      {result && (
        <div className="result">
          <h3>Результат:</h3>
          <p>Базовая цена: <strong>{result.base_price.toLocaleString('ru-RU')} ₽</strong></p>
          {result.options_applied.length > 0 && (
            <p>Доп. опции: +{result.price - result.base_price} ₽</p>
          )}
          <p className="total">Итого: <strong>{result.price.toLocaleString('ru-RU')} ₽</strong></p>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;