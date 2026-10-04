import React, { useState, useEffect } from "react";
import { X, Youtube, ChefHat } from "lucide-react";

const RecipeModal = ({ id, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals?.[0] || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchDetails();
    }
  }, [id]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
         <div className="bg-white rounded-3xl p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading recipe details...</p>
         </div>
      </div>
    );
  }

  if (!recipe) return null;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  // Get Youtube embed URL
  let youtubeEmbedUrl = "";
  if (recipe.strYoutube) {
    const videoId = recipe.strYoutube.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
      youtubeEmbedUrl = `https://www.youtube.com/embed/${cleanVideoId}`;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image area */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-gray-200">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
          
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {recipe.strCategory || "Recipe"}
                </span>
                {recipe.strArea && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {recipe.strArea}
                  </span>
                )}
             </div>
             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
               {recipe.strMeal}
             </h2>
          </div>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Col: Ingredients */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat className="text-orange-500" size={20} />
                Ingredients
              </h3>
              <ul className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-800">{item.ingredient}</span>
                    <span className="text-gray-500 text-right">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Col: Instructions & Video */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
                <div className="prose prose-orange max-w-none text-gray-600">
                  {recipe.strInstructions.split('\n').filter(line => line.trim() !== '').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

              {youtubeEmbedUrl && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Youtube className="text-red-500" size={24} />
                    Video Tutorial
                  </h3>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={youtubeEmbedUrl} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
