import React from "react";
import { Link } from "react-router-dom";

export default function PermissionDenied() {
  return (
    <main
      className="flex flex-col items-center justify-center w-full mx-auto bg-white mt-2"
      style={{ height: "calc(100vh - 85px)" }}
    >
      <div>
        <img
          src="/permission-not-granted.png"
          alt="Permission Not Granted"
          className="w-[360px] h-[394.93px]"
        />
      </div>

      <div className="flex items-center flex-col text-center">
        <p className="text-[26px] text-primary-700 mt-6 font-semibold">
          Permission Not Granted
        </p>
        <p className="text-gray-700 mt-3 text-xl w-2xl h-[84px]">
          You do not have the required permissions to access this page or
          perform this action.
        </p>
        <div className="flex gap-2">
          <Link
            to="/"
            className="text-black border border-[#2374E1]  font-medium text-base rounded-lg py-3 px-6 w-[120px] sm:w-[140px] md:w-[156px] h-11 sm:h-[50px] md:h-[54px] mt-6 flex items-center justify-center"
          >
            Home{" "}
          </Link>
          <Link
            to="/login"
            className=" text-black border border-[#2374E1] font-medium text-base rounded-lg py-3 px-6 w-[120px] sm:w-[140px] md:w-[156px] h-11 sm:h-[50px] md:h-[54px] mt-6 flex items-center justify-center"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
