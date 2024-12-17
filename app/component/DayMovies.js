"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DayMovies({ daysMovies }) {
  const [dayList, setDayList] = useState({});

  // Initialize the dayList when the component is mounted
  useEffect(() => {
    if (Array.isArray(daysMovies)) {
      console.log(daysMovies);
      const days = {};
      daysMovies.forEach((movie) => {
        const day = movie.timing.split(" ")[0]; // Extract the day of the week (e.g., Monday, Tuesday)
        if (!days[day]) {
          days[day] = [];
        }
        days[day].push(movie);
      });
      setDayList(days);
    }
  }, [daysMovies]);

  return (
    <div className="py-8 px-4 flex flex-col items-center justify-center">
      {/* Day List */}
      <div className="space-y-6 w-full">
        {Object.keys(dayList).map((day, index) => (
          <div
            key={index}
            className="bg-gray-950 p-6 rounded-lg shadow-lg border-b-4 border-red-600"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{day}</h2>
            <div className="flex justify-center gap-6">
              {dayList[day].map((movie, movieIndex) => (
                <Link href={`/movies/${movie.title}`} key={movieIndex}>
                  <div className="flex flex-col items-center bg-gray-950 cursor-pointer p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
                    <div
                      className="absolute bottom-44 left-0 text-7xl font-bold p-2"
                      style={{
                        color: "black",
                        textShadow:
                          "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                      }}
                    >
                      {movieIndex + 1}
                    </div>

                    <Image
                      src={movie.src}
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Complete Details of the Week Button */}
      <div className="mt-8">
        <Link href="/weeklymovies/1">
          <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-md shadow-md hover:bg-red-700 transition-colors">
            See Complete Details of the Week
          </button>
        </Link>
      </div>
    </div>
  );
}