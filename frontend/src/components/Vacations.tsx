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

export default function VacationDetail() {
    const [vacation, setVacation] = useState<VacationObject[]>([]);
  
    useEffect(() => {
      const fetchVacationData = async () => {
        const resp = await fetchVacations();
        console.log(resp);
        setVacation(resp);
      };
      fetchVacationData();
    }, []);
  
    return (
      <div>
        <p>Hello Aidan!!</p>
        {vacation.map((vacation: VacationObject) => (
          <p key={vacation.city}>{vacation.city}</p>
        ))}
      </div>
    );
  }