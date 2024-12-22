import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  doc,
setDoc,
  updateDoc,
  collection,
  where,
  onSnapshot,
  getDocs,
  query
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore instance
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true // Enables long polling for real-time updates
});

// Function to update seat status in Firestore
export const updateSeatStatus = async (movieId, seatNumber, status, userId, day, time) => {
  if (userId == null) {
    throw new Error("User not authenticated");
  }

  try {
    // Reference to the seat document
    const seatRef = doc(db, "movies", movieId.toString(), "days", day, "timings", time, "seats", `seat${seatNumber}`);

    await updateDoc(seatRef, { seatType: status, userId }); // Update seat status and userId
    console.log(`Seat ${seatNumber} updated to ${status}`);
  } catch (error) {
    console.error("Error updating seat status: ", error);
    throw new Error(`Failed to update seat ${seatNumber} status to ${status}`);
  }
};

export const listenToSeatUpdates = (movieId, day, time, callback) => {
  const seatRef = collection(db, "movies", movieId.toString(), "days", day, "timings", time, "seats");

  const unsubscribe = onSnapshot(seatRef, (snapshot) => {
    const seatData = snapshot.docs.map((doc) => {
      return doc.data();
    });
    callback(seatData); 
  });

  return unsubscribe; 
};

export const fetchSeatLayout = async (movieId, day, time) => {
  try {
    const seatRef = collection(db, "movies", movieId.toString(), "days", day, "timings", time, "seats");
    const seatQuery = query(seatRef); // Query the seats collection
    const querySnapshot = await getDocs(seatQuery); // Fetch the documents in the collection

    const seatData = querySnapshot.docs.map((doc) => doc.data());

    return seatData; // Return the seat layout
  } catch (error) {
    console.error("Error fetching seat layout: ", error);
    throw new Error("Failed to fetch seat layout");
  }
};

// Function to get all movies reserved by a particular userId
export const getMoviesByUserId = async (userId) => {
  try {
    const moviesRef = collection(db, "movies");
    const userMovies = [];

    const querySnapshot = await getDocs(moviesRef);

    // Iterate through each movie document
    for (const doc of querySnapshot.docs) {
      const movieId = doc.id;
      const movieData = doc.data(); // Get the movie data to access days and timings

      const daysRef = collection(db, "movies", movieId, "days");
      const daysSnapshot = await getDocs(daysRef);

      // Iterate through each day and timings
      for (const dayDoc of daysSnapshot.docs) {
        const day = dayDoc.id;
        const timingsRef = collection(db, "movies", movieId, "days", day, "timings");
        const timingsSnapshot = await getDocs(timingsRef);

        for (const timeDoc of timingsSnapshot.docs) {
          const time = timeDoc.id;

          const seatsRef = collection(db, "movies", movieId, "days", day, "timings", time, "seats");
          const seatQuery = query(seatsRef, where("userId", "==", userId.toString()), where("seatType", "==", "reserved"));
          const seatSnapshot = await getDocs(seatQuery);

          if (!seatSnapshot.empty) {
            seatSnapshot.forEach((seatDoc) => {
              const seatId = seatDoc.id;
              userMovies.push({ movieId, userId, seatId, day, time });
            });
          }
        }
      }
    }

    return userMovies; // Return the list of movies with reserved seats for the user
  } catch (error) {
    console.error("Error fetching movies reserved by user:", error);
    throw new Error("Failed to fetch movies reserved by user");
  }
};


export const cancelSeatReservation = async (movieId, seatNumber, day, time) => {
alert("Seat will be cancelled soon Thank you for your patience")  
  try {
    // Reference to the seat document
    const seatRef = doc(db, "movies", movieId.toString(), "days", day, "timings", time, "seats", `seat${seatNumber}`);

    // Update the seat status to "available" and remove userId (if any)
    await updateDoc(seatRef, {
      seatType: "available", // Change status to "available"
      userId: null,          // Remove userId to indicate the seat is no longer reserved
    });

    console.log(`Seat ${seatNumber} has been updated to available`);
  } catch (error) {
    console.error("Error cancelling seat reservation: ", error);
    throw new Error("Failed to cancel seat reservation");
  }
};

export const generateDummySeatsForFirebase = async (movieId, day, timings, numSeats) => {
  const seatTypes = ["premium", "reserved", "available"];
  
  // Loop through the number of seats and create dummy data
  for (let i = 1; i <= numSeats; i++) {
    const seatType = seatTypes[Math.floor(Math.random() * seatTypes.length)];

    const seatRef = doc(db, "movies", movieId.toString(), "days", day, "timings", timings, "seats", `seat${i}`);

    // Set the seat document with the seat type and other details
    await setDoc(seatRef, {
      seatNumber: i,
      seatType: seatType,
      timing: timings,
      day: day,
      userId: seatType === "reserved" ? "user123" : null, // Only add userId if the seat is reserved
    });

    console.log(`Dummy seat ${i} added with status ${seatType}`);
  }
};


// Export necessary Firestore functions for use in components or pages
export { db, collection, query, getDocs, doc, onSnapshot };
