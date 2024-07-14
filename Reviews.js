import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.review_id}>{review.review_text} (Rating: {review.rating})</li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
