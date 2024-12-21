import { NextResponse } from "next/server";
import { getAllNotifications } from "@/DB/Notifications";
import { deleteNotification } from "@/DB/Notifications";
export async function GET(request) {
  const { value } = request.cookies.get("userid");
  const userId = value;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const notifications = await getAllNotifications(userId);

    return NextResponse.json(
      {
        message: "Notifications",
        notifications: notifications,
        notificationslength: notifications[0].length,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json(
      { message: "Error getting notifications" },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  // Get the notification ID from query parameters
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Extract `id` from the query

  if (!id) {
    return NextResponse.json(
      { message: "No notification id found" },
      { status: 400 } // 400 Bad Request instead of 401 Unauthorized
    );
  }

  try {
    // Assuming deleteNotification is a function that deletes the notification from your database
    await deleteNotification(id);

    return NextResponse.json(
      { message: "Notification deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { message: "Error deleting notification" },
      { status: 500 }
    );
  }
}