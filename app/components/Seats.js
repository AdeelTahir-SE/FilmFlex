"use client";
import { useState, useEffect } from "react";

export default function Seats({ noofseats, cols }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const seatElements = [];
    for (let i = 1; i <= noofseats; i++) {
      seatElements.push(
        <span
          key={i}
          className="rounded-full border-white hover:text-gray-500 hover:cursor-pointer hover:border-gray-500 border-2 text-2xl flex items-center justify-center w-12 h-12"
        >
          {i}
        </span>
      );
    }
    setSeats(seatElements);
  }, [noofseats]);

  return (
    <div
      className={`seats grid gap-3 text-white`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {seats}
    </div>
  );
}
