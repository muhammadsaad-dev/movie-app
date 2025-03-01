import { createContext, useState, useEffect, useContext } from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites")
      return storedFavorites ? JSON.parse(storedFavorites) : []
    } catch (err) {
      console.log(err)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites((prev) => [...prev, movie])
    }
  }

  const removeFromFavorites = (movieID) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieID))
  }

  const isFavorite = (movieID) => {
    return favorites.some((movie) => movie.id === movieID)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
