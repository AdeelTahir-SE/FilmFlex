import connection from "./ConnectDB";
import { hashPassword } from "@/security/securityfunctions";
export async function createUser(name, email, password) {
    try{
  const [result] = await connection.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashPassword(password)]
  );
}
catch(e){
    console.log(e);
}
  return result.insertId;
}


export async function getUserByEmailPassword(email,password) {
    try{
  const [rows] = await connection.execute("SELECT * FROM users WHERE email = ? AND password= ?", [
    email,hashPassword(password)
  ]);
}
catch(e){
    console.log(e);
}
  return rows[0];
}