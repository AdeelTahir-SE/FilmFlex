import connection from "./ConnectDB";
import { hashPassword } from "@/security/securityfunctions";
export async function createUser(name, email, password) {
    try{
  const [result] = await connection.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
}
catch(e){
    console.log(e);
}
  return result.insertId;
}

export async function deleteUser(email){
    try{
    const result=await connection.execute("DELETE FROM users WHERE email=?",[email]);
    }
    catch(e){
        console.log(e);
    }
    return result[0];
}
export async function getUserByEmail(email) {
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