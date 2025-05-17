import React from "react";
import { useNavigate } from "react-router-dom";

const OrderBtn = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/");
    setTimeout(() => {
      const contactsElement = document.getElementById("contacts");
      if (contactsElement) {
        contactsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section className="article-cta-section">
      <div className="container article-cta-container">
        <button 
          className="cta-button"
          onClick={handleClick}
        >
          Сделать заказ
        </button>
      </div>
    </section>
  );
};

export default OrderBtn;
