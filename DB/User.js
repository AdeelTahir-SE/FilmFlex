import connection from "./ConnectDB";
import { hashPassword } from "@/security/securityfunctions";
import {verifyPassword} from "@/security/securityfunctions";
export async function createUser(name, email, password) {
  let result;
    try{
   [result] = await connection.execute(
    "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
    [name, email, await hashPassword(password)]
  );
}
catch(e){
    console.log(e);
}
console.log(result.insertId);
  return result.insertId;
}


export async function LoginUser(email, password) {
  let rows;
  try {
    console.log(email);
    console.log(password);

    [rows] = await connection.execute("SELECT * FROM User WHERE email = ?", [email]);

    if (rows.length === 0) {
      console.log("No user found with this email.");
      return null;
    }

    const user = rows[0];

    // Compare hashed password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password.");
      return null;
    }

    console.log("User found:", user);
    return user.id;

  } catch (e) {
    console.log(e);
    return null;
  }
}


export async function getUserById(id) {
  console.log(id)
  let rows;
  try {
    [rows] = await connection.execute("SELECT * FROM USER WHERE id = ?", [id]);
      console.log(rows[0]);
      return rows[0];
    
    return rows[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function uploadImage(userId,path){
  let rows;
  try {
    [rows] = await connection.execute("UPDATE User SET profilePicUrl = ? WHERE id = ?", [path,userId]);
    if (rows.length === 0) {
      console.log("No user found with this ID.");
      return null;
    }
    return rows[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateAttribute(id,attribute,info){
  let rows;
  try {
    if(attribute==="password"){
      info=await hashPassword(info);
    }
    [rows] = await connection.execute(`UPDATE User SET ${attribute} = ? WHERE id = ?`, [info,id]);
    if (rows.length === 0) {
      console.log("No user found with this ID.");
      return null;
    }
    return rows[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}