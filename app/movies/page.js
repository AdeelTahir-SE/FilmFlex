import Image from "next/image";
import MovieTrailer from "../component/MovieTrailer"; // Fixed import name
import image from "@/app/component/image.jpeg";
import Seats from "../component/Seats";

const comments = [
  { name: "Alice", comment: "Great movie!", time: "2 hours ago" },
  { name: "Bob", comment: "Loved the trailer!", time: "1 hour ago" },
];

export default function page() {
  const dummyData = {
    title: "Sample Movie Title",
    description: "This is a sample description for the movie. It provides an overview of the plot and main themes.",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{dummyData.title}</h1>
      <div className="mb-6">
        <MovieTrailer
          trailerlink="https://www.youtube.com/embed/pyKONWsQ1ek?si=Liz_WQBdBV0kkvAj"
          thumbnail={image}
        />
      </div>
      <div className="mb-6">
        <Image 
          src={image} 
          alt="Movie Poster" 
          width={300} // Specify width
          height={450} // Specify height
          className="rounded-lg"
        />
        <p className="mt-4 text-gray-700">{dummyData.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Comments</h2>
        {comments.length > 0 ? (
          comments.map((element, i) => (
            <div key={i} className="mb-4 p-4 border rounded shadow">
              <h3 className="font-semibold">{element.name}</h3>
              <p>{element.comment}</p>
              <p className="text-gray-500">{element.time}</p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold">Seats Available!</h2>
        <Seats cols={4} noofseats={60} />
      </div>
    </div>
  );
}
