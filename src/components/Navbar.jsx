import React from "react";
import { UtensilsCrossed } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-lg bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left / Logo */}
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <UtensilsCrossed className="text-white w-6 h-6" />
             </div>
             <h1 className="text-2xl font-black tracking-tight text-gray-900">
               Meal<span className="text-orange-500">Hub</span>
             </h1>
          </div>
          
          {/* Right / Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-orange-600 font-medium border-b-2 border-orange-500 pb-1">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Recipes</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Favorites</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
