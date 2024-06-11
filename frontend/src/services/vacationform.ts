export async function submitVacation(formData) {
    console.log("Form Data", formData)
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
      console.error("Error submitting vacation form:", error.message);
      throw error;
    }
  }

