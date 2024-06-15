import { ItineraryObject } from "../components/ItineraryForm";
const url = "http://localhost:3000";
export async function fetchCategory() {
  try {
    const response = await fetch(`${url}/api/vacations/itinerary/category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("A problem occurred when fetching the categories:", error);
    throw error;
  }
}
export async function fetchTime() {
  try {
    const response = await fetch(`${url}/api/vacations/itinerary/time`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("A problem occurred when fetching the time:", error);
    throw error;
  }
}
export async function createItinerary(newData: ItineraryObject) {
  const itinerary = await fetch(
    `${url}/api/vacations/${newData.vacationId}/itinerary`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(newData),
    }
  );
  return await itinerary.json();
}
export async function getItinerary(vacationId: number) {
  const itinerary = await fetch(
    `${url}/api/vacations/${vacationId}/itinerary`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    }
  );

  const response = await itinerary.json();
  return response;
}

export async function deleteItinerary(id: number, vacation_id: number) {
  const itinerary = await fetch(
    `${url}/api/vacations/${vacation_id}/itinerary/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    }
  );

  if (!itinerary.ok) {
    throw new Error(`HTTP error! status: ${itinerary.status}`);
  }
  return itinerary.status;
}

export async function getItineraryById(id: number, vacationId: number) {
  const itinerary = await fetch(
    `${url}/api/vacations/${vacationId}/itinerary/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    }
  );

  if (!itinerary.ok) {
    throw new Error(`HTTP error! status: ${itinerary.status}`);
  }
  return await itinerary.json();
}

export async function updateItinerary(
  id: number,
  vacation_id: number,
  newData: ItineraryObject
) {
  const itinerary = await fetch(
    `${url}/api/vacations/${newData.vacationId}/itinerary/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(newData),
    }
  );

  if (!itinerary.ok) {
    throw new Error(`HTTP error! status: ${itinerary.status}`);
  }
  return itinerary.status;
}
