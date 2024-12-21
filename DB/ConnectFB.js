import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  doc,
  updateDoc,
  collection,
  onSnapshot,
  getDocs,
  query
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyApFy1QjNcCnRcNyUDaBy2njKbo1vUoiNU",
  authDomain: "filmflex-c6591.firebaseapp.com",
  projectId: "filmflex-c6591",
  storageBucket: "filmflex-c6591.firebasestorage.app",
  messagingSenderId: "346166409488",
  appId: "1:346166409488:web:a37e7a61c9ff3bc202cd95",
  measurementId: "G-F4PCJD2KMF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore instance
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true // Enables long polling for real-time updates
});

// Function to update seat status in Firestore
export const updateSeatStatus = async (movieId, seatNumber, status, userId) => {
  try {
    const seatRef = doc(db, "movies", `${movieId}_seat_${seatNumber}`); // Document name includes movieId and seatNumber

    await updateDoc(seatRef, { seatType: status, userId }); // Update the seat status in Firestore
    console.log(`Seat ${seatNumber} updated to ${status}`);
  } catch (error) {
    console.error("Error updating seat status: ", error);
    throw new Error(`Failed to update seat ${seatNumber} status to ${status}`);
  }
};
export const listenToSeatUpdates = (movieId, callback) => {
  const seatRef = collection(db, "movies");
  
  // Real-time listener to capture changes for seats in the specified movie
  const unsubscribe = onSnapshot(seatRef, (snapshot) => {
    const seatData = snapshot.docs
      .filter(doc => doc.id.startsWith(`${movieId}_seat_`)) // Filter by movieId
      .map(doc => doc.data());
    
    callback(seatData); // Pass updated seat data to the callback function
  });

  return unsubscribe; // Return unsubscribe function to stop listening
};

export const fetchSeatLayout = async (movieId) => {
  try {
    const seatRef = collection(db, "movies");
    const seatQuery = query(seatRef); // Query the movies collection
    const querySnapshot = await getDocs(seatQuery);
    
    const seatData = querySnapshot.docs
      .filter(doc => doc.id.startsWith(`${movieId}_seat_`)) // Filter by movieId
      .map(doc => doc.data()); // Extract seat data from documents

    return seatData; // Return the seat layout
  } catch (error) {
    console.error("Error fetching seat layout: ", error);
    throw new Error("Failed to fetch seat layout");
  }
};


export const getMoviesByUserId = async (userId) => {
  try {
    console.log("Fetching movies reserved by user:", userId);

    const seatRef = collection(db, "movies");
    const seatQuery = query(seatRef); // Query all documents in the movies collection
    const querySnapshot = await getDocs(seatQuery);

    console.log(`Found ${querySnapshot.docs.length} seats in Firestore`);

    const userMovies = [];

    // Iterate through each seat document
    for (const doc of querySnapshot.docs) {
      if (doc.id.startsWith("movie")) continue; // Skip movie documents (if present)

      const seatData = doc.data();
      if (seatData.userId === userId && seatData.seatType === "reserved") {
        console.log(`User ${userId} has reserved seat ${doc.id}`);
        userMovies.push(seatData); // Add the seat data to the list
      }
    }

    console.log("Movies reserved by user:", userMovies);
    return userMovies;
  } catch (error) {
    console.error("Error fetching movies reserved by user:", error);
    throw new Error("Failed to fetch movies reserved by user");
  }
};

// Export necessary Firestore functions for use in components or pages
export { db, collection, query, getDocs, doc, onSnapshot };
