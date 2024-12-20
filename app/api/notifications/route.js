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
        notificationslength: notifications.length,
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
  const { id } = request.query.id;
  if (!id) {
    return NextResponse.json(
      { message: "No notification id found" },
      { status: 401 }
    );
  }
  try {
    await deleteNotification(id);

    return NextResponse.json(
      { message: "Notification deleted succesfully" },
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
