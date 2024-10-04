"use client"
import img1 from "@/app/component/image.jpeg"
import img2 from "@/app/component/image2.jpeg"
import NotificationCard from "../component/NotificationCard"
import { useEffect,useState } from "react"

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

async function fetchNotifications(){
    const response = await fetch('https://api.example.com/notifications')
    
}
useEffect(()=>{

})

    return(
    <div className="bg-black h-full">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-700 to-white text-center py-4 px-6 rounded-lg shadow-lg animate-glow">Notifications</h1>
        <div className="flex flex-col gap-4 mt-4 px-72">
          
        {notifications && notifications.map((element)=>{
                return(
                    <NotificationCard
                    image={element.image}
                    title={element.title}
                    message={element.message}
                    time={element.time}
                    onClose={() => console.log("Closed")}  
                    />
                )            
            })
        }
            </div>
    </div>)
}