import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieReviews.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p className="error-message">Error: {error}</p>;
  if (!reviews.length) return <p className="no-reviews">No reviews. </p>;

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Reviews</h2>
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <h3 className="review-author">{review.author}</h3>
            <p className="review-content">{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
