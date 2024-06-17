import { useContext } from "react";
import { UserContext } from "../context/userContext";

interface VacationFormData {
  city: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  userId: number;
}

export interface Vacation {
  id: number;
  city: string;
}

export async function submitVacation(
  formData: VacationFormData,
  addVacation: (vacation: Vacation) => void
) {
  try {
    const response = await fetch("http://localhost:3000/api/vacations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit vacation form");
    }

    const data = await response.json();
    addVacation(data);
  } catch (error) {
    console.error("Error submitting vacation form:", error);
  }
}
