const API_KEY = '45c6f069867dd5e18f5fb19180b28c01';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.json();
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.json();
};

export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.json();
};

export const fetchMovieReviews = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return response.json();
};