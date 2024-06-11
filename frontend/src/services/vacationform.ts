interface VacationFormData {
  city: string;
  country: string;
  description: string;
  start_date: string;
  end_date: string;
  user_id: number;
}

export async function submitVacation(formData: VacationFormData) {
    try {
      const response = await fetch("http://localhost:3000/api/vacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit vacation form");
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error submitting vacation form:", (error as Error).message);
      throw error;
    }
  }

