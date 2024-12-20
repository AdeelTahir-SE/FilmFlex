"use client";
import Link from "next/link";
import NotificationCard from "../component/NotificationCard";
import { useEffect, useState } from "react";

export default function page() {
  const [Notifications, setNotifications] = useState([]);
  const [isNotifications, setIsNotifications] = useState(false);
  // const notifications = [
  //   {
  //     image: img1,
  //     title: "New Movie Released",
  //     message: "A new movie has been released. Watch it now.",
  //     time: "2 hours ago",
  //   },
  //   {
  //     image: img2,
  //     title: "New Movie Released",
  //     message: "A new movie has been released. Watch it now.",
  //     time: "3 hours ago",
  //   },
  //   {
  //     image: img1,
  //     title: "New Movie Released",
  //     message: "A new movie has been released. Watch it now.",
  //     time: "4 hours ago",
  //   },
  //   {
  //     image: img2,
  //     title: "New Movie Released",
  //     message: "A new movie has been released. Watch it now.",
  //     time: "5 hours ago",
  //   },
  // ];

  async function fetchNotifications() {
    const response = await fetch(`/api/notifications/`);
    const parsedResult = response.json();
    if (response.ok && parsedResult?.notificationslength > 0) {
      setNotifications(parsedResult);
      setIsNotifications(true);
    } else {
      setIsNotifications(false);
    }
  }



  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="bg-black h-full">
    {isNotifications ?  (
      <section>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-700 to-white text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Notifications
      </h1>
       
        <div className="flex flex-col gap-4 mt-4 px-72">
          {Notifications &&
            Notifications.map((element) => {
              return (
                <NotificationCard
                  id={element.notificationId}
                  image={element.image}
                  title={element.title}
                  message={element.message}
                  time={element.time}
                  onClose={() => console.log("Closed")}
                />
              );
            })}
        </div>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h1
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-600 to-white text-center py-8 px-10 rounded-lg shadow-lg animate-pulse"
          style={{
            textShadow: "0 0 40px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6)",
          }}
        >
          No Notifications
        </h1>
        <h2 className="text-3xl text-red-500 font-bold text-center mt-6 animate-glow">
          By the way...
        </h2>
        <p
          className="text-2xl text-gray-300 text-center mt-12 max-w-3xl leading-relaxed"
          style={{
            textShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
          }}
        >
          Why not check out our latest movies? We've got an amazing lineup waiting
          just for you!
        </p>
        <Link href="/movies" className="flex justify-center mt-16">
          <button
            className="bg-red-600 text-3xl font-bold text-white rounded-full shadow-lg px-12 py-6 hover:bg-red-700 hover:scale-110 transition-transform transform ease-out duration-300"
            style={{
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.6)",
            }}
          >
            See Now!
          </button>
        </Link>
      </section>
      
      )}
    </div>
  );
}
