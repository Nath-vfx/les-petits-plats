/**
 * Module recipes.js
 * Gestion des recettes : filtrage, recherche, extraction des listes uniques
 */

/**
 * Filtre les recettes selon les filtres actifs.
 * @param {Array} recipes - Liste de toutes les recettes
 * @param {Object} filters - Filtres actifs (ingredients, appliances, ustensils, search)
 * @returns {Array} Recettes filtrées
 */
export function getFilteredRecipes(recipes, filters) {
  return recipes.filter(recipe => {
    // 1. Filtre texte principal (dans nom, description ou ingrédients)
    if (filters.search && filters.search.length >= 3) {
      const search = filters.search.toLowerCase();
      const inName = recipe.name.toLowerCase().includes(search);
      const inDesc = recipe.description.toLowerCase().includes(search);
      const inIngredients = recipe.ingredients.some(ing =>
        ing.ingredient.toLowerCase().includes(search)
      );
      if (!(inName || inDesc || inIngredients)) return false;
    }

    // 2. Filtre ingrédients
    if (filters.ingredients && filters.ingredients.length > 0) {
      const recipeIngredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
      const allPresent = filters.ingredients.every(f =>
        recipeIngredients.includes(f.toLowerCase())
      );
      if (!allPresent) return false;
    }

    // 3. Filtre appareils
    if (filters.appliances && filters.appliances.length > 0) {
      if (!filters.appliances.includes(recipe.appliance.toLowerCase())) return false;
    }

    // 4. Filtre ustensiles
    if (filters.ustensils && filters.ustensils.length > 0) {
      const recipeUstensils = recipe.ustensils.map(u => u.toLowerCase());
      const allPresent = filters.ustensils.every(f =>
        recipeUstensils.includes(f.toLowerCase())
      );
      if (!allPresent) return false;
    }

    return true;
  });
}

/**
 * Retourne la liste unique des ingrédients présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Ingrédients uniques (strings)
 */
export function getAllIngredients(recipes) {
  const set = new Set();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      set.add(ing.ingredient.trim().toLowerCase());
    });
  });
  return Array.from(set).sort();
}

/**
 * Retourne la liste unique des ustensiles présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Ustensiles uniques (strings)
 */
export function getAllUstensils(recipes) {
  const set = new Set();
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ust => {
      set.add(ust.trim().toLowerCase());
    });
  });
  return Array.from(set).sort();
}

/**
 * Retourne la liste unique des appareils présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Appareils uniques (strings)
 */
export function getAllAppliances(recipes) {
  const set = new Set();
  recipes.forEach(recipe => {
    set.add(recipe.appliance.trim().toLowerCase());
  });
  return Array.from(set).sort();
}
