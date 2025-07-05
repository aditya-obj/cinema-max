"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"

export function SeatSelectionDialog({ open, onClose, movieTitle, cinema, date, timing, onConfirm }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  // Generate theater seats
  const generateSeats = () => {
    const seats = []
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const seatsPerRow = 12

    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        let type = "regular"
        let price = 12.99

        // Premium seats (first 3 rows, center seats)
        if (rowIndex < 3 && seatNum >= 4 && seatNum <= 9) {
          type = "premium"
          price = 18.99
        }
        // Economy seats (last 3 rows)
        else if (rowIndex >= 7) {
          type = "economy"
          price = 9.99
        }

        // Some seats are occupied (random)
        const isOccupied = Math.random() < 0.15

        seats.push({
          id: `${row}${seatNum}`,
          row,
          number: seatNum,
          type,
          status: isOccupied ? "occupied" : "available",
          price,
        })
      }
    })

    return seats
  }

  const [seats] = useState(generateSeats())

  const handleSeatClick = (seat) => {
    if (seat.status === "occupied") return

    const isSelected = selectedSeats.some((s) => s.id === seat.id)

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
    } else {
      if (selectedSeats.length < 8) {
        // Max 8 seats
        setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }])
      }
    }
  }

  const getSeatColor = (seat) => {
    if (selectedSeats.some((s) => s.id === seat.id)) {
      return "bg-orange-500 hover:bg-orange-600 border-orange-400 shadow-lg shadow-orange-500/50 scale-110"
    }

    switch (seat.status) {
      case "occupied":
        return "bg-red-500/80 cursor-not-allowed border-red-400/60"
      case "available":
        switch (seat.type) {
          case "premium":
            return "bg-purple-400/40 hover:bg-purple-500/60 border-purple-300/50 cursor-pointer hover:scale-105 hover:shadow-md"
          case "regular":
            return "bg-blue-400/40 hover:bg-blue-500/60 border-blue-300/50 cursor-pointer hover:scale-105 hover:shadow-md"
          case "economy":
            return "bg-green-400/40 hover:bg-green-500/60 border-green-300/50 cursor-pointer hover:scale-105 hover:shadow-md"
        }
      default:
        return "bg-gray-600/40"
    }
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!")
      return
    }

    const bookingData = {
      movie: movieTitle,
      cinema: cinema,
      date: date,
      timeSlot: timing || "8:30 PM",
      language: "English", // This would come from theater booking
      persons: selectedSeats.length,
      seats: selectedSeats.map((seat) => ({
        id: seat.id,
        type: seat.type,
        price: seat.price,
      })),
      totalPrice: totalPrice,
    }

    onConfirm(bookingData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-orange-400">Select Your Seats</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-slate-800 transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Movie Info */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">{movieTitle}</h3>
            <p className="text-gray-300">
              {cinema} • {date} • {timing || "8:30 PM"} • English
            </p>
          </div>

          {/* Screen */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-600 to-gray-400 h-3 rounded-full mx-auto w-3/4 mb-3 shadow-lg"></div>
            <p className="text-gray-400 text-sm font-semibold">SCREEN</p>
          </div>

          {/* Seat Map */}
          <div className="space-y-2">
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((row) => (
              <div key={row} className="flex items-center justify-center gap-1">
                <div className="w-8 text-center font-bold text-gray-400">{row}</div>
                <div className="flex gap-1">
                  {seats
                    .filter((seat) => seat.row === row)
                    .map((seat) => (
                      <button
                        key={seat.id}
                        className={`w-8 h-8 rounded-t-lg border-2 transition-all duration-300 text-xs font-bold ${getSeatColor(
                          seat,
                        )}`}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === "occupied"}
                        title={`${seat.id} - $${seat.price} (${seat.type})`}
                      >
                        {seat.number}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400/40 rounded border border-green-300/50"></div>
              <span>Economy ($9.99)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400/40 rounded border border-blue-300/50"></div>
              <span>Regular ($12.99)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-400/40 rounded border border-purple-300/50"></div>
              <span>Premium ($18.99)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded border shadow-lg"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/80 rounded border"></div>
              <span>Occupied</span>
            </div>
          </div>

          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <div className="bg-slate-800 p-4 rounded-lg animate-fade-in">
              <h4 className="font-bold mb-2">Selected Seats ({selectedSeats.length})</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSeats.map((seat) => (
                  <Badge
                    key={seat.id}
                    variant="secondary"
                    className="bg-orange-500 text-white transition-all duration-300 hover:scale-105"
                  >
                    {seat.id} - ${seat.price}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
                <Button
                  onClick={handleConfirmBooking}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
