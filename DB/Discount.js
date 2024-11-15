import connection from "./ConnectDB";
export async function getAllDiscounts() {
  const [rows] = await connection.execute("SELECT * FROM discounts");
  return rows;
}
