"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaGem, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { updateSeatStatus, listenToSeatUpdates, fetchSeatLayout } from "@/DB/ConnectFB"; // Import the functions

export default function Seats({ movieId }) {
  const [premiumSeats, setPremiumSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [seatLayout, setSeatLayout] = useState({});
  const [userId, setUserId] = useState(null);

  // Function to get userId from cookie
  const getUserIdFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const userIdCookie = cookies.find((cookie) => cookie.startsWith("userid="));
    return userIdCookie ? userIdCookie.split("=")[1] : null;
  };


  // Calculate seat layout dynamically
  const calculateSeatLayout = (noofseats) => {
    const cols = Math.ceil(Math.sqrt(noofseats)); // Use square root for a balanced layout
    const rows = Math.ceil(noofseats / cols);
    const containers = Math.ceil(rows / 3); // Divide rows into 3 containers

    const seatsPerContainer = Math.floor(noofseats / containers);
    const lastContainerSeats = noofseats - seatsPerContainer * (containers - 1);

    return {
      cols,
      containers: Array.from({ length: containers }, (_, i) =>
        i === containers - 1 ? lastContainerSeats : seatsPerContainer
      ),
    };
  };

  // Fetch seat data in real-time
  useEffect(() => {
    // Listen for seat updates
    const userId = getUserIdFromCookie();
    setUserId(userId); 
    const unsubscribe = listenToSeatUpdates(movieId, (seatData) => {
      const premiumSeats = [];
      const reservedSeats = [];
      const normalSeats = [];

      seatData.forEach((seat) => {
        if (seat.seatType === "premium") {
          premiumSeats.push(seat.seatNumber);
        } else if (seat.seatType === "reserved") {
          reservedSeats.push(seat.seatNumber);
        } else {
          normalSeats.push(seat.seatNumber);
        }
      });

      setPremiumSeats(premiumSeats);
      setReservedSeats(reservedSeats);
      setAvailableSeats(normalSeats);

      // Update seat layout
      const totalSeats = seatData.length;
      const { cols, containers } = calculateSeatLayout(totalSeats);
      setSeatLayout({ cols, containers });
    });

    // Fetch initial seat layout on component mount
    fetchSeatLayout(movieId)
      .then((seatData) => {
        const totalSeats = seatData.length;
        const { cols, containers } = calculateSeatLayout(totalSeats);
        setSeatLayout({ cols, containers });
      })
      .catch((error) => console.error(error));

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [movieId]);

  // Handle seat click
  const handleSeatClick = (seatNumber, type) => {
    setSelectedSeat(seatNumber);
    setDialogType(type);
    setIsDialogOpen(true);
  };

  // Reserve seat
  const handleReserveSeat = async () => {
    if (!selectedSeat) return;

    try {
      await updateSeatStatus(movieId, selectedSeat, "reserved",userId); // Update the seat status to reserved
      setIsDialogOpen(false);
      alert(`Seat ${selectedSeat} reserved successfully!`);
    } catch (error) {
      console.error("Error reserving seat:", error);
      alert("Failed to reserve the seat.");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-14">
      {seatLayout.containers &&
        seatLayout.containers.map((container, containerIndex) => {
          let seatStartIndex = seatLayout.containers
            .slice(0, containerIndex)
            .reduce((acc, cur) => acc + cur, 0) + 1;
          const columnsForContainer = seatLayout.cols;

          return (
            <div
              key={containerIndex}
              className="seats grid gap-3 text-white"
              style={{ gridTemplateColumns: `repeat(${columnsForContainer}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: container }).map((_, seatIndex) => {
                const seatNumber = seatStartIndex + seatIndex;

                if (premiumSeats.includes(seatNumber)) {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "premium")}
                      className="rounded-full border-red-500 border-2 text-2xl flex hover:cursor-pointer items-center justify-center w-12 h-12 bg-gradient-to-br from-red-950 via-red-700 to-red-600"
                    >
                      {seatNumber}
                    </span>
                  );
                } else if (reservedSeats.includes(seatNumber)) {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "reserved")}
                      className="rounded-full border-gray-500 border-2 text-2xl flex hover:cursor-pointer items-center justify-center w-12 h-12 bg-gray-500"
                    >
                      {seatNumber}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber, "available")}
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
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
              {dialogType === "premium" &&
                `Seat ${selectedSeat} is a premium seat and cannot be reserved.`}
              {dialogType === "reserved" &&
                `Seat ${selectedSeat} is already reserved.`}
              {dialogType === "available" &&
                `Seat ${selectedSeat} is available for reservation.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <button
              onClick={closeDialog}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            {dialogType === "available" && (
              <button
                onClick={handleReserveSeat}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
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
