import Image from "next/image";
import MovieSlider from "@/app/component/moviesslider";
import WeeklyMovies from "@/app/component/WeeklyMovies"
import img1 from "@/app/component/image.jpeg"
import img2 from "@/app/component/image2.jpeg"
import Seats from "@/app/component/Seats";
export default function page() {
  const week1 = [
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
  ]; const week2 = [
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
const week3 = [
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
  ]; const week4 = [
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
const week5 = [
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
  ]; const week6 = [
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
const week7 = [
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
   
      <div className="flex flex-col items-center justify-center bg-black  text-white min-h-screen p-4">
<h1
  className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r py-2 from-red-400 to-red-600 transition-transform transform hover:scale-105"
  style={{
    textShadow: '0 0 30px rgba(255, 0, 0, 1), 0 0 40px rgba(255, 0, 0, 1)',
  }}
>
  Weekly Movies!
</h1>        <p className="text-lg mb-8">Check out our weekly movie schedule below:</p>
  
        <div className="w-full ">
          <div className="space-y-6 text-center">
            <div className="bg-gray-950  rounded-lg shadow-glow border-b-4 border-red-600  ">
              <h2 className="text-2xl font-bold text-white">Week 1</h2>
              <WeeklyMovies movies={week1} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 2</h2>
              <WeeklyMovies movies={week2} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 3</h2>
              <WeeklyMovies movies={week3} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 4</h2>
              <WeeklyMovies movies={week4} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 5</h2>
              <WeeklyMovies movies={week5} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 6</h2>
              <WeeklyMovies movies={week6} />
            </div>
            <div className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
              <h2 className="text-2xl font-bold text-white">Week 7</h2>
              <WeeklyMovies movies={week7} />
            </div>
          </div>
        </div>
      </div>
 


    </div>
  );
}






    
  
