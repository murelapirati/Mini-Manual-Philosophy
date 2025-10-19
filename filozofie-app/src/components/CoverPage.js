import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoverPage.css"; 

const coverImage = process.env.PUBLIC_URL + "/images/cover.jpg"; // ✅ Calea corectă

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="cover-page" style={{ backgroundImage: `url('/images/cover.jpg')` }}>

      <div className="overlay"></div>
      <div className="content">
        <h1>CONCURSUL NAȚIONAL</h1>
        <h2>ISTORIE ȘI SOCIETATE ÎN DIMENSIUNE VIRTUALĂ</h2>
        <h2>PAGINI WEB - FILOSOFIA</h2>
        <p className="info"><strong>PRECUP RAUL</strong></p>
        <p className="info">Clasa a XII-a B</p>
        <p className="info">Liceul Greco-Catolic Iuliu Maniu</p>
        <p className="info">Coordonatori: Prof. Blaga Monica, Prof. Gal-Chiș Călin</p>
        <p className="info">ORADEA - Februarie 2025</p>
        <button className="start-button" onClick={() => navigate("/home")}>
          🏠 Intră în Mini-Manual
        </button>
      </div>
    </div>
  );
};

export default CoverPage;
