import React, { useState } from 'react';
import axios from 'axios';
import CustomerDashboard from './CustomerDashboard';

const PostReview = () => {
  const [review, setReview] = useState({
    user_id: '',
    vehicle_id: '',
    station_id: '',
    rating: '',
    review_text: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', review);
      alert('Review submitted successfully!');
      setReview({
        user_id: '',
        vehicle_id: '',
        station_id: '',
        rating: '',
        review_text: ''
      });
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <div>
      <CustomerDashboard />
      <h2>Post Review</h2>
      <form onSubmit={handleSubmitReview}>
        <input type="number" name="user_id" placeholder="User ID" value={review.user_id} onChange={handleInputChange} />
        <input type="number" name="vehicle_id" placeholder="Vehicle ID" value={review.vehicle_id} onChange={handleInputChange} />
        <input type="number" name="station_id" placeholder="Station ID" value={review.station_id} onChange={handleInputChange} />
        <input type="number" name="rating" placeholder="Rating (1-5)" value={review.rating} onChange={handleInputChange} />
        <textarea name="review_text" placeholder="Review Text" value={review.review_text} onChange={handleInputChange} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PostReview;
