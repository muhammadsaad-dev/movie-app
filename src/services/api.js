const API_KEY = "4c64b9abb95c8d8b3bfb2456880a08b7"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  )
  const data = await response.json()
  return data.results
}
