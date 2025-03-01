import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies, searchMovies } from "../services/api"
import "../css/Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (err) {
        setError("Could not fetch movies...")
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    if (isLoading) return

    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await searchMovies(searchQuery)
      if (searchResults.length === 0) {
        setError("Could not find any movies")
        setMovies([])
      } else setMovies(searchResults)
    } catch (err) {
      setError("Could not fetch movies...")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          placeholder="Search for movies..."
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
