import React from "react";

const ServiceCard = ({ service }) => (
  <div className="service-card1">
    <div className="service-image">
      <img src={service.image} alt={service.title} />
    </div>
    <h3>{service.title}</h3>
    <p className="description-content">{service.description}</p>
    <p className="service-price">{service.price}</p>
    <button className="service-order-btn">Заказать</button>
  </div>
);

export default ServiceCard;
