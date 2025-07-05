"use client"

import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { CheckCircle, Calendar, MapPin, Clock, Users, Ticket, Download, Share } from "lucide-react"

export function BookingNotification({ open, onClose, bookingData, onNewBooking }) {
  if (!bookingData) return null

  const bookingId = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  const handleNewBooking = () => {
    onClose()
    onNewBooking()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0 p-0 overflow-hidden">
        <div className="relative">
          {/* Success Animation Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse"></div>

          <Card className="bg-transparent border-0 shadow-none">
            <CardContent className="p-6 space-y-6 relative z-10">
              {/* Success Icon */}
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-green-100">Your tickets have been successfully booked</p>
              </div>

              {/* Ticket Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="font-bold text-lg">🎬 {bookingData.movie}</span>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">#{bookingId}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-200" />
                    <span>{bookingData.cinema}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-200" />
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-200" />
                    <span>
                      {bookingData.timeSlot} • {bookingData.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-200" />
                    <span>
                      {bookingData.persons} Person{bookingData.persons > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-green-200" />
                    <span>Seats: {bookingData.seats.map((seat) => seat.id).join(", ")}</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-yellow-300">${bookingData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    onClick={() => alert("Ticket downloaded!")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    onClick={() => alert("Sharing options opened!")}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button
                  onClick={handleNewBooking}
                  className="w-full bg-white text-green-600 hover:bg-green-50 font-bold py-3 transition-all duration-300 hover:scale-105"
                >
                  Book Another Movie
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-green-200">
                <p>Please arrive 15 minutes before showtime</p>
                <p>Show this confirmation at the cinema entrance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
