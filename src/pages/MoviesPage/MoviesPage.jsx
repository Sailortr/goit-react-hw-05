import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.query.value.trim();
    setSearchParams(newQuery ? { query: newQuery } : {});
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies - page - container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="query"
          className="search-input"
          placeholder="Search movies..."
          defaultValue={query}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
