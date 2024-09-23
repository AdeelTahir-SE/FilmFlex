"use client"
import img1 from "@/app/components/image.jpeg"
import img2 from "@/app/components/image2.jpeg"
import NotificationCard from "../components/NotificationCard"
export default function page(){
const notifications=[
    {
        image:img1,
        title:"New Movie Released",
        message:"A new movie has been released. Watch it now.",
        time:"2 hours ago"
    },
    {
        image:img2,
        title:"New Movie Released",
        message:"A new movie has been released. Watch it now.",
        time:"3 hours ago"
    },
    {
        image:img1,
        title:"New Movie Released",
        message:"A new movie has been released. Watch it now.",
        time:"4 hours ago"
    },
    {
        image:img2,
        title:"New Movie Released",
        message:"A new movie has been released. Watch it now.",
        time:"5 hours ago"
    }
]

    return(<div className="bg-black h-full">
        <h1 className="text-5xl text-center underline text-gray-500">Notifications</h1>
        <div className="flex flex-col gap-4 mt-4 px-72">
            <NotificationCard 
                image={img1}
                title="New Movie Released"
                message="A new movie has been released. Watch it now."
                time="2 hours ago"
                onClose={() => console.log("Closed")}
            />
            <NotificationCard 
                image={img2}
                title="New Movie Released"
                message="A new movie has been released. Watch it now."
                time="3 hours ago"
                onClose={() => console.log("Closed")}
            />
            <NotificationCard 
                image={img1}
                title="New Movie Released"
                message="A new movie has been released. Watch it now."
                time="4 hours ago"
                onClose={() => console.log("Closed")}
            />
            <NotificationCard 
                image={img2}
                title="New Movie Released"
                message="A new movie has been released. Watch it now."
                time="5 hours ago"
                onClose={() => console.log("Closed")}
            />
            </div>
    </div>)
}