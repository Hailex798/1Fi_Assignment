import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-3">
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/" className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-teal-600">snap</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-800">mint</span>
              </Link>

              <button className="bg-teal-600 text-white px-3 py-1.5 text-sm rounded-full hover:bg-teal-700">
                Sign up
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex overflow-x-auto pb-2 space-x-4 scrollbar-hide">
              <Link to="/mobiles" className="text-sm text-gray-700 hover:text-teal-600 font-medium whitespace-nowrap">Mobiles</Link>
              <Link to="/electronics" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Electronics</Link>
              <Link to="/tv-appliances" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">TV & AC</Link>
              <Link to="/kitchen-home" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Kitchen</Link>
              <Link to="/health-wellness" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Health</Link>
              <Link to="/fashion" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Fashion</Link>
              <Link to="/baby-kids" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Baby</Link>
              <Link to="/sports-fitness" className="text-sm text-gray-700 hover:text-teal-600 whitespace-nowrap">Sports</Link>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-teal-600">snap</span>
                <span className="text-2xl font-bold text-gray-800">mint</span>
              </Link>

              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for TV, Mobiles, Headphones & more"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 xl:space-x-6">
                <button className="hidden xl:flex items-center text-gray-600 hover:text-teal-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  For Business
                </button>
                <button className="hidden xl:flex items-center text-gray-600 hover:text-teal-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Pay EMI
                </button>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 text-sm">
                  Sign up
                </button>
              </div>
            </div>

            <nav className="mt-4 border-t pt-3">
              <div className="flex items-center space-x-6 xl:space-x-8">
                <button className="flex items-center text-gray-700 hover:text-teal-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <Link to="/mobiles" className="text-gray-700 hover:text-teal-600 font-medium text-sm">Mobiles</Link>
                <Link to="/electronics" className="text-gray-700 hover:text-teal-600 text-sm">Electronics</Link>
                <Link to="/tv-appliances" className="text-gray-700 hover:text-teal-600 text-sm">TV AC & Appliances</Link>
                <Link to="/kitchen-home" className="text-gray-700 hover:text-teal-600 text-sm">Kitchen & Home</Link>
                <Link to="/health-wellness" className="text-gray-700 hover:text-teal-600 text-sm">Health & Wellness</Link>
                <Link to="/fashion" className="text-gray-700 hover:text-teal-600 text-sm">Fashion</Link>
                <Link to="/baby-kids" className="text-gray-700 hover:text-teal-600 text-sm">Baby & Kids</Link>
                <Link to="/sports-fitness" className="text-gray-700 hover:text-teal-600 text-sm">Sports & Fitness</Link>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t bg-white">
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center space-x-4 pb-3 border-b">
                  <button className="flex items-center text-gray-600 hover:text-teal-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    For Business
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-teal-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Pay EMI
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/mobiles" className="text-gray-700 hover:text-teal-600 font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Mobiles</Link>
                  <Link to="/electronics" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Electronics</Link>
                  <Link to="/tv-appliances" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>TV & Appliances</Link>
                  <Link to="/kitchen-home" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Kitchen & Home</Link>
                  <Link to="/health-wellness" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Health & Wellness</Link>
                  <Link to="/fashion" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Fashion</Link>
                  <Link to="/baby-kids" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Baby & Kids</Link>
                  <Link to="/sports-fitness" className="text-gray-700 hover:text-teal-600 text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Sports & Fitness</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
