import { getNotificationsLength } from "@/DB/Notifications";
import { NextResponse } from "next/server";
export async function GET(request) {
  const { value } = request.cookies.get("userid");
  const userId = value;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const notificationsLength = await getNotificationsLength(userId);
    return NextResponse.json(
      { message: "Notifications Count", notificationsLength: notificationsLength },
      { status: 200 }
    );
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ message: "Error getting notifications count" }, { status: 500 });
  }
}