import React from "react";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <section className="article-cta-section">
      <div className="container article-cta-container">
        <Link to="/calculator" className="article-cta-button">
          Получить расчет вашего проекта
        </Link>
      </div>
    </section>
  );
};

export default Article;
