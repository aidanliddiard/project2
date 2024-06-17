import React from "react";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <NavBar />
      <h1 className="text-4xl text-center p-4 md:hidden ">
        <b>Welcome to Wanderlust</b>
      </h1>
      <div className="hidden md:block"></div>
      <div className="px-4 md:px-0 relative">
        <img
          className="h-auto max-w-full md:max-w-full"
          src="images/Welcome-to-Wanderlust-2.png"
          alt="image description"
        />
        <div className="absolute bottom-10 md:bottom-20 left-0 right-0 flex items-center justify-center pt-5">
          <div>
            <a
              href="http://localhost:5173/signup"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto mb-4 md:mr-6 py-3 px-5 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
            >
              Sign Up for Wanderlust
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
