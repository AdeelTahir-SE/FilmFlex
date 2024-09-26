"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGem, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing the icons

export default function Seats({ noofseats, premiumseats, reservedseats, containers, cols }) {
  const [seats, setSeats] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [selectedSeat, setSelectedSeat] = useState(null); // State to hold selected seat number
  const [dialogType, setDialogType] = useState(""); // State to hold the type of dialog

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

  const handleSeatClick = (seatNumber, type) => {
    setSelectedSeat(seatNumber);
    setDialogType(type);
    setIsDialogOpen(true); // Open the dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex flex-row items-center justify-center gap-14">
      {/* Loop through each container */}
      {containers &&
        containers.map((container, containerIndex) => {
          let seatStartIndex =
            containers.slice(0, containerIndex).reduce((acc, cur) => acc + cur, 0) + 1; // Calculate the starting seat number for this container

          // Get the number of columns for the current container
          const columnsForContainer = cols[containerIndex];

          return (
            <div
              key={containerIndex}
              className="seats grid gap-3 text-white"
              style={{
                gridTemplateColumns: `repeat(${columnsForContainer}, minmax(0, 1fr))`, // Use the corresponding cols value for grid columns
              }}
            >
              {/* Render seats for the current container */}
              {Array.from({ length: container }).map((_, seatIndex) => {
                const seatNumber = seatStartIndex + seatIndex; // Calculate seat number

                if (premiumseats.includes(seatNumber)) {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "premium")} // Handle click for premium seats
                      className="rounded-full border-red-500 border-2 text-2xl flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-950 via-red-700 to-red-600-500"
                    >
                      {seatNumber}
                    </span>
                  );
                } else if (reservedseats.includes(seatNumber)) {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "reserved")} // Handle click for reserved seats
                      className="rounded-full border-gray-500 border-2 text-2xl flex items-center justify-center w-12 h-12 bg-gray-500"
                    >
                      {seatNumber}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "available")} // Handle click for available seats
                      className="rounded-full border-white hover:text-gray-500 hover:cursor-pointer hover:border-gray-500 border-2 text-2xl flex items-center justify-center w-12 h-12"
                    >
                      {seatNumber}
                    </span>
                  );
                }
              })}
            </div>
          );
        })}

      {/* Dialog Component for Seat Alerts */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogTrigger />
        <DialogContent className="bg-black p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-white">
              {dialogType === "premium" && <FaGem className="text-red-500 mr-2" />}
              {dialogType === "premium" && "Premium Seat Selected"}
              {dialogType === "reserved" && <FaTimesCircle className="text-red-500 mr-2" />}
              {dialogType === "reserved" && "Reserved Seat"}
              {dialogType === "available" && <FaCheckCircle className="text-red-500 mr-2" />}
              {dialogType === "available" && "Available Seat"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {dialogType === "premium" && `You selected seat number ${selectedSeat}. This is a premium seat and cannot be reserved. Premium seats can only be purchased.`}
              {dialogType === "reserved" && `You selected seat number ${selectedSeat}. This seat is already reserved.`}
              {dialogType === "available" && `You selected seat number ${selectedSeat}. This seat is available for reservation.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <button
              onClick={closeDialog}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            {dialogType === "premium" && (
              <button
                onClick={() => alert('Purchase functionality not implemented yet')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Purchase
              </button>
            )}
            {dialogType === "available" && (
              <button
                onClick={() => alert('Reservation functionality not implemented yet')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Reserve
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
