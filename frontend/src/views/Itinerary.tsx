import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import ItineraryCard from "../components/ItineraryCard";
import { LuFerrisWheel } from "react-icons/lu";
import { FaUtensils, FaHotel } from "react-icons/fa";
import { getItinerary } from "../services/itinerary";
import { fetchVacations } from "../services/vacations";
import { IconType } from "react-icons";

interface VacationFormData {
  id: number;
  city: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  user_id: number;
}

export interface ItineraryData {
  id: number;
  name: string;
  price: number;
  address: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  type: string;
  website: string;
  icon: IconType;
  vacationId: number;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero
  const day = ("0" + date.getDate()).slice(-2); // add leading zero
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export default function Itinerary() {
  const { id } = useParams<{ id: string }>();
  const [vacation, setVacation] = useState<VacationFormData[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryData[]>([]);
  const [hotels, setHotels] = useState<ItineraryData[]>([]);
  const [restaurants, setRestaurants] = useState<ItineraryData[]>([]);
  const [activities, setActivities] = useState<ItineraryData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacationData = async () => {
      const resp = await fetchVacations();
      const vacationData = resp.filter(
        (vacation: VacationFormData) => vacation.id === Number(id)
      );
      setVacation(vacationData);
      setImage(vacationData[0]?.imageUrl);
    };

    const fetchItineraryData = async () => {
      const response = await getItinerary(Number(id));
      setItinerary(response);
    };

    fetchVacationData();
    fetchItineraryData();
  }, []);

  useEffect(() => {
    const hotels = itinerary.filter((item) => item.type === "Hotel");
    const restaurants = itinerary.filter((item) => item.type === "Restaurant");
    const activities = itinerary.filter((item) => item.type === "Activity");
    setHotels(hotels);
    setRestaurants(restaurants);
    setActivities(activities);
  }, [itinerary]);

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-10 dark:bg-gray-900">
        <div
          id="hero"
          className="w-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${image})`,
            height: "40vh",
          }}
        >
          <div className="flex items-center justify-center pt-5 w-full h-full bg-gray-900 bg-opacity-50 py-12">
            <div className="text-center">
              <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="mt-8 mb-5 text-4xl lg:text-5xl font-bold text-gray-100">
                    {`Your Trip to ${vacation[0]?.city}, ${vacation[0]?.country}`}
                  </h2>
                  {vacation[0]?.description ? (
                    <p className="max-w-3xl mx-auto text-xl text-gray-300">
                      {vacation[0]?.description}
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="max-w-3xl mx-auto mb-10 text-md text-gray-300">
                    {formatDate(vacation[0]?.startDate)} -{" "}
                    {formatDate(vacation[0]?.endDate)}
                  </p>

                  <button
                    onClick={() => navigate("/create-itinerary")}
                    className="inline-block w-full md:w-auto mb-4 md:mr-6 py-3 px-5 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
                  >
                    Create a New Itinerary Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="vacationData"
          className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 pt-5"
        >
          <div>
            <p
              id="hotel"
              className="bg-blue-300 dark:bg-blue-800 dark:text-gray-200 font-semibold uppercase tracking-widest text-center py-2 rounded-md"
            >
              Hotel
            </p>
            <div id="hotelCards">
              {hotels.map((hotel) => {
                return (
                  <ItineraryCard
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    price={hotel.price}
                    address={hotel.address}
                    description={hotel.description}
                    startDate={hotel.startDate}
                    endDate={hotel.endDate}
                    time={hotel.time}
                    website={hotel.website}
                    icon={FaHotel}
                    vacationId={hotel.vacationId}
                    setItinerary={setItinerary}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <p
              id="restaurants"
              className="bg-blue-300 dark:bg-blue-800 dark:text-gray-200 font-semibold uppercase tracking-widest text-center py-2 rounded-md"
            >
              Restaurants
            </p>
            <div id="restaurantCards">
              {restaurants.map((restaurant) => {
                return (
                  <ItineraryCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    price={restaurant.price}
                    address={restaurant.address}
                    description={restaurant.description}
                    startDate={restaurant.startDate}
                    endDate={restaurant.endDate}
                    time={restaurant.time}
                    website={restaurant.website}
                    icon={FaUtensils}
                    vacationId={restaurant.vacationId}
                    setItinerary={setItinerary}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <p
              id="activities"
              className="bg-blue-300 dark:bg-blue-800 dark:text-gray-200 font-semibold uppercase tracking-widest text-center py-2 rounded-md"
            >
              Activities
            </p>
            <div id="activityCards">
              {activities.map((activity) => {
                return (
                  <ItineraryCard
                    key={activity.id}
                    id={activity.id}
                    name={activity.name}
                    price={activity.price}
                    address={activity.address}
                    description={activity.description}
                    startDate={activity.startDate}
                    endDate={activity.endDate}
                    time={activity.time}
                    website={activity.website}
                    icon={LuFerrisWheel}
                    vacationId={activity.vacationId}
                    setItinerary={setItinerary}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
