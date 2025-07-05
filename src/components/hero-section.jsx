"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

export function HeroSection({ onMovieSelect }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  const heroMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      image: "/placeholder.svg?height=500&width=800&text=Avatar+Hero",
      description: "Return to Pandora and experience the magic of James Cameron's epic sequel",
      rating: "8.5/10",
      genre: "Sci-Fi, Adventure",
      duration: "192 min",
    },
    {
      id: 2,
      title: "Black Panther: Wakanda Forever",
      image: "/placeholder.svg?height=500&width=800&text=Black+Panther+Hero",
      description: "Honor the legacy of T'Challa in this powerful Marvel sequel",
      rating: "8.2/10",
      genre: "Action, Adventure",
      duration: "161 min",
    },
    {
      id: 3,
      title: "Top Gun: Maverick",
      image: "/placeholder.svg?height=500&width=800&text=Top+Gun+Hero",
      description: "Feel the need for speed in this thrilling aerial adventure",
      rating: "9.1/10",
      genre: "Action, Drama",
      duration: "130 min",
    },
    {
      id: 4,
      title: "Doctor Strange: Multiverse",
      image: "/placeholder.svg?height=500&width=800&text=Doctor+Strange+Hero",
      description: "Journey through the multiverse with the Master of Mystic Arts",
      rating: "7.8/10",
      genre: "Action, Fantasy",
      duration: "126 min",
    },
    {
      id: 5,
      title: "The Batman",
      image: "/placeholder.svg?height=500&width=800&text=The+Batman+Hero",
      description: "Witness the Dark Knight's most gripping detective story yet",
      rating: "8.7/10",
      genre: "Action, Crime",
      duration: "176 min",
    },
  ]

  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === heroMovies.length - 1 ? 0 : prevSlide + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? heroMovies.length - 1 : prevSlide - 1))
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const handleBookNow = (movieTitle) => {
    onMovieSelect(movieTitle)
  }

  const currentMovie = heroMovies[currentSlide]

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
      <Card className="border-0 bg-transparent">
        <CardContent className="p-0">
          <div
            className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={currentMovie.image || "/placeholder.svg"}
                alt={currentMovie.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">NOW SHOWING</span>
                      <span>{currentMovie.rating}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight animate-slide-up">
                      {currentMovie.title}
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg animate-slide-up">
                      {currentMovie.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 animate-slide-up">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {currentMovie.genre}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {currentMovie.duration}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-bounce-in">
                    <Button
                      onClick={() => handleBookNow(currentMovie.title)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 text-sm sm:text-base"
                    >
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Improved Navigation Buttons for Small Screens */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-20 
                         w-10 h-10 sm:w-12 sm:h-12 
                         bg-black/50 hover:bg-black/70 
                         backdrop-blur-sm border border-white/20 
                         text-white rounded-full 
                         transition-all duration-300 
                         opacity-80 sm:opacity-0 sm:group-hover:opacity-100
                         hover:scale-110 active:scale-95
                         flex items-center justify-center
                         shadow-lg hover:shadow-xl"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-20 
                         w-10 h-10 sm:w-12 sm:h-12 
                         bg-black/50 hover:bg-black/70 
                         backdrop-blur-sm border border-white/20 
                         text-white rounded-full 
                         transition-all duration-300 
                         opacity-80 sm:opacity-0 sm:group-hover:opacity-100
                         hover:scale-110 active:scale-95
                         flex items-center justify-center
                         shadow-lg hover:shadow-xl"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Mobile Swipe Hint */}
            {showSwipeHint && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden animate-pulse z-20">
                <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-medium border border-white/20 flex items-center gap-2 shadow-lg">
                  <span>👈</span>
                  <span>Swipe to browse</span>
                  <span>👉</span>
                </div>
              </div>
            )}

            {/* Slide Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex space-x-2">
                {heroMovies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-orange-500 scale-125 shadow-lg" : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Counter for Mobile */}
            <div className="absolute top-4 right-4 sm:hidden z-20">
              <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium border border-white/20">
                {currentSlide + 1}/{heroMovies.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
