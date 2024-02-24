import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./components/Error";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div
        className={`flex min-h-screen flex-col ${darkMode ? "dark" : ""}`}
        style={{ height: "100vh" }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route
            path="/"
            element={<CodeEditor darkMode={darkMode} readonly={false} />}
          />
          <Route
            path="id/:id"
            element={<CodeEditor darkMode={darkMode} readonly={true} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
