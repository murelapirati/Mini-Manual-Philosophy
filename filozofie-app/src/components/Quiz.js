import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css"; // Importă styles.css

const Quiz = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/data/${chapterId}-${lessonId}.json`);
        if (!response.ok) {
          throw new Error("Fișierul JSON nu a fost găsit");
        }
        const data = await response.json();
        setQuiz(data.Evaluare);
      } catch (err) {
        console.error("Eroare la încărcarea quizului:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [chapterId, lessonId]);

  if (loading) return <p className="loading">⏳ Se încarcă quizul...</p>;
  if (error) return <p className="error">⚠️ Eroare la încărcarea quizului. Verifică fișierul JSON.</p>;

  const handleAnswer = (questionIndex, answer) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev };
      if (updatedAnswers[questionIndex] === answer) {
        delete updatedAnswers[questionIndex]; // Permite deselectarea răspunsului
      } else {
        updatedAnswers[questionIndex] = answer;
      }
      setErrorMessage(""); // Șterge mesajul de eroare dacă utilizatorul selectează un răspuns
      setScore(null); // Resetăm scorul pentru recalculare corectă
      return updatedAnswers;
    });
  };

  const finishQuiz = () => {
    if (Object.keys(selectedAnswers).length !== quiz.Intrebari.length) {
      setErrorMessage("⚠️ Trebuie să răspunzi la toate întrebările înainte de a finaliza quizul!");
      return;
    }

    let correctAnswers = 0;
    quiz.Intrebari.forEach((intrebare, index) => {
      if (selectedAnswers[index] === intrebare.raspuns_corect) {
        correctAnswers++;
      }
    });

    setScore(((correctAnswers / quiz.Intrebari.length) * 100).toFixed(2));
    setErrorMessage(""); // Ascunde mesajul de eroare după finalizare
  };

  return (
    <div className="quiz-container">
      <h1>Quiz - Lecția {lessonId}</h1>

      {quiz.Intrebari.map((intrebare, index) => (
        <div key={index} className="quiz-question">
          <p>{intrebare.text}</p>
          <div className="quiz-options">
            {intrebare.optiuni.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(index, opt[0])} // Se compară corect cu string-ul din JSON
                className={`quiz-option ${selectedAnswers[index] === opt[0] ? "selected" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {errorMessage && <p className="quiz-error">{errorMessage}</p>}

      <button className="quiz-finish" onClick={finishQuiz}>✅ Finalizează Quiz</button>

      {score !== null && <p className="quiz-score">Scor final: {score}%</p>}

      <div className="quiz-buttons">
        <button className="quiz-nav" onClick={() => navigate(`/lectii/${chapterId}/${lessonId}`)}>↩️ Înapoi la Lecție</button>
        <button className="quiz-nav next" onClick={() => navigate(`/lectii/${chapterId}/${parseInt(lessonId) + 1}`)}>📖 Următoarea Lecție</button>
      </div>
    </div>
  );
};

export default Quiz;
