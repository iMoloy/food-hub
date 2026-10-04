import React, { use, useState, useEffect } from "react";
import { Heart } from "lucide-react";

const Food = ({ recipesPromise, onSelectRecipe }) => {
  const recipes = use(recipesPromise);
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favoriteRecipes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, meal) => {
    e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.find(fav => fav.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter(fav => fav.idMeal !== meal.idMeal);
      } else {
        return [...prev, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb, strCategory: meal.strCategory, strArea: meal.strArea }];
      }
    });
  };

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 mb-4">
           <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900">No recipes found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((meal) => {
        const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);
        return (
          <div 
            key={meal.idMeal} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full border border-gray-100"
            onClick={() => onSelectRecipe(meal.idMeal)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <button 
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                onClick={(e) => toggleFavorite(e, meal)}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">{meal.strMeal}</h3>
              {(meal.strCategory || meal.strArea) && (
                <div className="mt-auto flex items-center justify-between">
                  {meal.strCategory && (
                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                      {meal.strCategory}
                    </span>
                  )}
                  {meal.strArea && (
                    <span className="text-gray-400 text-xs">{meal.strArea}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Food;
