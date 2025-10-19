import React, { useState, useEffect } from "react";

const LecturePage = () => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Classes");
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetch("/path/to/lecture.json") // Înlocuiește cu calea corectă
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Eroare la încărcarea datelor:", error));
  }, []);

  if (!data) return <div>Se încarcă...</div>;

  const categories = Object.keys(data);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#4a90e2", color: "white", padding: "15px", textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
        Lost Ark Nexus
      </header>
      <div style={{ display: "flex", flex: 1 }}>
        <nav style={{ width: "20%", borderRight: "1px solid #ddd", padding: "10px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {categories.map((category) => (
              <li key={category} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSection(null);
                  }}
                  style={{
                    backgroundColor: selectedCategory === category ? "#4a90e2" : "transparent",
                    color: selectedCategory === category ? "white" : "black",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {category}
                </button>
                {selectedCategory === category && (
                  <ul style={{ listStyle: "none", paddingLeft: "20px", marginTop: "10px" }}>
                    {Object.keys(data[category]).map((section) => (
                      <li key={section} style={{ marginBottom: "5px" }}>
                        <button
                          onClick={() => setSelectedSection(section)}
                          style={{
                            backgroundColor: selectedSection === section ? "#357ABD" : "transparent",
                            color: selectedSection === section ? "white" : "black",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                        >
                          {section}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <main style={{ flex: 1, padding: "20px" }}>
          {selectedSection ? (
            <>
              <h1>{selectedSection}</h1>
              <p>{data[selectedCategory][selectedSection]}</p>
            </>
          ) : (
            <h1>Selectează o secțiune</h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default LecturePage;
