import { getAllNotifications } from "@/DB/Notifications";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { value } = request.cookies.get("userid");
  const userId = value;

  // Check if userId is available, if not return Unauthorized
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }



  // Fetch notifications from the database
  const notifications = await getAllNotifications(userId);
  
  // Create a response and set the notifications length cookie
  const response = NextResponse.json(
    {
      message: "Notifications fetched successfully",
      notificationslength: notifications[0]?.length || 0,
    },
    { status: 200 }
  );
return response;
}
