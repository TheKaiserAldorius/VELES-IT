import React from "react";

const ServiceCard = ({ service }) => (
  <div className="service-card1">
    {service.image && (
      <div className="service-image">
        <img src={service.image} alt={service.title || "Изображение услуги"} />
      </div>
    )}
    <h3>{service.title || "Название услуги"}</h3>
    {service.description && (
      <p className="description-content">{service.description}</p>
    )}
    {service.price && <p className="service-price">{service.price}</p>}
    {/* Убрана кнопка Заказать, т.к. вся карточка - ссылка */}
    {/* <button className="service-order-btn">Заказать</button> */}
  </div>
);

export default ServiceCard;
