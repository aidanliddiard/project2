export async function fetchCategory() {
  try {
    const response = await fetch("http://localhost:3000/api/category");
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
    const response = await fetch("http://localhost:3000/api/time");
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