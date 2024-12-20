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
    "SELECT * FROM TrendingMovies "
  );
  return rows;
}

export async function getMovieDetails(){
const [rows]=await connection.execute(
  "SELECT * FROM MovieDetails"
);
return rows;
}




export async function getMovie(id) {
  const [rows] = await connection.execute("SELECT * FROM movies WHERE id = ?", [
    id,
  ]);
  return rows[0];
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
