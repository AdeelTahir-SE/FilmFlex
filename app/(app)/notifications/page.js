"use client"
import React, { useEffect, useState } from "react";
import NotificationCard from "../../component/NotificationCard";

export default function page() {
  const [Notifications, setNotifications] = useState([]);
  const [isNotifications, setIsNotifications] = useState(false);

  // Function to fetch notifications
  async function fetchNotifications() {
    const response = await fetch(`/api/notifications/`);
    const parsedResult = await response.json();
    if (response.ok) {
      setNotifications(parsedResult.notifications[0]);
      setIsNotifications(true);
    } else {
      setIsNotifications(false);
    }
  }

  // Handle notification deletion
  const handleDeleteNotification = (id) => {
    // Filter out the deleted notification from the array
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.notificationId !== id)
    );
    console.log(Notifications)
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="bg-black h-full">
      {(isNotifications&&Notifications.length>0) ? (
        <section>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-700 to-white text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
            Notifications
          </h1>

          <div className="flex flex-col gap-4 mt-4 px-72">
            {Notifications &&
              Notifications.map((element) => {
                return (
                  <NotificationCard
                    key={element.notificationId} // Add a unique key for each card
                    id={element.notificationId}
                    image={element.image}
                    title={element.title}
                    message={element.message}
                    time={element.time}
                    onDelete={handleDeleteNotification} // Pass delete handler as a prop
                  />
                );
              })}
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center min-h-screen bg-black">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-600 to-white text-center py-8 px-10 rounded-lg shadow-lg animate-pulse">
            No Notifications
          </h1>
          <h2 className="text-3xl text-red-500 font-bold text-center mt-6 animate-glow">
            By the way...
          </h2>
          <p className="text-2xl text-gray-300 text-center mt-12 max-w-3xl leading-relaxed">
            Why not check out our latest movies? We've got an amazing lineup waiting
            just for you!
          </p>
        </section>
      )}
    </div>
  );
}
