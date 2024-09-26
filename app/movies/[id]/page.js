import Image from "next/image";
import MovieTrailer from "@/app/component/MoiveTrailer"; // Fixed import name
import image from "@/app/component/image.jpeg";
import Seats from "@/app/component/Seats";

const comments = [
  { name: "Alice", comment: "Great movie!", time: "2 hours ago" },
  { name: "Bob", comment: "Loved the trailer!", time: "1 hour ago" },
];

export default function Page() {
  const dummyData = {
    title: "Sample Movie Title",
    description: `
    Here's a detailed description of the story for Spider-Man: No Way Home:
    
    Spider-Man: No Way Home follows Peter Parker (played by Tom Holland) as he grapples with the fallout of his secret identity being exposed to the world. After the revelation, Peter's life takes a drastic turn; he faces the pressures of public scrutiny, as well as the danger it brings to his loved ones.
    
    In a desperate attempt to restore his anonymity and protect Iconic adversaries like Doctor Octopus (Alfred Molina) and the Green Goblin (Willem Dafoe) emerge, bringing chaos and danger. As Peter tries to manage these formidable foes, he also struggles with the moral implications of his actions. He realizes that to truly be Spider-Man, he must embrace responsibility—not just for himself but for the multiverse as well.`,
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-4 text-red-600 text-center">{dummyData.title}</h1>
      
      <div className="mb-6 w-full">
        <MovieTrailer
          trailerlink="https://www.youtube.com/embed/pyKONWsQ1ek?si=Liz_WQBdBV0kkvAj"
          thumbnail={image}
          className="w-full h-auto"
        />
      </div>
      
      <div className="flex items-start mb-6">
        <div className="w-1/3 mr-4"> {/* Adjust width as needed */}
          <Image 
            src={image} 
            alt="Movie Poster" 
            width={200} // Decrease width
            height={300} // Decrease height
            className="rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-grow">
          <p className="mt-4 text-gray-300">{dummyData.description}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500 text-center">Comments</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((element, i) => (
              <div key={i} className="p-4 border border-gray-700 rounded shadow bg-gray-800 hover:bg-gray-700 transition duration-300">
                <h3 className="font-semibold text-red-500">{element.name}</h3>
                <p className="text-gray-300">{element.comment}</p>
                <p className="text-gray-500">{element.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">No comments available.</p>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-red-500 text-center mb-4">Seats Available!</h2>
        <div className="flex flex-row items-center justify-center gap-14 ">
    <Seats noofseats={60} reservedseats={[1,2,3]} premiumseats={[12,1,3,4,6,7,7,8,7,6,,5,4,3,3,,45,5,5,67,83,96,98,46,73,56]} containers={[40,80,40]} cols={[4,8,4]} />
 
</div>
      </div>
    </div>
  );
}
