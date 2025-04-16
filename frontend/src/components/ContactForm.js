import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [status, setStatus] = useState({ 
    loading: false, 
    success: false, 
    error: null 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      const response = await axios.post('/api/trello/create-card', {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment
      });
      
      if (response.data.status === 'success') {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', phone: '', comment: '' });
      } else {
        setStatus({ loading: false, success: false, error: response.data.message });
      }
    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Ошибка соединения' 
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Оставить заявку</h2>
      
      {status.success && (
        <div className="alert success">Заявка успешно отправлена!</div>
      )}
      
      {status.error && (
        <div className="alert error">{status.error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Ваше имя"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Ваш телефон"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="comment"
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            placeholder="Комментарий (необязательно)"
            rows="3"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={status.loading}
          className="submit-btn"
        >
          {status.loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;