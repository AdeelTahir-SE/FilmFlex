import connection from "./ConnectDB";
export function getAllNotifications(userid) {
    try{
return connection.execute("SELECT * FROM notifications WHERE userid = ?", [userid]);
    }
    catch(e){
        console.log(e);
    }
}
export async function createNotification(userid, message,imageurl) {
    try{
const [result] = await connection.execute(
"INSERT INTO notifications (userid, message,imageurl,currentdata) VALUES (?, ?, ?, NOW())",
[userid, message,imageurl]
);
return result.insertId;
    }
    catch(e){
        console.log(e);
    }
}
    
