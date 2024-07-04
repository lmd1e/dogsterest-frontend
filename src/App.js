import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import DogFeed from './components/DogFeed';
import LikedPosts from './components/LikedPosts';
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
        <Route path="/" element={<DogFeed />} />
        <Route path="/liked" element={<LikedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;