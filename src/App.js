import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // HashRouter로 변경
import Home from './pages/Home';
import Detail from './pages/Detail';

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