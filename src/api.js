export const fetchRecipes = async (query, category) => {
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  
  if (category) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  } else if (query) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  
  return data.meals || [];
};
