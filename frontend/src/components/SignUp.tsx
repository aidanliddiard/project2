import { useEffect, useState } from "react";
import { fetchTime } from "../services/vacations";

interface TimeObject {
  time: string;
  id: number;
}

export default function SignUp() {
  const [time, setTime] = useState<TimeObject[]>([]);

  useEffect(() => {
    const fetchTimeData = async () => {
      const resp = await fetchTime();
      console.log(resp);
      setTime(resp);
    };
    fetchTimeData();
  }, []);

  return (
    <div>
      <p>Hello Aidan!!</p>
      {time.map((t: TimeObject) => (
        <p key={t.id}>{t.time}</p>
      ))}
    </div>
  );
}
