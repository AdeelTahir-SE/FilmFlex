import Image from "next/image";
import img1 from "@/app/component/image.jpeg";
import img2 from "@/app/component/image2.jpeg";
import { FaStar } from "react-icons/fa";
import WhyJoin from "./component/WhyJoin";

function Customers({ comment, name, avatar, rating, date }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-black p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-fadeIn">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="text-red-500 text-xl font-semibold">{name}</p>
          <div className="flex">
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                className={index < rating ? "text-yellow-500" : "text-gray-500"}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-lg italic mb-4">"{comment}"</p>
      <p className="text-gray-500 text-sm">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default function Home() {
  const trendingMovies = [
    { src: img1, title: "Trending Movie 1", description: "An exciting adventure movie." },
    { src: img2, title: "Trending Movie 2", description: "A thrilling mystery movie." },
    { src: img1, title: "Trending Movie 3", description: "A heartwarming drama movie." },
    { src: img2, title: "Trending Movie 4", description: "A hilarious comedy movie." },
    { src: img1, title: "Trending Movie 5", description: "An action-packed superhero movie." },
  ];

  return (
    <div className="flex flex-col bg-black min-h-screen">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(https://www.shutterstock.com/image-vector/cinema-hall-white-blank-screen-600nw-2469487367.jpg)` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Film Flex</h1>
          <p className="text-2xl mb-8">
            Book your movie tickets easily and quickly
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </header>

      {/* Trending Movies Section */}
      <main className="flex flex-col items-center justify-center px-4 py-8">
        <section className="w-full max-w-6xl mt-8">
          <h2 className="text-white font-bold text-2xl mb-4">Trending Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMovies.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-gray-700"
              >
                <div className="relative">
                  <Image
                    src={movie.src}
                    alt={movie.title}
                    className="rounded-lg mb-4"
                  />
                  <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-300 mb-4">{movie.description}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Watch Now
                </button>
              </div>
            ))}
          </div>
        </section>

        <WhyJoin />

        <section className="w-full max-w-6xl mt-12">
          <h2 className="text-white font-bold text-2xl mb-4">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Customers
              comment="This is an amazing service!"
              name="John Doe"
              avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4oLLQanJaw4t11-7KzAAFJG4sbQj53qGemg&s"
              rating={4}
              date="2024-09-24T12:34:56Z"
            />
            <Customers
              comment="This is an amazing service!"
              name="John Doe"
              avatar="https://example.com/avatar.jpg"
              rating={4}
              date="2024-09-24T12:34:56Z"
            />
            <Customers
              comment="This is an amazing service!"
              name="John Doe"
              avatar="https://example.com/avatar.jpg"
              rating={4}
              date="2024-09-24T12:34:56Z"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
