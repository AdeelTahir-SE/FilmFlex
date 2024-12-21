import connection from "./ConnectDB";


export async function getAllMovies() {
  const [rows] = await connection.execute("SELECT * FROM movies");
  return rows;
}



export async function getMoviesOnDate(date) {
  const [rows] = await connection.execute(
    "SELECT * FROM movies WHERE date = ?",
    [date]
  );
  return rows;
}


export async function getTrendingMovies(){
  const [rows] = await connection.execute(
    `
SELECT 
    movieId, 
    movieName, 
    movieRatings, 
    reservationCount, 
    averageRating, 
    genres, 
    movieImage
FROM TrendingMovies
ORDER BY averageRating DESC
LIMIT 3`
  );
  return rows;
}

export async function getMovieDetails(){
const [rows]=await connection.execute(
  "SELECT * FROM week_movies_summary"
);
return rows;
}




export async function getMovie(id, day, timings) {
  console.log(id, day, timings);
  console.log("in databse");
  const [rows] = await connection.execute(
    "SELECT * FROM MovieDetailsWithTimings WHERE movieId = ? AND day = ? AND timings = ?",
    [id, day, timings]
  );
  console.log(rows);
  return rows[0];  // Return the first matching row
}


export async function getMovieReviews(id) {
  const [rows] = await connection.execute("SELECT * FROM Reviews INNER JOIN User ON User.id=Reviews.userId WHERE movieId = ?", [id]);
  return rows;
}

export async function addMovieReview(movieId, userId, rating, desc) {
  const [result] = await connection.execute(
    "INSERT INTO Reviews (movieId, userId, rating, `desc`) VALUES (?, ?, ?, ?)",
    [movieId, userId, rating, desc]
  );

  if (result.affectedRows === 0) {
    throw new Error("Failed to add the review.");
  }

  return {
    message: "Review added successfully.",
    reviewId: result.insertId,
  };
}



export async function updateSeatStatus(seatNumber, movieid, status) {
  const [rows] = await connection.execute(
    "SELECT seats FROM movies WHERE id = ?",
    [movieid]
  );

  if (rows.length === 0) {
    throw new Error("Movie not found.");
  }

  let updateSeat = JSON.parse(rows[0].seats);

  updateSeat[seatNumber] = status;

  const updatedSeats = JSON.stringify(updateSeat);

  const [result] = await connection.execute(
    "UPDATE movies SET seats = ? WHERE id = ?",
    [updatedSeats, movieid]
  );

  if (result.affectedRows === 0) {
    throw new Error("Failed to update the seat status.");
  }

  return {
    message: "Seat status updated successfully.",
    movieid,
    seatNumber,
    status,
  };
}


async function comment(movieId, userId, rating, desc) {
  const [result] = await connection.execute(
    "INSERT INTO Reviews (movieId, userId, rating, desc) VALUES (?, ?, ?, ?)",
    [movieId, userId, rating, desc]
  );

  if (result.affectedRows === 0) {
    throw new Error("Failed to add the review.");
  }

  return {
    message: "Review added successfully.",
    reviewId: result.insertId,
  };
}