"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WeeklyMovies({ movies }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  return (
    <div className="py-4 flex flex-row ">
      {movieList.map((movie, index) => (
        <div key={index} className="flex flex-col  items-center mb-4 bg-gray-900 m-1">
          <Image 
            src={movie.src} 
            alt={movie.title || `Movie ${index + 1}`} 
            width={100} 
            height={150} 
            className="rounded-lg w-full"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold drop-shadow-2xl text-white">{movie.title}</h3>
            <p className="text-gray-400">{movie.timing}</p>
            <p className="text-gray-400">See details of the day</p>
          </div>
        </div>
      ))}
    </div>
  );
}


