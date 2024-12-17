import Image from "next/image";
import MovieSlider from "@/app/component/moviesslider";
import DayMovies from "@/app/component/DayMovies"; // Updated import for DayMovies
import img1 from "@/app/component/image.jpeg";
import img2 from "@/app/component/image2.jpeg";
import Seats from "@/app/component/Seats";

// Server-side fetch function
async function fetchMovies() {
  // Simulating a fetch request to a backend or external API
  const res = await fetch("/api/weekMovie"); // Replace with your API endpoint
  const data = await res.json();
  
  // Assuming the data returned is already structured in a way you need
  const monday = data.filter((movie) => movie.day === "Monday");
  const tuesday = data.filter((movie) => movie.day === "Tuesday");
  const wednesday = data.filter((movie) => movie.day === "Wednesday");
  const thursday = data.filter((movie) => movie.day === "Thursday");
  const friday = data.filter((movie) => movie.day === "Friday");

  return { monday, tuesday, wednesday, thursday, friday };
}

// React component
export default async function Page() {
  // Fetch data server-side
  const { monday, tuesday, wednesday, thursday, friday } = await fetchMovies();

  const movies = [
    {
      src: img1,
      title: "Movie 1",
    },
    {
      src: img2,
      title: "Movie 2",
    },
    {
      src: img1,
      title: "Movie 3",
    },
    {
      src: img2,
      title: "Movie 4",
    },
    {
      src: img1,
      title: "Movie 5",
    },
    {
      src: img2,
      title: "Movie 6",
    },
    {
      src: img1,
      title: "Movie 7",
    },
    {
      src: img2,
      title: "Movie 8",
    },
    {
      src: img1,
      title: "Movie 9",
    },
    {
      src: img2,
      title: "Movie 10",
    },
  ];

  return (
    <div className="flex flex-col bg-black h-full">
      <h1 className="text-4xl font-bold text-red-600 text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Secure Your Movie Seat Today!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-2xl">Latest</h2>
        <MovieSlider movies={movies} />
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
            <div className="bg-gray-950 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Monday</h2>
              <DayMovies dayMovies={monday} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Tuesday</h2>
              <DayMovies dayMovies={tuesday} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Wednesday</h2>
              <DayMovies dayMovies={wednesday} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Thursday</h2>
              <DayMovies dayMovies={thursday} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Friday</h2>
              <DayMovies dayMovies={friday} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
