import { FaStar, FaTicketAlt, FaMobileAlt } from "react-icons/fa";

function WhyJoinCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg  shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-br from-gray-800  via-gray-700 to-black">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-extrabold text-red-400 ml-4">{title}</h3>
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
      description: "Watch the best movies rated by critics and audiences.",
    },
    {
      icon: <FaTicketAlt className="text-red-500 text-3xl" />,
      title: "Easy Booking",
      description: "Book your tickets easily and quickly with our user-friendly platform.",
    },
    {
      icon: <FaMobileAlt className="text-red-500 text-3xl" />,
      title: "Mobile App",
      description: "Book tickets on the go with our mobile app available on iOS and Android.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mt-12 ">
      <h2 className="text-white font-bold text-2xl mb-4 text-center">Why Join Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
