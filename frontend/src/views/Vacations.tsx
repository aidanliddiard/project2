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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVacationData = async () => {
      try {
        const resp = await fetchVacations();
        setVacation(resp);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVacationData();
  }, []);

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            {userName}'s Vacations
          </h1>
          {loading ? (
            <div role="status" className="mx-auto pt-40">
              <svg
                aria-hidden="true"
                className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : vacation === null ? (
            <div className="flex items-start h-screen pb-8">
              <div className="flex items-center pt-6">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <a href="#" className="block text-center pb-2">
                    <div className="block text-center pb-2">
                      <img
                        className="w-24 h-24 mx-auto mb-3 bg-white rounded-full p-1"
                        src="../images/image-not-found-light.png"
                        alt="Icon"
                      />
                      <h6 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                        It appears there are no vacations scheduled at the
                        moment.
                      </h6>
                      <p className="text-center font-normal text-gray-700 dark:text-gray-400 pb-6 pt-2">
                        Start planning your next trip by creating one!
                      </p>
                      <a
                        href="http://localhost:5173/create-vacation"
                        className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mx-auto block"
                      >
                        Create Vacation
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 pt-6 justify-center">
              {vacation.map((vacation: VacationObject, index: number) => (
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
                      href={`/vacations/${vacation.id}`}
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
          )}
        </div>
      </section>
    </>
  );
}
