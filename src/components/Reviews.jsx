import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../services/themoviedbapi';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="mb-4">
            <h2 className="text-lg font-semibold">{review.author}</h2>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
