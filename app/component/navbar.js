"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import filmflex from "@/public/filmflextext.png";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/headerprofile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if(data.user.name.length>10){
          data.user.name=data.user.name.slice(0,10)+"...";
        }
        setUser(data.user);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-black sticky z-10 top-0 w-full flex flex-row justify-between">
      <div className="flex flex-row justify-between md:justify-end gap-10 p-4 items-center text-white font-bold text-base">
        <Link href="/">
          <Image
            src={filmflex}
            className="w-16 h-16 object-cover"
            alt="FilmFlex"
          />
        </Link>
      </div>
      <ul className="flex flex-row justify-between md:justify-end gap-10 p-4 items-center text-white font-bold text-base">
        <Link href="/">
          <li className="cursor-pointer text-red-700">FilmFlex</li>
        </Link>
        <Link href="/movies">
          <li className="cursor-pointer text-red-700">Reserve Now!</li>
        </Link>
        <Link href="/offerspromotions">
          <li className="cursor-pointer text-red-700">Offers!</li>
        </Link>
        <Link href="/notifications">
          <li className="cursor-pointer filter invert flex justify-center items-center max-h-5">
            <svg
              className="h-5 w-5"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="120.641px"
              height="122.878px"
              viewBox="0 0 120.641 122.878"
              enable-background="new 0 0 120.641 122.878"
            >
              <g>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M68.16,6.889c18.129,3.653,31.889,19.757,31.889,38.921 c0,22.594-2.146,39.585,20.592,54.716c-40.277,0-80.366,0-120.641,0C22.8,85.353,20.647,68.036,20.647,45.81 c0-19.267,13.91-35.439,32.182-38.979C53.883-2.309,67.174-2.265,68.16,6.889L68.16,6.889z M76.711,109.19 c-1.398,7.785-8.205,13.688-16.392,13.688c-8.187,0-14.992-5.902-16.393-13.688H76.711L76.711,109.19z"
                />
              </g>
            </svg>
          </li>
        </Link>
        <Link href="/register">
          <li className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hover:drop-shadow-2xl w-6 h-6"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ffff"
                  fillRule="nonzero"
                  d="M256 0c70.69 0 134.69 28.655 181.018 74.982C483.345 121.31 512 185.31 512 256s-28.655 134.69-74.982 181.018C390.69 483.345 326.69 512 256 512s-134.69-28.655-181.018-74.982C28.655 390.69 0 326.69 0 256S28.655 121.31 74.982 74.982C121.31 28.655 185.31 0 256 0zm-49.371 316.575c-.992-1.286 2.594-10.118 3.443-11.546-9.722-8.651-17.404-17.379-19.041-35.34l-1.043.022c-2.408-.032-4.729-.586-6.903-1.825-3.481-1.979-5.93-5.379-7.583-9.212-3.5-8.043-15.031-34.738 2.537-32.628-9.823-18.345 12.409-49.684-25.935-61.275 31.46-39.845 97.839-101.281 146.483-39.654 53.245 5.16 69.853 68.437 34 103.093 2.101.076 4.08.56 5.832 1.498 6.665 3.57 6.884 11.318 5.132 17.819-1.733 5.429-3.934 9.104-6.01 14.397-2.524 7.147-6.215 8.478-13.345 7.708-.362 17.67-8.528 26.343-19.518 36.724l3.007 10.187c-14.737 31.261-75.957 32.518-101.056.032zM78.752 394.224c12.076-51.533 45.656-33.396 110.338-73.867 22.982 47.952 116.386 51.437 135.54 0 55.35 35.384 98.967 20.923 109.958 72.138 28.965-37.841 46.176-85.158 46.176-136.495 0-62.068-25.158-118.26-65.83-158.934C374.26 56.394 318.068 31.236 256 31.236S137.74 56.394 97.066 97.066C56.394 137.74 31.236 193.932 31.236 256c0 52.123 17.744 100.099 47.516 138.224z"
                />
              </svg>
              <p>{user?.name || "Sign in"}</p>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
