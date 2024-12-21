import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotificationCard({
  id,
  image,
  time,
  title,
  message,
  onDelete, // Receive the delete handler as a prop
}) {
  async function deleteNotification(id) {
    console.log(id)
    const response = await fetch(`/api/notifications?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onDelete(id); // Trigger the delete handler passed from parent to remove the notification
    }
  }

  return (
    <div className="mb-4 bg-gradient-to-r from-red-600 via-red-950 to-black flex flex-row items-center pl-0 ml-0">
      <Image
        src={image}
        className="w-36 object-cover"
        width={36}
        height={60}
        alt={title}
      />
      <div className="flex flex-col gap-2 mx-7">
        <h1 className="text-2xl text-white font-bold">{title}</h1>
        <p className="text-white">{message}</p>
      </div>
      <div>
        <p className="text-white">{time}</p>
        <Button className="bg-red-700 hover:bg-red-500" onClick={()=>deleteNotification(id)}>
          Close
        </Button>
      </div>
    </div>
  );
}
