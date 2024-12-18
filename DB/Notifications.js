import connection from "./ConnectDB";
export function getAllNotifications(userid) {
    try{
return connection.execute("SELECT * FROM notifications WHERE userid = ?", [userid]);
    }
    catch(e){
        console.log(e);
    }
}
export function getNotificationsLength(userid) {
    try{
return connection.execute("SELECT COUNT(*) FROM notifications WHERE userid = ?", [userid]);
    }
    catch(e){
        console.log(e);
    }
}