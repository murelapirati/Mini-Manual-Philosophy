import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CoverPage from "./components/CoverPage";
import Lesson from "./components/Lesson";
import Quiz from "./components/Quiz";
import Bibliografie from "./components/Bibliografie";
import "./styles.css"; // Importă styles.css

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Verifică pagina curentă
  const isHomePage = location.pathname === "/home"; // Butonul apare doar pe Home

  return (
    <div className="app-container">
      {/* Buton „Coperta” vizibil doar pe Home */}
      {isHomePage && (
        <div className="cover-button-container">
          <Link to="/" className="cover-button">📖 Coperta</Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<CoverPage />} /> {/* ✅ CoverPage este prima pagină */}
        <Route path="/home" element={<Home />} />
        <Route path="/bibliografie" element={<Bibliografie />} />
        <Route path="/lectii/:chapterId/:lessonId" element={<Lesson />} />
        <Route path="/quiz/:chapterId/:lessonId" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
