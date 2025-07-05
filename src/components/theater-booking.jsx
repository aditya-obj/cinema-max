"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Clock, Globe, Users, Armchair, ArrowLeft } from "lucide-react"

export function TheaterBooking({
  selectedMovie,
  selectedCinema,
  selectedDate,
  selectedTiming,
  onOpenSeatDialog,
  onBack,
}) {
  const [selectedTime, setSelectedTime] = useState(selectedTiming || "")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [numberOfPersons, setNumberOfPersons] = useState("")

  // Update selected time when timing prop changes
  useEffect(() => {
    if (selectedTiming) {
      setSelectedTime(selectedTiming)
    }
  }, [selectedTiming])

  const timeSlots = [
    { time: "10:00 AM", available: true, price: "$12.99" },
    { time: "1:30 PM", available: true, price: "$14.99" },
    { time: "5:00 PM", available: false, price: "$16.99" },
    { time: "8:30 PM", available: true, price: "$18.99" },
    { time: "11:00 PM", available: true, price: "$14.99" },
  ]

  const languages = ["English", "Hindi", "Spanish", "French", "German"]

  const handleProceedToSeats = () => {
    if (!selectedTime || !selectedLanguage || !numberOfPersons) {
      alert("Please select all options to proceed!")
      return
    }
    onOpenSeatDialog()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Movie Info Header */}
      <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <CardTitle className="text-2xl font-bold">{selectedMovie}</CardTitle>
              <p className="text-orange-100">
                {selectedCinema} • {selectedDate}
                {selectedTiming && (
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded text-sm">⏰ {selectedTiming}</span>
                )}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Time Slots */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-400" />
            Select Show Time
            {selectedTiming && <span className="text-sm text-orange-300">(Pre-selected from movie card)</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                className={`p-4 rounded-xl border-2 transition-all duration-500 hover:scale-105 ${
                  selectedTime === slot.time
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : slot.available
                      ? "border-white/30 hover:border-orange-400 hover:bg-white/10"
                      : "border-gray-600 bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => slot.available && setSelectedTime(slot.time)}
              >
                <div className="font-semibold">{slot.time}</div>
                <div className="text-sm opacity-80">{slot.price}</div>
                {!slot.available && <div className="text-xs text-red-400">Sold Out</div>}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language & Persons Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
        {/* Language Selection */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white overflow-visible relative z-[200]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-orange-400" />
              Select Language
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-visible">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-white/90 text-black border-0 h-12 rounded-xl font-medium transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-orange-400">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Number of Persons */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white overflow-visible relative z-[200]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-400" />
              Number of Persons
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-visible">
            <Select value={numberOfPersons} onValueChange={setNumberOfPersons}>
              <SelectTrigger className="bg-white/90 text-black border-0 h-12 rounded-xl font-medium transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-orange-400">
                <SelectValue placeholder="Select persons" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "Persons"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Proceed Button */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg">Ready to select seats?</h3>
              <p className="text-gray-300">Choose your preferred seats from our interactive seat map</p>
            </div>
            <Button
              onClick={handleProceedToSeats}
              disabled={!selectedTime || !selectedLanguage || !numberOfPersons}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Armchair className="h-5 w-5 mr-2" />
              Select Seats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
