import connection from "./ConnectDB";
export async function getAllDiscounts() {
  const [rows] = await connection.execute("SELECT * FROM Offers");
  return rows;
}
export async function getMoviesSale() {
  const [rows] = await connection.execute("SELECT * FROM DiscountPrices ");
  return rows;
}   