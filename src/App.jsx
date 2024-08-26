import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Movies = lazy(() => import('./components/Movies'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/movies/:movieId/cast" element={<MovieDetails />} />
        <Route path="/movies/:movieId/reviews" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  </Router>
);


export default App;
