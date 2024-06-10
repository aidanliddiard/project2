import { useEffect, useState } from "react";
import { fetchVacations } from "../services/vacations";

interface VacationObject {
    id: number;
    city: string;
    country: string;
    description?: string;
    start_date: string;
    end_date: string; 
    user_id: Number;
}

export default function Vacations() {
    const [vacation, setVacation] = useState<VacationObject[]>([]);
  
    useEffect(() => {
      const fetchVacationData = async () => {
        const resp = await fetchVacations();
        setVacation(resp);
      };
      fetchVacationData();
    }, []);
  
    return (
      <div>
        {vacation.map((vacation: VacationObject, index: number) => (
          <div key={index}>
            <p>{vacation.city}</p>
            <p>{vacation.country}</p>
            <p>{vacation.description}</p>
            <p>{vacation.start_date}</p>
            <p>{vacation.end_date}</p>
          </div>
        ))}
      </div>
    );
  }