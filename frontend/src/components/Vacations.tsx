import { useEffect, useState } from "react";
import { fetchVacations } from "../services/vacations";
import NavBar from "./NavBar";
import { useUserContext } from "../context/userContext";

interface VacationObject {
  id: number;
  city: string;
  country: string;
  description?: string;
  start_date: string;
  end_date: string;
  user_id: Number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export default function Vacations() {
  const { currentUser } = useUserContext();
  const userName = currentUser.name;

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
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">{userName}'s Vacations</h1>
      <div className="grid grid-cols-3 gap-3 pt-6">
            {vacation.map((vacation: VacationObject, index: number) => (
                <div key={vacation.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card grid-cols-3 gap-3">
                  <a href="#">
                    <img className="rounded-t-lg" src="frontend/src/components/paris.jpg" alt="paris" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{vacation.city}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{formatDate(vacation.start_date)} - {formatDate(vacation.end_date)}</p>
                    <a href={`/vacations/${vacation.id}/`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      View details
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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