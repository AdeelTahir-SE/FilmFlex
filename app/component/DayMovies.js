"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DayMovies({ dayMovies }) {
  const [dayList, setDayList] = useState([]);

  // Group movies by day when dayMovies is passed
  useEffect(() => {
    if (Array.isArray(dayMovies)) {
      console.log("Fetched dayMovies:", dayMovies);
      console.log("Grouping movies by day...");
      setDayList(dayMovies); // Set the dayMovies directly for rendering
    }
  }, [dayMovies]);

  return (
    <div className="py-8 px-4 flex flex-col items-center justify-center">
      {/* Day List */}
      <div className="space-y-6 w-full">
        <div className="bg-gray-950 p-6 rounded-lg shadow-lg border-b-4 border-red-600">
          {/* Render Movies for the Day */}
          <div className="flex justify-center gap-6">
            {dayList.map((movie, movieIndex) => (
              <Link href={`/movies/${movie.movieId}/${movie.day}/${encodeURIComponent(movie.timing)}`} key={movieIndex}>
                <div className="flex flex-col items-center bg-gray-950 cursor-pointer p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <div
                    className="absolute bottom-56 left-14 text-7xl font-bold p-2"
                    style={{
                      color: "black",
                      textShadow:
                        "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                    }}
                  >
                    {movieIndex + 1}
                  </div>

                  <Image
                    src={movie.movieImage}
                    alt={movie.title || `Movie ${movieIndex + 1}`}
                    width={200}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 mb-2">{movie.timing}</p>
                    <p className="text-red-500 cursor-pointer hover:underline">
                      See details of the day
                    </p>

                    {/* Showing additional details */}
                    <p className="text-gray-300 mb-1">{movie.description}</p>
                    <p className="text-gray-500 mb-1">Duration: {movie.duration} minutes</p>
                    <p className="text-red-400 mb-2">Price: {movie.price}</p>
                    <p className="text-yellow-500">Discount Day: {movie.day}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Details of the Week Button */}
      {/* <div className="mt-8">
        <Link href={`/weeklymovies/${encodeURIComponent(dayMovies[0]?.day || 'default')}`}>
          <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-md shadow-md hover:bg-red-700 transition-colors">
            See Complete Details of the Week
          </button>
        </Link>
      </div> */}
    </div>
  );
}
