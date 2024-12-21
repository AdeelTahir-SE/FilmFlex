"use client";
import { useState } from "react";
import Image from "next/image";
const MovieTrailer = ({ trailerlink, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      {" "}
      {/* 16:9 Aspect Ratio */}
      {isPlaying ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={trailerlink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <div
          onClick={handlePlay}
          className="cursor-pointer absolute top-0 left-0 w-full h-full"
        >
          {/* Movie Thumbnail */}
          <Image
         width={800}
         height={450}
            className="w-full h-full object-cover"
            src={thumbnail}
            alt="Movie Thumbnail"
          />
          {/* Play Button (Overlay) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-6xl shadow-lg">▶</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailer;
