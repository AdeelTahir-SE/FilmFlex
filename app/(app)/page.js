"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import WhyJoin from "../component/WhyJoin";
import Link from "next/link";
import useInViewAnimation from "@/app/component/useInView";
import { Spotlight } from "../component/ui/Spotlight";
import { useEffect, useState } from "react";

function Customers({ comment, name, avatar, rating, date }) {
  const [ref, hasBeenInView] = useInViewAnimation({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-gray-800 via-gray-950 to-black p-6 hover:scale-125 rounded-lg hover:cursor-pointer shadow-lg transform transition-transform ${
        hasBeenInView ? "scale-95 opacity-100" : "scale-75 opacity-0"
      }`}
    >
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="text-red-500 text-xl font-semibold">{name}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "text-yellow-500" : "text-gray-500"}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-lg italic mb-4">"{comment}"</p>
      <p className="text-gray-500 text-sm">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [ref, hasBeenInView] = useInViewAnimation({ triggerOnce: true });

  useEffect(() => {
    async function fetchTrendingMovies() {
      const response = await fetch(`/api/trendingMovies`);
      const parsedResult = await response.json();
      if (response.ok) {
        setTrendingMovies(parsedResult.trendingMovies);
      }
    }

    async function fetchReviews() {
      const response = await fetch(`/api/reviews/`);
      const parsedResult = await response.json();
      if (response.ok ) {
        setReviews(parsedResult.reviews);
      }
    }

    fetchTrendingMovies();
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col bg-black min-h-screen">
      <header
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-vector/cinema-hall-white-blank-screen-600nw-2469487367.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-50 to-slate-700">
            Welcome to Film Flex
          </h1>
          <p className="text-2xl mb-8">
            Book your movie tickets easily and quickly
          </p>
          <Link href="/movies">
            <span className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Book Now
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-4 py-8">
        <section
          ref={ref}
          className={`w-full max-w-6xl mt-8 text-center transition-opacity duration-1000 ${
            hasBeenInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="font-bold text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-50 to-slate-700">
            Trending Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMovies.map((movie,index) => (
              <div
                key={movie.movieId}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-gray-700"
              >
                <div className="relative">
                  <Image
                    src={movie.movieImage}
                    alt={movie.movieName}
                    width={300}
                    height={450}
                    className="rounded-lg mb-4"
                  />
                  <div
                    className="absolute bottom-1 left-0 text-9xl font-bold p-2"
                    style={{
                      color: "black",
                      textShadow:
                        "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-2">
                  {movie.movieName}
                </h3>
                <p className="text-gray-300 mb-4">{movie.genres}</p>
                <p className="text-gray-300 mb-4">Rating: {movie.movieRatings}</p>
                <p className="text-gray-300 mb-4">Average Rating: {movie.averageRating}</p>
                <Link href={`/movies/${movie.movieId}`}>
                  <span className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Watch Now
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <WhyJoin />

        <section className="w-full max-w-6xl mt-12 text-center">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-50 to-slate-700 font-bold text-4xl mb-4">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length > 0
              ? reviews.map((review) => (
                  <Customers
                    key={review.userId}
                    comment={review.userComment}
                    name={review.userName}
                    avatar={review.userAvatar}
                    rating={review.userRating}
                    date={review.reviewDate}
                  />
                ))
              : null}
          </div>
        </section>
      </main>
    </div>
  );
}
