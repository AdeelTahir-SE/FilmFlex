import React from "react";
import { Button } from "@/components/ui/button";
export default function NotificationCard({
  image,
  time,
  title,
  message,
  onClose,
}) {
  return (
    <div className="mb-4 bg-gradient-to-r from-red-600 via-red-950 via bg-black to-black flex flex-row items-center justify-center">
      <img src={image} className="w-36 h-36 =object-cover" />
      <div className="flex flex-col gap-2 mx-7">
        <h1 className="text-2xl text-white">{title}</h1>
        <p className="text-white">{message}</p>
      </div>
      <div>
        <p className="text-white">{time}</p>

        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
