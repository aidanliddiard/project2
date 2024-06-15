import React, { useEffect, useState } from "react";
import { fetchVacations } from "../services/vacations";
import NavBar from "../components/NavBar";
import { useUserContext } from "../context/userContext";

interface VacationObject {
  id: number;
  city: string;
  country: string;
  description?: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  alt: string;
  userId: Number;
}

interface User {
  name: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  return date.toLocaleDateString(undefined, options).replace(/\//g, "/");
}

function formatRange(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function Vacations() {
  const { currentUser }: { currentUser: User } = useUserContext();
  const userName: string = currentUser.name;
  const [vacation, setVacation] = useState<VacationObject[]>([]);

  useEffect(() => {
    const fetchVacationData = async () => {
      const resp = await fetchVacations();
      setVacation(resp);
    };
    fetchVacationData();
  }, []);

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 h-full">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{userName}'s Vacations</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 pt-6">
            {vacation === null ? (
              <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <a href="#" className="block">
                    <img className="w-24 h-24 mx-auto mb-3 filter brightness-75" src="images/image-not-found.png" alt="Image Not Found" />
                    <h6 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">It appears there are no vacations scheduled at the moment.</h6>
                    <p className="text-center font-normal text-gray-700 dark:text-gray-400 pb-6">Start planning your next trip by creating one!</p>
                    <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto block dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Create Vacation</button>
                  </a>
                </div>
              </div>
            ) :
              vacation.map((vacation: VacationObject, index: number) => (
                <div
                  key={vacation.id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card grid-cols-3 gap-3"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg h-60 w-full object-cover"
                      src={vacation.imageUrl}
                      alt={vacation.alt}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {vacation.city}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {formatDate(vacation.startDate)} -{" "}
                      {formatDate(vacation.endDate)}
                    </p>
                    <a
                      href={`/vacations/${vacation.id}/`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View details
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
