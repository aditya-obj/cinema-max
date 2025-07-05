"use client"

import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Calendar, MapPin, Film, ArrowLeft, Armchair, X } from "lucide-react"

export function QuickBookSidebar({
  bookingStep,
  selectedMovie,
  setSelectedMovie,
  selectedCinema,
  setSelectedCinema,
  selectedDate,
  setSelectedDate,
  selectedTiming,
  setSelectedTiming,
  onPickSeat,
  onReset,
  onClose,
  showCloseButton = false,
}) {
  const handleQuickBook = () => {
    if (!selectedMovie || !selectedCinema || !selectedDate) {
      alert("Please select all fields to continue booking!")
      return
    }
    onPickSeat()
  }

  // Updated movie list to match hero section movies
  const movieOptions = [
    "Avatar: The Way of Water",
    "Black Panther: Wakanda Forever",
    "Top Gun: Maverick",
    "Doctor Strange: Multiverse",
    "The Batman",
    "Spider-Man: No Way Home",
    "Dune: Part Two",
    "Oppenheimer",
    "Guardians of Galaxy 3",
    "John Wick 4",
    "Fast X",
  ]

  return (
    <Card className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 text-white border-0 shadow-2xl overflow-hidden transition-all duration-500">
      <CardHeader className="bg-black/20 backdrop-blur-sm p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
          {bookingStep === "theater" && (
            <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20 mr-2" onClick={onReset}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-sm sm:text-base">
            {bookingStep === "movies" ? "⚡" : "🎭"}
          </div>
          <span className="flex-1">{bookingStep === "movies" ? "Quick Book" : "Theater Booking"}</span>
          {showCloseButton && onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-white hover:bg-white/20 lg:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Booking Type Toggle */}
        <div className="flex gap-1 bg-black/20 p-1 rounded-xl">
          <button
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
              bookingStep === "movies" ? "bg-white text-orange-600 shadow-lg" : "text-white/80 hover:text-white"
            }`}
            disabled={bookingStep === "theater"}
          >
            <Film className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Movies</span>
            <span className="sm:hidden">Films</span>
          </button>
          <button
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
              bookingStep === "theater" ? "bg-white text-orange-600 shadow-lg" : "text-white/80 hover:text-white"
            }`}
            disabled={bookingStep === "movies"}
          >
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Theaters</span>
            <span className="sm:hidden">Places</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Movie Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-100">
              <Film className="h-3 w-3 sm:h-4 sm:w-4" />
              Select Movie
            </label>
            <Select value={selectedMovie} onValueChange={setSelectedMovie} disabled={bookingStep === "theater"}>
              <SelectTrigger className="bg-white/90 text-black border-0 h-10 sm:h-12 rounded-xl font-medium text-sm">
                <SelectValue placeholder="Choose your movie" />
              </SelectTrigger>
              <SelectContent>
                {movieOptions.map((movie) => (
                  <SelectItem key={movie} value={movie}>
                    {movie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cinema Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-100">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              Select Cinema
            </label>
            <Select value={selectedCinema} onValueChange={setSelectedCinema} disabled={bookingStep === "theater"}>
              <SelectTrigger className="bg-white/90 text-black border-0 h-10 sm:h-12 rounded-xl font-medium text-sm">
                <SelectValue placeholder="Choose cinema location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CinemaMax Downtown">CinemaMax Downtown</SelectItem>
                <SelectItem value="Grand Theater Mall">Grand Theater Mall</SelectItem>
                <SelectItem value="Movie Palace IMAX">Movie Palace IMAX</SelectItem>
                <SelectItem value="Starlight Cinema">Starlight Cinema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-100">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              Select Date
            </label>
            <Select value={selectedDate} onValueChange={setSelectedDate} disabled={bookingStep === "theater"}>
              <SelectTrigger className="bg-white/90 text-black border-0 h-10 sm:h-12 rounded-xl font-medium text-sm">
                <SelectValue placeholder="Pick your date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today - Dec 15">Today - Dec 15</SelectItem>
                <SelectItem value="Tomorrow - Dec 16">Tomorrow - Dec 16</SelectItem>
                <SelectItem value="This Weekend">This Weekend</SelectItem>
                <SelectItem value="Next Week">Next Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {bookingStep === "movies" ? (
          <Button
            onClick={handleQuickBook}
            className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-lg"
          >
            <Armchair className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Pick Seat
          </Button>
        ) : (
          <div className="bg-white/20 p-4 rounded-xl">
            <h3 className="font-semibold mb-2 text-sm">Selected:</h3>
            <div className="space-y-1 text-xs">
              <p>🎬 {selectedMovie}</p>
              <p>🏢 {selectedCinema}</p>
              <p>📅 {selectedDate}</p>
              {selectedTiming && <p>🕐 {selectedTiming}</p>}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold">50+</div>
            <div className="text-xs text-orange-200">Movies</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold">15</div>
            <div className="text-xs text-orange-200">Cinemas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
