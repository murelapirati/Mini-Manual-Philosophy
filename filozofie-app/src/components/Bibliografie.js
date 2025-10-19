import React from "react";
import { useNavigate } from "react-router-dom";

const Bibliografie = () => {
  const navigate = useNavigate();

  return (
    <div className="bibliography-container">
      <h1>📚 Bibliografie</h1>
      <ul>
        <li>Filosofie, Manual pentru clasa a XII-a, Tip A, Editura Didactică și Pedagogică, R.A., autori Elena Lupșa și Gabriel Hacman, 2007</li>
        <li>Wikipedia – informații despre Politică</li>
        <li>W3Schools – informații legate de partea de Informatică</li>
      </ul>

      {/* Buton pentru a reveni la homepage */}
      <button className="back-home-button" onClick={() => navigate("/")}>🏠 Înapoi la Homepage</button>
    </div>
  );
};

export default Bibliografie;
