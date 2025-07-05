"use client"

import { useState } from "react"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Header({ onSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navItems = ["HOME", "MOVIES", "CINEMAS", "EVENTS", "CONTACT"]

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    // Real-time search
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 text-white shadow-2xl">
      {/* Top Bar */}
      <div className="bg-black/20 backdrop-blur-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="animate-pulse hidden sm:inline">🎬 Welcome to CinemaMax</span>
            <span className="animate-pulse sm:hidden">🎬 Welcome</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-32 sm:w-48 lg:w-64 h-8 bg-white/90 text-black placeholder:text-gray-500 border-0 focus:ring-2 focus:ring-orange-300 text-sm"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
            </form>
            <Button size="sm" variant="ghost" className="hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3">
              <User className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-xl sm:text-2xl animate-bounce">🎭</div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                CinemaMax
              </h1>
              <p className="text-orange-200 text-xs sm:text-sm lg:text-base">Premium Experience</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className="relative hover:text-orange-200 transition-all duration-300 text-sm font-semibold group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-semibold hover:text-orange-200 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mt-4">
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-10 bg-white/90 text-black placeholder:text-gray-500 border-0 focus:ring-2 focus:ring-orange-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
