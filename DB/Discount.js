import connection from "./ConnectDB";
export async function getAllDiscounts() {
  const [rows] = await connection.execute("SELECT * FROM discounts");
  return rows;
}
export async function getMoviesSale() {
  const [rows] = await connection.execute("SELECT * FROM MoviesSale ");
  return rows;
}