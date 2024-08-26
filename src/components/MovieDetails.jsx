import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../services/themoviedbapi';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w500';
const PROFILE_SIZE = 'w200';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const showCast = location.pathname.includes('cast');
  const showReviews = location.pathname.includes('reviews');

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      const creditsData = await fetchMovieCredits(movieId);
      const reviewsData = await fetchMovieReviews(movieId);

      setMovie(movieData);
      setCast(creditsData.cast);
      setReviews(reviewsData.results);
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const handleViewCast = () => navigate(`/movies/${movieId}/cast`);
  const handleViewReviews = () => navigate(`/movies/${movieId}/reviews`);
  const handleHideDetails = () => navigate(`/movies/${movieId}`);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to="/" className="inline-block text-blue-500 bg-white border border-blue-500 rounded-lg px-4 py-2 text-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors">
          Back to Home
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-4 relative">
          <img
            src={movie.poster_path ? `${MOVIE_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={movie.title}
            className="w-full h-auto object-cover rounded"
            loading="lazy"
            style={{ aspectRatio: '2/3' }}
          />
        </div>
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>
          <div className="flex space-x-4 mb-4">
            {!showCast && !showReviews && (
              <>
                <button
                  onClick={handleViewCast}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  View Cast
                </button>
                <button
                  onClick={handleViewReviews}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  View Reviews
                </button>
              </>
            )}
            {(showCast || showReviews) && (
              <button
                onClick={handleHideDetails}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Hide Details
              </button>
            )}
          </div>
          {showCast && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Cast</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {cast.map((member) => (
                  <div
                    key={member.cast_id}
                    className="bg-white p-4 rounded shadow flex flex-col items-center"
                    style={{ height: '400px' }}
                  >
                    <div className="relative w-40 h-60">
                      <img
                        src={member.profile_path ? `${MOVIE_IMAGE_BASE_URL}${PROFILE_SIZE}${member.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                        alt={member.name}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
                        style={{ aspectRatio: '2/3' }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">as {member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showReviews && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Reviews</h2>
              <div>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded shadow mb-4">
                      <h3 className="text-lg font-semibold">{review.author}</h3>
                      <p className="text-sm text-gray-600">{review.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
