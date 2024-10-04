import { FaStar, FaTicketAlt, FaMobileAlt, FaUsers, FaFilm, FaHeadset } from "react-icons/fa";
import useInViewAnimation from "./useInView";
import { Meteors } from "./ui/meteors";
function WhyJoinCard({ icon, title, description }) {
  const [ref, hasBeenInView] = useInViewAnimation({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-br from-gray-800 via-red-950 to-black ${
        hasBeenInView ? 'scale-95 opacity-100' : 'scale-75 opacity-0'
      } overflow-hidden`} // Add overflow-hidden to prevent meteors from going out of bounds
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-extrabold text-white ml-4">{title}</h3>
      </div>
      <div>
        <Meteors number={20} />
      </div>
      <p className="text-gray-300 font-sans font-bold">{description}</p>
    </div>
  );
}


export default function WhyJoin() {
  
  const reasons = [
    {
      icon: <FaStar className="text-yellow-500 text-3xl" />,
      title: "Top Rated Movies",
      description: "Watch the best movies rated by critics and audiences. Our platform offers a curated selection of top-rated films, ensuring you always have access to the highest quality entertainment.",
    },
    {
      icon: <FaTicketAlt className="text-white text-3xl" />,
      title: "Easy Booking",
      description: "Book your tickets easily and quickly with our user-friendly platform. Our streamlined booking process ensures you can secure your seats in just a few clicks, saving you time and effort.",
    },
    {
      icon: <FaMobileAlt className="text-white text-3xl" />,
      title: "Mobile App",
      description: "Book tickets on the go with our mobile app available on iOS and Android. Our app provides a seamless experience, allowing you to browse movies, check showtimes, and book tickets from anywhere.",
    },
    {
      icon: <FaUsers className="text-white text-3xl" />,
      title: "Community Reviews",
      description: "Read reviews from our community of movie enthusiasts. Our platform features a vibrant community where users can share their thoughts and opinions on the latest releases, helping you make informed decisions.",
    },
    {
      icon: <FaFilm className="text-white text-3xl" />,
      title: "Exclusive Content",
      description: "Get access to exclusive content and behind-the-scenes footage. Our platform offers special features and interviews with filmmakers, giving you an insider's look at the movie industry.",
    },
    {
      icon: <FaHeadset className="text-white text-3xl" />,
      title: "24/7 Support",
      description: "Enjoy 24/7 customer support for all your queries and issues. Our dedicated support team is always available to assist you, ensuring a smooth and hassle-free experience.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mt-12 hover:cursor-pointer">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-50 to-slate-700 font-bold text-4xl mb-4 text-center">Why Join Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <WhyJoinCard
            key={index}
            icon={reason.icon}
            title={reason.title}
            description={reason.description}
          />

        ))}
          </div>
    </section>
  );
}
