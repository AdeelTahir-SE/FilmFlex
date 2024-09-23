import Image from "next/image";
import MovieSlider from "./components/moviesslider";
import WeeklyMovies from "./components/weeklymovies";
import img1 from "@/app/components/image.jpeg"
import img2 from "@/app/components/image2.jpeg"
import Seats from "./components/seats";
export default function Home() {
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

  const weeklyMovies = [
    {
      title: "Weekly Movie 1",
      timing: "Monday 7:00 PM",
      details: "An exciting adventure movie.",
      src: img1,
    },
    {
      title: "Weekly Movie 2",
      timing: "Tuesday 8:00 PM",
      details: "A thrilling mystery movie.",
      src: img2,
    },
    {
      title: "Weekly Movie 3",
      timing: "Wednesday 6:00 PM",
      details: "A heartwarming drama movie.",
      src: img1,
    },
    {
      title: "Weekly Movie 2",
      timing: "Tuesday 8:00 PM",
      details: "A thrilling mystery movie.",
      src: img2,
    },
    {
      title: "Weekly Movie 3",
      timing: "Wednesday 6:00 PM",
      details: "A heartwarming drama movie.",
      src: img1,
    },
    {
      title: "Weekly Movie 4",
      timing: "Thursday 9:00 PM",
      details: "A hilarious comedy movie.",
      src: img2,
    },
    {
      title: "Weekly Movie 5",
      timing: "Friday 7:30 PM",
      details: "An action-packed superhero movie.",
      src: img1,
    },
  ];

  return (
    <div className="flex flex-col bg-black h-full">
      <h1 className="text-4xl font-bold text-red-600 text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Secure Your Movie Seat Today!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-2xl">Latests</h2>
        <MovieSlider movies={movies} />
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-white font-bold text-2xl">Weekly Movies</h2>
        <div className="flex flex-col items-start justify-center space-y-4 mt-4">
        {<WeeklyMovies movies={weeklyMovies}/>}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-14 ">
  <div className="flex justify-center items-center">
    <Seats noofseats={60} cols={4} />
  </div>
  <div className="flex justify-center items-center">
    <Seats noofseats={120} cols={8} />
  </div>
  <div className="flex justify-center items-center">
    <Seats noofseats={60} cols={4} />
  </div>
</div>


    </div>
  );
}
