import React, { useState, useEffect, useCallback } from 'react';
import axios from '../services/api'; // Путь к вашему файлу api.js
import DogPost from './DogPost';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import './DogFeed.css'; // Создайте этот файл для стилей

const DogFeed = () => {
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likedDogs, setLikedDogs] = useState(() => {
    const savedLikedDogs = localStorage.getItem('likedDogs');
    return savedLikedDogs ? JSON.parse(savedLikedDogs) : {};
  });
  const [loadedPages, setLoadedPages] = useState(new Set());

  const fetchDogs = useCallback(async () => {
    if (loadedPages.has(page)) return;
    setLoadedPages(prev => new Set(prev).add(page));
    console.log('Fetching dogs for page:', page);
    try {
      const response = await axios.get(`/dogs?page=${page}`);
      const uniqueDogs = response.data.filter(dog => !dogs.some(existingDog => existingDog.id === dog.id));
      setDogs(prevDogs => [...prevDogs, ...uniqueDogs]);
      setHasMore(uniqueDogs.length > 0);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  }, [page, dogs, loadedPages]);

  useEffect(() => {
    console.log('useEffect triggered');
    const timeoutId = setTimeout(() => {
      fetchDogs();
    }, 1); 

    return () => clearTimeout(timeoutId);
  }, [fetchDogs]);

  useEffect(() => {
    localStorage.setItem('likedDogs', JSON.stringify(likedDogs));
  }, [likedDogs]);

  const handleLike = async (id, link, likes) => {
    if (!likedDogs[id]) {
      await axios.post(`/dogs/like/${id}`);
      setLikedDogs(prevLikedDogs => ({ ...prevLikedDogs, [id]: { link, likes: likes + 1 } }));
      setDogs(prevDogs => 
        prevDogs.map(dog => 
          dog.id === id ? { ...dog, likes: dog.likes + 1 } : dog
        )
      );
    }
  };

  const handleUnlike = async (id) => {
    try {
      await axios.post(`/dogs/unlike/${id}`);
      setLikedDogs(prevLikedDogs => {
        const newLikedDogs = { ...prevLikedDogs };
        delete newLikedDogs[id];
        return newLikedDogs;
      });
      setDogs(prevDogs => 
        prevDogs.map(dog => 
          dog.id === id ? { ...dog, likes: dog.likes - 1 } : dog
        )
      );
    } catch (error) {
      console.error('Error unliking dog:', error);
    }
  };

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    console.log('DogFeed mounted');
    return () => {
      console.log('DogFeed unmounted');
    };
  }, []);

  const breakpointColumnsObj = {
    default: 7,
    1200: 6,
    992: 5,
    768: 4,
    576: 3,
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <InfiniteScroll
        dataLength={dogs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more dogs to show!</p>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {dogs.map((dog, index) => (
            <DogPost key={`${dog.id}-${index}`} dog={dog} onLike={handleLike} onUnlike={handleUnlike} liked={likedDogs[dog.id]} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default DogFeed;