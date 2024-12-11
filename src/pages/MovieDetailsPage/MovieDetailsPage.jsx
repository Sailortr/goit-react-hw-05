import React, { useEffect, useState } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./MovieDetailsPage.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate("/")} className="back-button">
        Go Back
      </button>
      <div className="details">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <p className="user-score">User Score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
        </div>
      </div>

      <div className="additional-info">
        <h2>Additional Information</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="cast" state={{ from: backLink }}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={{ from: backLink }}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
