import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-screen h-screen">
      <main
        className="flex flex-col items-center justify-center w-full mx-auto px-4 bg-white mt-2"
        style={{ height: "calc(100vh - 85px)", maxWidth: "672px" }}
      >
        <img
          src="/ufo.svg"
          alt="UFO Graphic"
          className="object-contain w-[200px] sm:w-[280px] md:w-[360px] h-auto"
        />

        <div className="flex flex-col items-center gap-4 w-full mt-6">
          <h1 className="text-primary-700 text-center text-2xl md:text-3xl font-semibold">
            Looks like you're lost
          </h1>
          <p className="text-[18px] sm:text-[22px] md:text-[28px] text-gray-700 text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="bg-[#2374E1] text-white font-medium text-base rounded-lg py-3 px-6 w-[120px] sm:w-[140px] md:w-[156px] h-11 sm:h-[50px] md:h-[54px] mt-6 flex items-center justify-center"
        >
          Go to Home
        </Link>
      </main>
    </div>
  );
}
