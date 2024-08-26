import React, { useState } from 'react';
import { searchMovies } from '../services/themoviedbapi';
import { Link } from 'react-router-dom';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      const data = await searchMovies(query);
      setMovies(data.results);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded shadow">
              <img
                src={movie.poster_path ? `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                alt={movie.title}
                className="w-full h-auto mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <Link to={`/movies/${movie.id}`} className="text-blue-500">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
