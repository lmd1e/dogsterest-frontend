import React, { useState, useEffect } from 'react';
import axios from '../services/api'; 
import DogPost from './DogPost';

const LikedPosts = () => {
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    const savedLikedDogs = localStorage.getItem('likedDogs');
    if (savedLikedDogs) {
      const likedDogIds = Object.keys(JSON.parse(savedLikedDogs)).filter(id => JSON.parse(savedLikedDogs)[id]);
      setLikedDogs(likedDogIds.map(id => ({ id, link: JSON.parse(savedLikedDogs)[id].link, likes: JSON.parse(savedLikedDogs)[id].likes })));
    }
  }, []);

  const handleUnlike = async (id) => {
    try {

      await axios.post(`/dogs/unlike/${id}`);


      const savedLikedDogs = JSON.parse(localStorage.getItem('likedDogs'));
      if (savedLikedDogs[id]) {
        delete savedLikedDogs[id];
        localStorage.setItem('likedDogs', JSON.stringify(savedLikedDogs));
        setLikedDogs(prevLikedDogs => prevLikedDogs.filter(dog => dog.id !== id));
      }
    } catch (error) {
      console.error('Error unliking dog:', error);
    }
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <h1>Liked Posts</h1>
      {likedDogs.map(dog => (
        <DogPost key={dog.id} dog={dog} onLike={() => {}} onUnlike={handleUnlike} liked={true} />
      ))}
    </div>
  );
};

export default LikedPosts;