"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import MovieTrailer from "@/app/component/MoiveTrailer";
import Seats from "@/app/component/Seats"; // Ensure this component handles day and time as props

export default function Page() {
  const { id, day, timings } = useParams(); // Extracting day and timings from params
  let decodedTimings = decodeURIComponent(timings); // Decode timings to handle spaces correctly

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch movie data (API call)
  const fetchMovieData = async (movieId, day, timings) => {
    try {
      const response = await fetch(`/api/movie/${movieId}/${day}/${timings}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch movie data");
      setMovieData(data.movie);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch movie reviews (API call)
  const fetchMovieReviews = async (movieId) => {
    try {
      const response = await fetch(`/api/movie/${movieId}/reviews`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch movie reviews");
      setComments(data.reviews);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add a new review (API call)
  const addMovieReview = async (movieId, review) => {
    try {
      const response = await fetch(`/api/movie/${movieId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add movie review");
      setComments((prev) => [review, ...prev]);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle review submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && newRating > 0) {
      const review = {
        name: "You", // Set the name to "You"
        comment: newComment,
        rating: newRating,
      };
      addMovieReview(id, review); // Add the review
      setNewComment(""); // Reset comment input
      setNewRating(0); // Reset rating input
    } else {
      alert("Please enter a valid comment and rating.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieData(id, day, decodedTimings); // Pass the decoded timings
      fetchMovieReviews(id);
    }
  }, [id, day, decodedTimings]); // Trigger re-fetch when id, day, or timings change

  if (isLoading) {
    return (
      <div className="p-6 bg-black text-white min-h-screen flex items-center justify-center">
        <span>Loading movie data...</span>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="p-6 bg-black text-white min-h-screen flex items-center justify-center">
        <span>Movie data not found!</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-4 text-red-600 text-center">
        {movieData.name}
      </h1>
      <div className="mb-6 w-full">
        <MovieTrailer
          trailerlink={
            movieData.trailer || "https://www.youtube.com/embed/pyKONWsQ1ek?si=Liz_WQBdBV0kkvAj"
          }
          thumbnail={movieData.imageUrl}
          className="w-full h-auto"
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="w-1/3 mr-4">
          <Image
            src={movieData.imageUrl}
            alt="Movie Poster"
            width={200}
            height={300}
            className="rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-grow">
          <p className="mt-4 text-gray-300">{movieData.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500 text-center">Reviews</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((review, i) => (
              <div
                key={i}
                className="p-4 border border-gray-700 rounded shadow bg-gray-800 hover:bg-gray-700 transition duration-300"
              >
                <h3 className="font-semibold text-red-500">{review.name}</h3>
                <p className="text-gray-300">{review.comment}</p>
                <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">No reviews available.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-red-500 text-center mb-4">Add a Review</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Your Comment</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-300 rounded"
              placeholder="Enter your comment"
            />
          </div>
          <div>
            <label className="block text-gray-300">Rating (1-5)</label>
            <input
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(Math.min(5, Math.max(1, e.target.value)))}
              className="w-full p-2 bg-gray-700 text-gray-300 rounded"
              min="1"
              max="5"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-red-500 text-center mb-4">Seat Layout</h2>
        {/* Pass day, time, and movieId to the Seats component */}
        <Seats movieId={id} day={day} time={decodedTimings} />
      </div>
    </div>
  );
}
