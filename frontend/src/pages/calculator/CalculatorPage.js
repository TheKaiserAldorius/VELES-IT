import React from "react";
import CalculatorForm from "./CalculatorForm";

const CalculatorPage = () => {
  return (
    <div className="calculator-page">
      <div className="header">
        <h1>Калькулятор стоимости услуг</h1>
        <p>Рассчитайте стоимость разработки под ваш проект</p>
      </div>
      <CalculatorForm />
    </div>
  );
};

export default CalculatorPage;
