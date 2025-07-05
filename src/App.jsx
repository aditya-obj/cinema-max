"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { QuickBookSidebar } from "./components/quick-book-sidebar"
import { HeroSection } from "./components/hero-section"
import { MovieSection } from "./components/movie-section"
import { Advertisement } from "./components/advertisement"
import { TheaterBooking } from "./components/theater-booking"
import { SeatSelectionDialog } from "./components/seat-selection-dialog"
import { BookingNotification } from "./components/booking-notification"
import "./App.css"

function App() {
  const [bookingStep, setBookingStep] = useState("movies")
  const [selectedMovie, setSelectedMovie] = useState("")
  const [selectedCinema, setSelectedCinema] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTiming, setSelectedTiming] = useState("")
  const [showSeatDialog, setShowSeatDialog] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [showQuickBook, setShowQuickBook] = useState(false) // For mobile responsive
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleMovieSelect = (movieTitle, timing) => {
    setSelectedMovie(movieTitle)
    if (timing) {
      setSelectedTiming(timing)
    }
    // Show quick book on mobile when movie is selected
    setShowQuickBook(true)
  }

  const handleHeroBooking = (movieTitle) => {
    setSelectedMovie(movieTitle)
    setShowQuickBook(true)
    // Scroll to sidebar on mobile
    setTimeout(() => {
      document.querySelector("aside")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handlePickSeat = () => {
    if (!selectedMovie || !selectedCinema || !selectedDate) {
      alert("Please select all fields to continue!")
      return
    }
    setBookingStep("theater")
  }

  const handleSeatSelection = (data) => {
    setBookingData(data)
    setShowSeatDialog(false)
    setShowNotification(true)
  }

  const resetBooking = () => {
    setBookingStep("movies")
    setSelectedMovie("")
    setSelectedCinema("")
    setSelectedDate("")
    setSelectedTiming("")
    setBookingData(null)
    setShowNotification(false)
    setShowQuickBook(false)
  }

  const handleCloseQuickBook = () => {
    setShowQuickBook(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      <Header onSearch={handleSearch} />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pt-28 sm:pt-32">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar - Responsive visibility */}
          <aside
            className={`w-full lg:w-80 lg:flex-shrink-0 space-y-4 lg:space-y-6 transition-all duration-500 ${
              showQuickBook ? "block" : "hidden lg:block"
            }`}
          >
            <QuickBookSidebar
              bookingStep={bookingStep}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              selectedCinema={selectedCinema}
              setSelectedCinema={setSelectedCinema}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTiming={selectedTiming}
              setSelectedTiming={setSelectedTiming}
              onPickSeat={handlePickSeat}
              onReset={resetBooking}
              onClose={handleCloseQuickBook}
              showCloseButton={showQuickBook}
            />
            <div className="hidden sm:block">
              <Advertisement />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">
            {bookingStep === "movies" ? (
              <>
                <HeroSection onMovieSelect={handleHeroBooking} />
                <MovieSection onMovieSelect={handleMovieSelect} searchQuery={searchQuery} />
              </>
            ) : (
              <TheaterBooking
                selectedMovie={selectedMovie}
                selectedCinema={selectedCinema}
                selectedDate={selectedDate}
                selectedTiming={selectedTiming}
                onOpenSeatDialog={() => setShowSeatDialog(true)}
                onBack={() => setBookingStep("movies")}
              />
            )}
          </div>
        </div>

        {/* Mobile Advertisement */}
        <div className="sm:hidden mt-6">
          <Advertisement />
        </div>
      </main>

      {/* Seat Selection Dialog */}
      <SeatSelectionDialog
        open={showSeatDialog}
        onClose={() => setShowSeatDialog(false)}
        movieTitle={selectedMovie}
        cinema={selectedCinema}
        date={selectedDate}
        timing={selectedTiming}
        onConfirm={handleSeatSelection}
      />

      {/* Booking Notification */}
      <BookingNotification
        open={showNotification}
        onClose={() => setShowNotification(false)}
        bookingData={bookingData}
        onNewBooking={resetBooking}
      />
    </div>
  )
}

export default App
