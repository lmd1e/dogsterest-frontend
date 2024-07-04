import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogPost from './DogPost';

const LikedPosts = () => {
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    fetchLikedDogs();
  }, []);

  const fetchLikedDogs = async () => {
    const response = await axios.get('/dogs/liked');
    setLikedDogs(response.data);
  };

  return (
    <div>
      {likedDogs.map(dog => (
        <DogPost key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default LikedPosts;