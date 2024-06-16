import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-center p-4 md:hidden "><b>Welcome to Wanderlust</b></h1>
      <div className="hidden md:block"></div>
      <div className="px-4 md:px-0"> {/* Adjust padding as needed */}
  <img className="h-auto max-w-full md:max-w-full" src="images/image-final.jpg" alt="image description" />
</div>
      <div>
        <p className="mt-0 mb-2 text-gray-500 dark:text-gray-400 md:hidden px-6 py-3 text-justify">
          Wanderlust is your ultimate companion for creating seamless travel itineraries. Whether you're exploring a new city or embarking on a grand adventure, our app simplifies the planning process so you can focus on making memories.
        </p>
        <p className="mt-0 mb-2 text-gray-500 dark:text-gray-400 md:hidden px-6 py-3 text-justify">
          Explore top attractions, hidden gems, and local favorites with ease using our intuitive itinerary builder. Plan your trip confidently and share it with friends and family for seamless coordination.
        </p>
        <p className="mt-0 mb-2 text-gray-500 dark:text-gray-400 md:hidden px-6 py-3 text-justify">
          Join the thousands of other travelers who trust Wanderlust to plan their adventures worldwide.
        </p>
      </div>
    </div>
  );
}