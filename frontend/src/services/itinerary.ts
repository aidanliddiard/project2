import { ItineraryObject } from "../components/ItineraryForm"

const url = "http://localhost:3000"

export async function fetchCategory() {
  try {
    const response = await fetch(`${url}/api/category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('A problem occurred when fetching the categories:', error);
    throw error;
  }
}

export async function fetchTime() {
  try {
    const response = await fetch(`${url}/api/time`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('A problem occurred when fetching the time:', error);
    throw error;
  }
}

export async function createItinerary(newData: ItineraryObject) {
    const itinerary = await fetch(`${url}/api/vacations/${newData.vacation_id}/itinerary`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newData)
    })
    return await itinerary.json();
}

export async function getVacations(){
  const vacations = await fetch(`${url}/api/vacations`);
  return await vacations.json();
}