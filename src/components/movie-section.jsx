"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Star, Clock, Calendar } from "lucide-react"

export function MovieSection({ onMovieSelect, searchQuery = "" }) {
  const [activeTab, setActiveTab] = useState("now-showing")
  const [selectedTimings, setSelectedTimings] = useState({})
  const [filteredMovies, setFilteredMovies] = useState([])

  const allMovies = {
    "now-showing": [
      {
        id: 1,
        title: "Spider-Man: No Way Home",
        image: "/movies/spider.png",
        rating: 8.9,
        duration: "148 min",
        genre: "Action, Adventure",
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
        price: "$12.99",
      },
      {
        id: 2,
        title: "Dune: Part Two",
        image: "/movies/dunc.png",
        rating: 8.7,
        duration: "166 min",
        genre: "Sci-Fi, Adventure",
        showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
        price: "$14.99",
      },
      {
        id: 3,
        title: "Oppenheimer",
        image: "/movies/oppenheimer.png",
        rating: 9.2,
        duration: "180 min",
        genre: "Biography, Drama",
        showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        price: "$13.99",
      },
      {
        id: 4,
        title: "Guardians of Galaxy 3",
        image: "/movies/gog.png",
        rating: 8.4,
        duration: "150 min",
        genre: "Action, Comedy",
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
        price: "$12.99",
      },
      {
        id: 5,
        title: "John Wick 4",
        image: "/movies/john.png",
        rating: 8.6,
        duration: "169 min",
        genre: "Action, Thriller",
        showtimes: ["1:00 PM", "4:30 PM", "8:00 PM"],
        price: "$13.99",
      },
      {
        id: 6,
        title: "Fast X",
        image: "/movies/x.png",
        rating: 7.8,
        duration: "141 min",
        genre: "Action, Adventure",
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
        price: "$12.99",
      },
      // Add hero movies to now-showing
      {
        id: 14,
        title: "Avatar: The Way of Water",
        image: "/movies/avatar.png",
        rating: 8.5,
        duration: "192 min",
        genre: "Sci-Fi, Adventure",
        showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
        price: "$15.99",
      },
      {
        id: 15,
        title: "Black Panther: Wakanda Forever",
        image: "/movies/black-panther.png",
        rating: 8.2,
        duration: "161 min",
        genre: "Action, Adventure",
        showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
        price: "$14.99",
      },
      {
        id: 16,
        title: "Top Gun: Maverick",
        image: "/movies/top-gun.png",
        rating: 9.1,
        duration: "130 min",
        genre: "Action, Drama",
        showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        price: "$13.99",
      },
      {
        id: 17,
        title: "Doctor Strange: Multiverse",
        image: "/movies/dr-strange.png",
        rating: 7.8,
        duration: "126 min",
        genre: "Action, Fantasy",
        showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
        price: "$12.99",
      },
      {
        id: 18,
        title: "The Batman",
        image: "/movies/the-batman.png",
        rating: 8.7,
        duration: "176 min",
        genre: "Action, Crime",
        showtimes: ["2:00 PM", "6:00 PM", "10:00 PM"],
        price: "$13.99",
      },
    ],
    "coming-soon": [
      {
        id: 7,
        title: "Avengers: Secret Wars",
        image: "/movies/avengers.png",
        rating: 0,
        duration: "TBA",
        genre: "Action, Adventure",
        showtimes: [],
        price: "Pre-order $15.99",
        releaseDate: "May 2025",
      },
      {
        id: 8,
        title: "Deadpool 3",
        image: "/movies/deadpool.png",
        rating: 0,
        duration: "TBA",
        genre: "Action, Comedy",
        showtimes: [],
        price: "Pre-order $14.99",
        releaseDate: "July 2024",
      },
      {
        id: 9,
        title: "Fantastic Four",
        image: "/movies/ff.png",
        rating: 0,
        duration: "TBA",
        genre: "Action, Adventure",
        showtimes: [],
        price: "Pre-order $13.99",
        releaseDate: "February 2025",
      },
      {
        id: 10,
        title: "Blade",
        image: "/movies/blade.png",
        rating: 0,
        duration: "TBA",
        genre: "Action, Horror",
        showtimes: [],
        price: "Pre-order $14.99",
        releaseDate: "November 2025",
      },
    ],
    imax: [
      {
        id: 11,
        title: "Dune: Part Two",
        image: "/movies/dunc.png",
        rating: 8.7,
        duration: "166 min",
        genre: "Sci-Fi, Adventure",
        showtimes: ["2:00 PM", "6:00 PM", "10:00 PM"],
        price: "$19.99",
        format: "IMAX 70mm",
      },
      {
        id: 12,
        title: "Oppenheimer",
        image: "/movies/oppenheimer.png",
        rating: 9.2,
        duration: "180 min",
        genre: "Biography, Drama",
        showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
        price: "$21.99",
        format: "IMAX 70mm",
      },
      {
        id: 13,
        title: "Avatar: The Way of Water",
        image: "/movies/avatar.png",
        rating: 8.5,
        duration: "192 min",
        genre: "Sci-Fi, Adventure",
        showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        price: "$22.99",
        format: "IMAX 3D",
      },
    ],
  }

  const tabs = [
    { id: "now-showing", label: "Now Showing", count: 0 },
    { id: "coming-soon", label: "Coming Soon", count: 0 },
    { id: "imax", label: "IMAX", count: 0 },
  ]

  // Filter movies based on search query
  useEffect(() => {
    const currentMovies = allMovies[activeTab] || []

    if (!searchQuery.trim()) {
      setFilteredMovies(currentMovies)
    } else {
      const filtered = currentMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredMovies(filtered)
    }
  }, [searchQuery, activeTab])

  // Update tab counts
  tabs[0].count = filteredMovies.length || allMovies["now-showing"].length
  tabs[1].count = activeTab === "coming-soon" ? filteredMovies.length : allMovies["coming-soon"].length
  tabs[2].count = activeTab === "imax" ? filteredMovies.length : allMovies["imax"].length

  const handleTimingSelect = (movieId, timing) => {
    setSelectedTimings((prev) => ({
      ...prev,
      [movieId]: timing,
    }))
  }

  const handleBookTicket = (movie) => {
    if (activeTab === "coming-soon") {
      // Enhanced pre-order functionality
      const preOrderData = {
        title: movie.title,
        releaseDate: movie.releaseDate,
        price: movie.price,
        genre: movie.genre,
      }

      alert(`🎬 PRE-ORDER CONFIRMED!

Movie: ${preOrderData.title}
Genre: ${preOrderData.genre}
Release Date: ${preOrderData.releaseDate}
Price: ${preOrderData.price}

✅ You'll be notified when tickets are available
✅ Priority booking access
✅ Exclusive pre-order benefits

Thank you for your pre-order!`)
    } else {
      const selectedTiming = selectedTimings[movie.id]
      onMovieSelect(movie.title, selectedTiming)
      // Scroll to sidebar
      document.querySelector("aside")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentMovies = filteredMovies.length > 0 ? filteredMovies : allMovies[activeTab] || []

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="bg-orange-500/20 px-4 sm:px-6 py-2 border-b border-white/20">
          <p className="text-white text-sm">
            {filteredMovies.length > 0
              ? `Found ${filteredMovies.length} movie${filteredMovies.length !== 1 ? "s" : ""} for "${searchQuery}"`
              : `No movies found for "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/20 bg-black/20 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-semibold transition-all duration-500 relative group whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id ? "bg-orange-500 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="flex items-center gap-2 text-sm sm:text-base">
              {tab.label}
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs transition-all duration-300 group-hover:bg-white/30">
                {tab.count}
              </span>
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-300 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="p-4 sm:p-6 lg:p-8">
        {currentMovies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-white text-xl font-bold mb-2">No movies found</h3>
            <p className="text-gray-300">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {currentMovies.map((movie, index) => (
              <Card
                key={movie.id}
                className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 group-hover:bg-orange-400 group-hover:scale-105">
                    {movie.price}
                  </div>
                  {movie.rating > 0 && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-black/70">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs sm:text-sm font-semibold">{movie.rating}</span>
                    </div>
                  )}
                  {movie.format && (
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold transition-all duration-300 group-hover:bg-blue-500">
                      {movie.format}
                    </div>
                  )}
                </div>

                <CardContent className="p-4 sm:p-6 text-white">
                  <h3 className="font-bold text-lg sm:text-xl mb-3 group-hover:text-orange-300 transition-colors duration-300 line-clamp-2">
                    {movie.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{movie.duration}</span>
                      <span className="text-orange-300">•</span>
                      <span className="truncate">{movie.genre}</span>
                    </div>
                    {movie.releaseDate && (
                      <div className="text-orange-300 text-sm font-semibold animate-pulse">
                        Release: {movie.releaseDate}
                      </div>
                    )}
                  </div>

                  {movie.showtimes && movie.showtimes.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                        <span className="text-xs sm:text-sm font-semibold text-orange-300">Showtimes Today</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {movie.showtimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimingSelect(movie.id, time)}
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                              selectedTimings[movie.id] === time
                                ? "bg-orange-500 text-white shadow-lg"
                                : "bg-white/20 hover:bg-white/30"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => handleBookTicket(movie)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 sm:py-3 rounded-xl transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 text-sm sm:text-base"
                  >
                    {activeTab === "coming-soon" ? (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Pre-order Now
                      </>
                    ) : (
                      "Book Tickets"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
