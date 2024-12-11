import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieCast.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p className="error-message">Error: {error}</p>;
  if (!cast.length) return <p className="no-cast">No cast information.</p>;

  return (
    <div className="cast-container">
      {cast.map((actor) => (
        <div key={actor.id} className="cast-item">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/80x120"
            }
            alt={actor.name}
            className="cast-image"
          />
          <p className="cast-name">{actor.name}</p>
          <p className="cast-character">as {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCast;
