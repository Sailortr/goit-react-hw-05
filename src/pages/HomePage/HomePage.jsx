import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1 className="styles.title">Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
