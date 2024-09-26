"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
export default function WeeklyMovies({ movies }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  return (
    <div className="py-8 px-4 flex  justify-center ">
      {movieList.map((movie, index) => (
       <Link href={`/movies/${movie.title}`}> <div
          key={index}
          className="flex flex-col items-center bg-gray-950 cursor-pointer p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <div
            className="absolute bottom-44 left-0  text-7xl font-bold p-2 "
            style={{
              color: "black",
              textShadow:
                "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
            }}
          >
            {index + 1}
          </div>

          <Image
            src={movie.src}
            alt={movie.title || `Movie ${index + 1}`}
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
  );
}
