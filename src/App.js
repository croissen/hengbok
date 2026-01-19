// src/App.js (예시)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail'; // Detail 컴포넌트 임포트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Detail />} /> 
      </Routes>
    </Router>
  );
}

export default App;