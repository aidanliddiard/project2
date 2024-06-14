interface VacationFormData {
  city: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  userId: number;
}

export async function submitVacation(formData: VacationFormData) {
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
    return data;
  } catch (error) {
    console.error("Error submitting vacation form:", (error as Error).message);
    throw error;
  }
}
