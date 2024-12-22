"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Offers from "@/public/Offers.png";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import popcornsvg from "@/public/popcorn.svg";

export default function OffersandPromotions() {
  const [offers, setOffers] = useState([
    // Default data for offers
    {
      id: 1,
      title: "Blockbuster Weekend",
      description: "Enjoy 50% off on all blockbuster movies this weekend!",
      discount: "50% Off",
      icon: (
        <svg
          className="text-red-500 text-4xl h-12 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Double Feature Night",
      description: "Buy one ticket, get one free for select double features.",
      discount: "BOGO",
      icon: (
        <svg
          className="text-red-500 text-4xl mb-2 h-12"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Free Popcorn",
      description: "Get free popcorn with every ticket purchase over $20.",
      discount: "Free Popcorn",
      icon: (
        <Image
          src={popcornsvg}
          alt="Popcorn Icon"
          width={50}
          height={50}
          className="mb-2"
        />
      ),
    },
  ]);

  const [movieSales, setMovieSales] = useState([
    // Default data for movie sales
    {
      id: 1,
      title: "Inception",
      originalPrice: "$15",
      salePrice: "$10",
      image: "/image.jpeg", // Default image path
      discountDay: "Saturday",
      discountTime: "2:00 PM - 5:00 PM",
    },
    {
      id: 2,
      title: "The Dark Knight",
      originalPrice: "$15",
      salePrice: "$10",
      image: "/image.jpeg", // Default image path
      discountDay: "Sunday",
      discountTime: "3:00 PM - 6:00 PM",
    },
    {
      id: 3,
      title: "Interstellar",
      originalPrice: "$15",
      salePrice: "$10",
      image: "/image.jpeg", // Default image path
      discountDay: "Friday",
      discountTime: "6:00 PM - 9:00 PM",
    },
  ]);
  // CREATE TABLE IF NOT EXISTS DiscountPrices (
  //   id INT AUTO_INCREMENT PRIMARY KEY,
  //   movieId INT NOT NULL,
  //   discountPercentage DECIMAL(5, 2) CHECK (discountPercentage >= 0 AND discountPercentage <= 100),
  //   discountDay ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  //   discountTime TIME NOT NULL,
  //   FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
  // );

  useEffect(() => {
    // Fetch the offers and movie sales from the server
    async function fetchOffersAndSales() {
      try {
        const [offersRes, movieSalesRes] = await Promise.all([
          fetch("/api/offers"),
          fetch("/api/movieSales"),
        ]);
        if (offersRes.ok) {
          const offersData = await offersRes.json();
          setOffers(offersData.discount);
        }
        if (movieSalesRes.ok) {
          const movieSalesData = await movieSalesRes.json();
          setMovieSales(movieSalesData.moviesSale);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchOffersAndSales();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-between py-10 ">
  < section className="absolute inset-0">
        <ShootingStars />
        <StarsBackground />
        </section>     
   
        <div className="flex flex-row items-center justify-center p-4 gap-10">
          <h1 className="text-4xl text-transparent text-center bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
            Movie Offers & Promotions
          </h1>
          <Image src={Offers} alt="Offers" className="w-24" />
        </div>

        {/* Offers Section */}
        <div className="flex flex-wrap justify-center border-b-2 border-slate-600 pb-24">
          {offers.map((offer) => (
            <div
              key={offer.offerId}
              className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg m-4 w-80 border border-red-700 transform transition-transform hover:scale-105"
            >
              {offer.offerIcon}
              <h2 className="text-2xl text-red-500 mb-2">{offer.offerTitle}</h2>
              <p className="text-gray-300 mb-4">{offer.offerDescription}</p>
              <span className="text-red-600 font-bold">{offer.offerDiscount}</span>
            </div>
          ))}
        </div>

        {/* Movie Sales Section */}
        <div className="mt-10">
          <h2 className="text-3xl text-red-500 mb-6 text-center">
            Movies on Sale
          </h2>
          <div className="flex flex-wrap justify-center">
            {movieSales.map((movie) => (
              <div
                key={movie.movieid}
                className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg m-4 w-80 border border-red-700 transform transition-transform hover:scale-105"
              >
                <Image
                  src={movie.movieImage}
                  alt={movie.movieName}
                  width={90}
                  height={48}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-2xl text-red-500 mb-2">{movie.movieName}</h3>
                <p className="text-gray-300 mb-4">
                  <span className="line-through">{movie.originalPrice}</span>{" "}
                  <span className="text-red-600">{movie.salePrice}</span>
                </p>
                <p className="text-gray-400">
                  {movie.discountDay}, {movie.discountTime}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* App Download Discount Section */}
        <div className="mt-10">
          <h2 className="text-3xl text-red-500 mb-6 text-center">
            Download Our App
          </h2>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg m-4 w-80 border border-red-700">
            <p className="text-gray-300 mb-4">
              Download our mobile app and get an additional 10% discount on your
              first purchase!
            </p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700">
              Download Now
            </button>
          </div>
        </div>
    
    </div>
  );
}
