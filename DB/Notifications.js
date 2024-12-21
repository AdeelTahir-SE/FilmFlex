import connection from "./ConnectDB";
export async function getAllNotifications(userid) {
    try{
return await connection.execute("SELECT * FROM UserNotifications WHERE userid = ?", [userid]);
    }
    catch(e){
        console.log(e);
    }
}

export async function deleteNotification(notificationid){
   try{
    return await  connection.execute("DELETE FROM UserNotifications WHERE notificationId=?",[notificationid]);
   }
   catch(e){
    console.log(e);
   }
}