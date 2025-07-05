import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ExternalLink, Plane, Popcorn } from "lucide-react"

export function Advertisement() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Premium Membership Ad */}
      <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
        <CardContent className="p-4 sm:p-6 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Popcorn className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">CinemaMax Premium</h3>
              <p className="text-purple-200 text-xs sm:text-sm">Unlimited movies & perks</p>
            </div>
          </div>
          <p className="text-purple-100 text-xs sm:text-sm mb-3 sm:mb-4">
            Get 50% off tickets, free popcorn, and priority booking!
          </p>
          <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold text-xs sm:text-sm py-2">
            Join Now - $9.99/month
          </Button>
        </CardContent>
      </Card>

      {/* Travel Partnership Ad */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-700 border-0 text-white overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12"></div>
        <CardContent className="p-4 sm:p-6 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Plane className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">SkyTravel</h3>
              <p className="text-blue-200 text-xs sm:text-sm">Movie + Flight deals</p>
            </div>
          </div>
          <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">
            Book movies & flights together. Save up to 30% on your next trip!
          </p>
          <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm py-2">
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            Explore Deals
          </Button>
        </CardContent>
      </Card>

      {/* Featured Movie Ad */}
      <Card className="bg-gradient-to-br from-red-600 to-orange-600 border-0 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/placeholder.svg?height=200&width=300&text=Featured+Movie"
            alt="Featured Movie"
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 sm:p-6 relative z-10">
          <div className="mb-3 sm:mb-4">
            <span className="bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-full text-xs font-bold">EXCLUSIVE</span>
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2">Avengers: Secret Wars</h3>
          <p className="text-orange-100 text-xs sm:text-sm mb-3 sm:mb-4">
            Early access tickets now available! Be the first to witness the epic finale.
          </p>
          <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-xs sm:text-sm py-2">
            Get Early Access
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
