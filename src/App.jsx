import { useState, Suspense, startTransition } from "react";
import Navbar from "./components/Navbar";
import Food from "./components/Food";
import RecipeModal from "./components/RecipeModal";
import { fetchRecipes } from "./api";

// Initial promise
let initialRecipesPromise = fetchRecipes("", "");

function App() {
  const [recipesPromise, setRecipesPromise] = useState(initialRecipesPromise);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCategory("");
    startTransition(() => {
      setRecipesPromise(fetchRecipes(query, ""));
    });
  };

  const handleCategoryChange = (c) => {
    setCategory(c);
    setQuery("");
    startTransition(() => {
      setRecipesPromise(fetchRecipes("", c));
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
            <input 
              type="text" 
              placeholder="Search recipes (e.g. Chicken)..." 
              className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {['Beef', 'Chicken', 'Seafood', 'Vegetarian', 'Dessert'].map(cat => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            {category && (
               <button 
               onClick={() => handleCategoryChange("")}
               className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-red-100 text-red-600 hover:bg-red-200"
             >
               Clear Filter
             </button>
            )}
          </div>
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        }>
          <Food recipesPromise={recipesPromise} onSelectRecipe={setSelectedRecipeId} />
        </Suspense>
      </main>

      {selectedRecipeId && (
        <RecipeModal id={selectedRecipeId} onClose={() => setSelectedRecipeId(null)} />
      )}
    </div>
  );
}

export default App;
