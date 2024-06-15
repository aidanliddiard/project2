const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export async function fetchImages(city: string) {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&order_by=views&query=${city}&client_id=${API_KEY}`
  );
  const resp = await data.json();
  return resp;
}
