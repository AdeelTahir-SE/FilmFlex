"use client";
import MovieSlider from "@/app/component/moviesslider";
import DayMovies from "@/app/component/DayMovies"; // Updated import for DayMovies
import { useState, useEffect } from "react";

// // Default movie data to be used if fetching fails
// const defaultMovies = [
//   {
//     title: "Default Movie 1",
//     timing: "Monday 7:00 PM",
//     description: "An exciting adventure movie.",
//     duration: "120 minutes",
//     price: "15.00",
//     movieImage: img1,
//     day: "Monday",
//   },
//   {
//     title: "Default Movie 2",
//     timing: "Monday 8:00 PM",
//     description: "A thrilling mystery movie.",
//     duration: "130 minutes",
//     price: "12.00",
//     movieImage: img2,
//     day: "Monday",
//   },
//   // Add similar default data for other days...
// ];

// React component
export default function Page() {
  const [movies, setMovies] = useState({});

  // Fetch movies from API or use default data if fetching fails
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/weekMovies"); // Replace with your API endpoint
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();

        // Group the movies by day of the week
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const groupedMovies = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        };

        // Group movies by day
        data.movies.forEach((movie) => {
          if (groupedMovies[movie.day]) {
            groupedMovies[movie.day].push({
              movieId: movie.movieId,
              title: movie.name,
              timing: `${movie.timings.substring(0, 5)} ${movie.timings.substring(6)}`, // Format time to show AM/PM
              description: movie.description,
              duration: `${movie.duration} minutes`,
              price: movie.price,
              movieImage: movie.imageUrl,
              day: movie.day,
            });
          }
        });

        setMovies(groupedMovies);
      } catch (error) {
        console.error(error);
        // If fetch fails, return default data for all days
        setMovies();
      }
    };

    fetchMovies(); // Call the async fetch function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Combine all movies for the week and pass to MovieSlider
  const allMovies = Object.values(movies).flat();

  return (
    <div className="flex flex-col bg-black h-full">
      <h1 className="text-4xl font-bold text-red-600 text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Secure Your Movie Seat Today!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-2xl">Latest</h2>
        {/* Pass all movies to the MovieSlider */}
        <MovieSlider movies={allMovies} />
      </div>

      <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen p-4">
        <h1
          className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r py-2 from-red-400 to-red-600 transition-transform transform hover:scale-105"
          style={{
            textShadow:
              "0 0 30px rgba(255, 0, 0, 1), 0 0 40px rgba(255, 0, 0, 1)",
          }}
        >
          Weekly Movies!
        </h1>
        <p className="text-lg mb-8">Check out our weekly movie schedule below:</p>

        <div className="w-full">
          <div className="space-y-6 text-center">
            {Object.keys(movies).map((day) => (
              <div
                key={day}
                className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600"
              >
                              <h1 className="
                              text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 transition-transform transform hover:scale-105
                              ">{day}</h1>

                <DayMovies dayMovies={movies[day]} /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
