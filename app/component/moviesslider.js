"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MovieSlider({ movies }) {
  const [movieList, setMovieList] = useState([]);


  useEffect(() => {
    // Duplicate the movie list to create an infinite loop effect
    setMovieList([...movies, ...movies]);
  }, [movies]);

  return (
    <div className="relative overflow-hidden w-full" >
      <div className="flex animate-animatescroll hover:animate-paused whitespace-nowrap">
        {movieList.map((movie, index) => (
          <Link href="/" key={index}>
            <div className="inline-block m-2" >
              <Image
                src={movie.src}
                alt={movie.title || `Movie ${index + 1}`}
                width={200}
                height={300}
                className="rounded-lg min-w-52  hover:scale-110"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
