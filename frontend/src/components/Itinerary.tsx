import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar";
import { fetchImages } from "../services/images";
import ItineraryCard from "./ItineraryCard";
import { LuFerrisWheel } from "react-icons/lu";
import { FaUtensils } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { getVacations } from "../services/itinerary";

interface VacationFormData {
  id: number;
  city: string;
  country: string;
  description: string;
  start_date: string;
  end_date: string;
  user_id: number;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero
  const day = ("0" + date.getDate()).slice(-2); // add leading zero
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export default function Itinerary() {
  const { id } = useParams<{ id: string }>();
  const [vacation, setVacation] = useState<VacationFormData[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacationData = async () => {
      const resp = await getVacations();
      const vacationData = resp.filter(
        (vacation: VacationFormData) => vacation.id === Number(id)
      );
      console.log(vacationData);
      setVacation(vacationData);
      if (vacationData[0]?.city) {
        fetchImagesData(vacationData[0].city);
      }
    };

    const fetchImagesData = async (search: string) => {
      console.log(search);
      const results = await fetchImages(search);
      console.log(results.results[0].urls.full);
      setImage(results.results[0].urls.full);
    };

    fetchVacationData();
  }, []);

  return (
    <>
      <NavBar />
      <div
        id="hero"
        className="w-full bg-center h-50% bg-cover"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
          <div className="text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100">
                  {`Your Trip to ${vacation[0]?.city}, ${vacation[0]?.country}`}
                </h2>
                {vacation[0]?.description ? (
                  <p className="max-w-3xl mx-auto mb-5 text-lg text-gray-300"></p>
                ) : (
                  ""
                )}
                <p className="max-w-3xl mx-auto mb-10 text-md text-gray-300">
                  {formatDate(vacation[0]?.start_date)} -{" "}
                  {formatDate(vacation[0]?.end_date)}
                </p>
                <a
                  className="inline-block w-full md:w-auto mb-4 md:mr-6 py-3 px-5 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
                  href="http://localhost:8083/todos"
                >
                  Create a New Itinerary Item
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="vacationData"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pt-2"
      >
        <div>
          <p id="hotel" className="bg-gray-200">
            Hotel
          </p>
          <ItineraryCard icon={FaHotel} />
        </div>
        <div>
          <p id="restaurants" className="bg-gray-200">
            Restaurants
          </p>
        </div>
        <div>
          <p id="activities" className="bg-gray-200">
            Activities
          </p>
        </div>
      </div>
    </>
  );
}
