"use client"

import { useState, useEffect } from "react"
import { Search, User, Menu, X, Film, Bell, Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Header({ onSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const navItems = [
    { name: "HOME", href: "#", icon: null },
    { name: "MOVIES", href: "#", icon: Film },
    { name: "CINEMAS", href: "#", icon: null },
    { name: "EVENTS", href: "#", icon: null },
    { name: "CONTACT", href: "#", icon: null }
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl shadow-2xl' 
        : 'bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg'
    }`}>
      {/* Main Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section - Leftmost position */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <Film className="h-7 w-7 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent tracking-tight">
                CinemaMax
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Search movies, theaters..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 xl:w-80 h-10 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-orange-400 transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </Button>
              
              <Button 
                className="ml-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 px-6 py-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="lg:hidden p-2 hover:bg-white/10 text-white" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-white/20 pt-6">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  placeholder="Search movies, theaters..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-orange-400 transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
              
              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.name}
                  </a>
                ))}
              </nav>
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                  </Button>
                </div>
                
                <Button 
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 px-6 py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
