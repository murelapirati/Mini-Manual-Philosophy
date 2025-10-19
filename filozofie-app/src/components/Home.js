import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "40px" }}>
      {/* Titlul paginii */}
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>📖 Filosofie</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>Alege un capitol pentru a începe:</p>

      {/* Galerie de imagini pe margini */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <img src="/images/aristotel.jpg" alt="Aristotel" style={{ width: "180px", height: "180px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }} />
        <img src="/images/sisif.jpg" alt="Mitul lui Sisif" style={{ width: "180px", height: "180px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }} />
        <img src="/images/socrate.jpg" alt="Socrate" style={{ width: "180px", height: "180px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }} />
        <img src="/images/sisif_artistic.jpg" alt="Reprezentare artistică a lui Sisif" style={{ width: "180px", height: "180px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }} />
      </div>

      {/* Butoane pentru selectarea capitolului */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <button 
          onClick={() => navigate("/lectii/1/1")} 
          style={{ backgroundColor: "#28a745", color: "white", padding: "12px 20px", fontSize: "18px", borderRadius: "10px", border: "none", cursor: "pointer", width: "300px", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          🟢 Capitolul 1 - Problematica Naturii Umane
        </button>
        <button 
          onClick={() => navigate("/lectii/2/1")} 
          style={{ backgroundColor: "#007bff", color: "white", padding: "12px 20px", fontSize: "18px", borderRadius: "10px", border: "none", cursor: "pointer", width: "300px", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          🔵 Capitolul 2 - Morala
        </button>
        <button 
          onClick={() => navigate("/lectii/3/1")} 
          style={{ backgroundColor: "#ffc107", color: "black", padding: "12px 20px", fontSize: "18px", borderRadius: "10px", border: "none", cursor: "pointer", width: "300px", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}
        >
          🟡 Capitolul 3 - Politica
        </button>
      </div>

      {/* Buton pentru Bibliografie */}
      <button 
        onClick={() => navigate("/bibliografie")} 
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          backgroundColor: "#ffdd57",
          color: "black",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)"
        }}
      >
        📚 Bibliografie
      </button>
    </div>
  );
};

export default Home;
