import Image from "next/image";
import image1 from "@/app/component/image.jpeg";
import image2 from "@/app/component/image2.jpeg";
import { Button } from "@/components/ui/button";
const movies = [
  {
    image: image1,
    title: "Movie Title 1",
    description:
      "An exciting movie about an adventurous journey across unknown lands. With stunning visuals and a gripping plot, this film keeps you on the edge of your seat as the characters face insurmountable odds. It's a thrilling ride filled with action, suspense, and unforgettable moments.",
    duration: "2h 15m",
    timing: "4:00 PM - 6:00 PM",
  },
  {
    image: image2,
    title: "Movie Title 2",
    description:
      "A thrilling mystery drama that unfolds layer by layer, keeping the audience guessing until the very end. The protagonist must piece together cryptic clues, confront personal demons, and navigate a complex web of intrigue. Each revelation brings the characters closer to the truth in this mind-bending narrative.",
    duration: "1h 45m",
    timing: "5:00 PM - 6:45 PM",
  },
  {
    image: image1,
    title: "Movie Title 3",
    description:
      "A heartwarming romantic story that explores the beauty and complexity of love. Through moments of joy, heartache, and personal growth, the characters learn the true meaning of connection. The film offers a touching portrayal of relationships that feel real and relatable.",
    duration: "2h 5m",
    timing: "6:00 PM - 8:05 PM",
  },
  {
    image: image2,
    title: "Movie Title 4",
    description:
      "This movie takes viewers on a captivating journey through a world of mystery and deception. As secrets are revealed, the stakes get higher, and the characters must make difficult decisions that could change their lives forever. The plot twists and turns in unexpected ways, keeping you engaged till the last frame.",
    duration: "1h 45m",
    timing: "4:30 PM - 6:15 PM",
  },
  {
    image: image1,
    title: "Movie Title 5",
    description:
      "An emotionally charged romantic drama that tugs at the heartstrings. As two individuals from vastly different worlds come together, they discover that love has the power to bridge any divide. Their journey is filled with passion, heartache, and the enduring hope that love will prevail.",
    duration: "2h 5m",
    timing: "7:00 PM - 9:05 PM",
  },
];

function WeekDayMoviesCard({ image, title, description, duration, timing }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b-2 pb-8 mt-4 border-gray-600 bg-gray-800 m-auto mb-6 rounded-3xl w-11/12 md:w-3/4 shadow-lg">
      <Image src={image} alt={title} className="object-cover w-full md:w-1/2 rounded-t-3xl md:rounded-l-3xl md:rounded-t-none" />
      <div className="flex flex-col items-start justify-center p-6 md:p-8 w-full md:w-1/2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-4">{title}</h1>
        <p className="text-sm md:text-base text-gray-300 mb-4">{description}</p>
        <p className="text-sm md:text-base font-bold text-gray-400 mb-2">{duration}</p>
        <p className="text-sm md:text-base font-bold text-gray-400">{timing}</p>
        <Button className="ml-2 mt-2 p-2 text-red-700 hover:bg-gray-500 font-bold">Reserve now!</Button>
      </div>
    </div>
  );
}

export default function WeekDayMovies({ params }) {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
    Monday
      </h1>
      {movies.map((movie, index) => (
        <WeekDayMoviesCard
          key={index}
          image={movie.image}
          title={movie.title}
          description={movie.description}
          duration={movie.duration}
          timing={movie.timing}
        />
      ))}
    </div>
  );
}
