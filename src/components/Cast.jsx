import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieCredits } from '../services/themoviedbapi';

const CAST_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const data = await fetchMovieCredits(movieId);
      setCast(data.cast);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to={`/movies/${movieId}`} className="text-blue-500">Back to Movie Details</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Cast</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cast.map((member) => (
          <div key={member.cast_id} className="bg-white p-4 rounded shadow">
            <img
              src={member.profile_path ? `${CAST_IMAGE_BASE_URL}${member.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
              alt={member.name}
              className="w-full h-auto mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{member.name}</h2>
            <p className="text-sm text-gray-600">as {member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
