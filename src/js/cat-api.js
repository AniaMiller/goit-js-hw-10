const API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_TelejvR3w6OrYaMpkZ6mR2YHiutN828MEZ7CGlSWZSqu5P3qkXs0V5EoxyodrdAa';

export async function fetchBreeds() {
  const response = await fetch(`${API_BASE_URL}/breeds?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

export async function fetchCatByBreed(breedId) {
  const response = await fetch(
    `${API_BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
