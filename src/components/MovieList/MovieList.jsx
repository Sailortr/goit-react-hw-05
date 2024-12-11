import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <li key={movie.id} className="item">
          <Link to={`/movies/${movie.id}`} className="link">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/150x225"
              }
              alt={movie.title}
              className="poster"
            />
            <p className="title">{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
