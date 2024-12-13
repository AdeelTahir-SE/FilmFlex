const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let reservedSeats = []; // Track reserved seats
let premiumSeats = []; // Track purchased premium seats

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send current seat status to newly connected clients
  socket.emit('seat-status', { reservedSeats, premiumSeats });

  // Handle seat reservation
  socket.on('reserve-seat', (seatNumber) => {
    if (!reservedSeats.includes(seatNumber)) {
      reservedSeats.push(seatNumber);
      io.emit('seat-status', { reservedSeats, premiumSeats }); // Notify all clients
    }
  });

  // Handle premium seat purchase
  socket.on('purchase-seat', (seatNumber) => {
    if (!premiumSeats.includes(seatNumber)) {
      premiumSeats.push(seatNumber);
      io.emit('seat-status', { reservedSeats, premiumSeats }); // Notify all clients
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
