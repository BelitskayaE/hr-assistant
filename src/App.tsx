import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage.tsx";

const App: React.FC = () => (
  <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;

