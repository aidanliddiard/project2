export async function fetchVacations() {
  const response = await fetch("http://localhost:3000/api/vacations", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }, 
    credentials: 'include',
    mode: 'cors'
  });

  const data = await response.json();
  return data;
}

