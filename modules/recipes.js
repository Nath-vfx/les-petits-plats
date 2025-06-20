/**
 * Module recipes.js
 * Gestion des recettes : filtrage, recherche, extraction des listes uniques
 */

/**
 * Filtre les recettes selon les filtres actifs.
 * @param {Array} recipes - Liste de toutes les recettes
 * @param {Object} filters - Filtres actifs (ingredients, appliances, ustensils, search)
 * @returns {Array} Recettes filtrées
 */
export function getFilteredRecipes(recipes, filters) {
  const filtered = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let match = true;

    // 1. Filtre texte principal (dans nom, description ou ingrédients)
    if (filters.search && filters.search.length >= 3) {
      const search = filters.search.toLowerCase();
      const inName = recipe.name.toLowerCase().indexOf(search) !== -1;
      const inDesc = recipe.description.toLowerCase().indexOf(search) !== -1;
      let inIngredients = false;
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (
          recipe.ingredients[j].ingredient.toLowerCase().indexOf(search) !== -1
        ) {
          inIngredients = true;
          break;
        }
      }
      if (!(inName || inDesc || inIngredients)) {
        match = false;
      }
    }

    // 2. Filtre ingrédients
    if (match && filters.ingredients && filters.ingredients.length > 0) {
      const recipeIngredients = [];
      for (let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
      }
      for (let j = 0; j < filters.ingredients.length; j++) {
        if (
          recipeIngredients.indexOf(filters.ingredients[j].toLowerCase()) === -1
        ) {
          match = false;
          break;
        }
      }
    }

    // 3. Filtre appareils
    if (match && filters.appliances && filters.appliances.length > 0) {
      if (filters.appliances.indexOf(recipe.appliance.toLowerCase()) === -1) {
        match = false;
      }
    }

    // 4. Filtre ustensiles
    if (match && filters.ustensils && filters.ustensils.length > 0) {
      const recipeUstensils = [];
      for (let j = 0; j < recipe.ustensils.length; j++) {
        recipeUstensils.push(recipe.ustensils[j].toLowerCase());
      }
      for (let j = 0; j < filters.ustensils.length; j++) {
        if (
          recipeUstensils.indexOf(filters.ustensils[j].toLowerCase()) === -1
        ) {
          match = false;
          break;
        }
      }
    }

    if (match) {
      filtered.push(recipe);
    }
  }
  return filtered;
}

/**
 * Retourne la liste unique des ingrédients présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Ingrédients uniques (strings)
 */
export function getAllIngredients(recipes) {
  const set = {};
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ing = recipe.ingredients[j].ingredient.trim().toLowerCase();
      set[ing] = true;
    }
  }
  const result = [];
  for (let key in set) {
    result.push(key);
  }
  result.sort();
  return result;
}

/**
 * Retourne la liste unique des ustensiles présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Ustensiles uniques (strings)
 */
export function getAllUstensils(recipes) {
  const set = {};
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ust = recipe.ustensils[j].trim().toLowerCase();
      set[ust] = true;
    }
  }
  const result = [];
  for (let key in set) {
    result.push(key);
  }
  result.sort();
  return result;
}

/**
 * Retourne la liste unique des appareils présents dans les recettes.
 * @param {Array} recipes
 * @returns {Array} Appareils uniques (strings)
 */
export function getAllAppliances(recipes) {
  const set = {};
  for (let i = 0; i < recipes.length; i++) {
    const appliance = recipes[i].appliance.trim().toLowerCase();
    set[appliance] = true;
  }
  const result = [];
  for (let key in set) {
    result.push(key);
  }
  result.sort();
  return result;
}
