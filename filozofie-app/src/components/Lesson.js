import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Lesson = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const chapters = {
    1: { name: "Problematica Naturii Umane", lessons: { "1-1": "Introducere", "1-2": "Omul și cultura", "1-3": "Simbolismul în cultură" } },
    2: { name: "Morala", lessons: { "2-1": "Definiția moralei", "2-2": "Dileme etice" } },
    3: { name: "Politica", lessons: { "3-1": "Definiția politicii", "3-2": "Tipuri de putere" } },
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/data/${chapterId}-${lessonId}.json`);
        if (!response.ok) {
          throw new Error("Fișierul JSON nu a fost găsit");
        }
        const data = await response.json();
        setLesson(data);
      } catch (err) {
        console.error("Eroare la încărcarea lecției:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [chapterId, lessonId]);

  if (loading) return <p style={{ textAlign: "center", fontSize: "18px" }}>⏳ Se încarcă lecția...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>⚠️ Eroare la încărcarea lecției. Verifică fișierul JSON.</p>;

  const currentLessons = chapters[chapterId]?.lessons || {};
  const lessonKeys = Object.keys(currentLessons);
  const currentIndex = lessonKeys.indexOf(`${chapterId}-${lessonId}`);
  const nextLesson = lessonKeys[currentIndex + 1];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header verde cu titlu și buton Home stilizat */}
      <div style={{ backgroundColor: "#28a745", color: "white", padding: "15px", textAlign: "center", fontSize: "24px", fontWeight: "bold", position: "relative" }}>
        🏛️ Filosofie  
        <Link to="/home" 
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "8px 15px",
            border: "2px solid white",
            borderRadius: "5px",
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
            transition: "0.3s",
            backgroundColor: "rgba(255,255,255,0.2)"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.4)"}
          onMouseOut={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
        >
          🏠 Home
        </Link>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div style={{ width: "300px", backgroundColor: "#343a40", color: "white", padding: "20px", borderRight: "2px solid #ddd", boxShadow: "2px 0px 5px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", color: "#f8f9fa" }}>📖 Cuprins</h3>
          <h4 style={{ color: "#ffc107" }}>Capitol:</h4>
          <select value={chapterId} onChange={(e) => navigate(`/lectii/${e.target.value}/1`)} style={{ width: "100%", padding: "10px" }}>
            {Object.keys(chapters).map((cap) => (
              <option key={cap} value={cap}>
                Capitolul {cap} - {chapters[cap].name}
              </option>
            ))}
          </select>
          <h4 style={{ color: "#ffc107", marginTop: "15px" }}>Lecție:</h4>
          <select value={lessonId} onChange={(e) => navigate(`/lectii/${chapterId}/${e.target.value}`)} style={{ width: "100%", padding: "10px" }}>
            {lessonKeys.map((les) => (
              <option key={les} value={les.split("-")[1]}>
                Lecția {les.split("-")[1]} - {chapters[chapterId].lessons[les]}
              </option>
            ))}
          </select>
        </div>

        {/* Conținutul lecției */}
        <div style={{ flexGrow: 1, padding: "40px", overflowY: "auto", backgroundColor: "#fff" }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>{lesson.titlu}</h1>

          <h3 style={{ color: "#0056b3" }}>🎯 Obiective:</h3>
          <ul>{lesson.Obiective.map((obj, index) => <li key={index}>{obj}</li>)}</ul>

          <h3 style={{ color: "#0056b3" }}>📖 Conținut:</h3>
          <div>
            {Object.entries(lesson.Continut).map(([section, content], index) => (
              <div key={index}>
                <h4 style={{ color: "#222" }}>{section}</h4>
                <p>{typeof content === "object" ? Object.values(content).join(" ") : content}</p>
                
                {/* Afișare imagine la fiecare secțiune */}
                <img 
                  src={`/images/${chapterId}-${lessonId}-${index + 1}.jpg`} 
                  alt={`Imagine pentru ${section}`} 
                  style={{ width: "100%", maxWidth: "600px", display: "block", margin: "15px auto", borderRadius: "10px" }}
                  onError={(e) => e.target.style.display = "none"} 
                />
              </div>
            ))}
          </div>

          {/* Butoane de navigare */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button onClick={() => navigate(`/quiz/${chapterId}/${lessonId}`)} style={{ marginRight: "15px", padding: "12px 25px", backgroundColor: "#007bff", color: "white" }}>📖 Rezolvă Quiz</button>
            {nextLesson && (
              <button onClick={() => navigate(`/lectii/${nextLesson.split("-")[0]}/${nextLesson.split("-")[1]}`)} style={{ padding: "12px 25px", backgroundColor: "#28a745", color: "white" }}>📖 Următoarea Lecție</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Lesson;
