import React from 'react';
import './DogPost.css';

const DogPost = ({ dog, onLike, onUnlike, liked }) => {
  const handleLikeClick = () => {
    if (liked) {
      onUnlike(dog.id);
    } else {
      onLike(dog.id, dog.link, dog.likes);
    }
  };

  const isVideo = dog.link.endsWith('.mp4');
  const isGif = dog.link.endsWith('.gif');

  return (
    <div className="dog-post">
      {isVideo ? (
        <video src={dog.link} controls autoPlay loop muted className="dog-media" />
      ) : (
        <img src={dog.link} alt={`Dog ${dog.id}`} className="dog-media" />
      )}
      <button onClick={handleLikeClick}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      <span>{dog.likes} likes</span>
    </div>
  );
};

export default DogPost;