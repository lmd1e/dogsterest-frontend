import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Убедитесь, что путь к файлу правильный
import DogFeed from './components/DogFeed';
import LikedPosts from './components/LikedPosts';
import './App.css'; // Импортируйте CSS файл для стилей

function App() {
  return (
    <Router>
      <Navbar /> {/* Используйте компонент Navbar здесь */}
      <Routes>
        <Route path="/" element={<DogFeed />} />
        <Route path="/liked" element={<LikedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;