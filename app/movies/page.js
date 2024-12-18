
import MovieSlider from "@/app/component/moviesslider";
import DayMovies from "@/app/component/DayMovies"; // Updated import for DayMovies
import img1 from "@/app/component/image.jpeg";
import img2 from "@/app/component/image2.jpeg";
import Seats from "@/app/component/Seats";

// Default movie data to be used if fetching fails
const defaultMovies = [
  {
    title: "Default Movie 1",
    timing: "Monday 7:00 PM",
    details: "An exciting adventure movie.",
    src: img1,
  },
  {
    title: "Default Movie 2",
    timing: "Monday 8:00 PM",
    details: "A thrilling mystery movie.",
    src: img2,
  },
  // Add similar default data for other days...
];

// Server-side fetch function
async function fetchMovies() {
  try {
    const res = await fetch("/api/weekMovie"); // Replace with your API endpoint
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await res.json();

    // Group the movies by day of the week
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const groupedMovies = {};
    days.forEach(day => {
      groupedMovies[day] = data.filter(movie => movie.day === day);
    });

    return groupedMovies;
  } catch (error) {
    console.error(error);
    // If fetch fails, return default data for all days
    return {
      Monday: defaultMovies,
      Tuesday: defaultMovies,
      Wednesday: defaultMovies,
      Thursday: defaultMovies,
      Friday: defaultMovies,
    };
  }
}

// React component
export default async function Page() {
  // Fetch data server-side
  const movies = await fetchMovies();

  return (
    <div className="flex flex-col bg-black h-full">
      <h1 className="text-4xl font-bold text-red-600 text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Secure Your Movie Seat Today!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-2xl">Latest</h2>
        <MovieSlider movies={movies.Monday} /> {/* Pass only Monday's movies here */}
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
              <div key={day} className="bg-gray-950 p-6 rounded-lg shadow-glow border-b-4 border-red-600">
                <h2 className="text-2xl font-bold text-white">{day}</h2>
                <DayMovies dayMovies={movies[day]} /> {/* Pass all movies for each day */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
