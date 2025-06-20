/**
 * Module de gestion des filtres sélectionnés pour les recettes.
 * Gère l'ajout, la suppression et la récupération des filtres actifs.
 */

let activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  search: "",
};

/**
 * Ajoute un filtre à la catégorie spécifiée.
 * @param {string} type - 'ingredients', 'appliances', ou 'ustensils'
 * @param {string} value - Valeur du filtre à ajouter
 */
export function addFilter(type, value) {
  const val = value.toLowerCase();
  let exists = false;
  for (let i = 0; i < activeFilters[type].length; i++) {
    if (activeFilters[type][i] === val) {
      exists = true;
      break;
    }
  }
  if (!exists) {
    activeFilters[type].push(val);
  }
}

/**
 * Retire un filtre de la catégorie spécifiée.
 * @param {string} type - 'ingredients', 'appliances', ou 'ustensils'
 * @param {string} value - Valeur du filtre à retirer
 */
export function removeFilter(type, value) {
  const val = value.toLowerCase();
  const newArr = [];
  for (let i = 0; i < activeFilters[type].length; i++) {
    if (activeFilters[type][i] !== val) {
      newArr.push(activeFilters[type][i]);
    }
  }
  activeFilters[type] = newArr;
}

/**
 * Définit la valeur du filtre de recherche principale.
 * @param {string} value
 */
export function setSearchFilter(value) {
  activeFilters.search = value;
}

/**
 * Récupère une copie des filtres actifs.
 * @returns {Object}
 */
export function getActiveFilters() {
  // Copie profonde manuelle
  const copy = {
    ingredients: [],
    appliances: [],
    ustensils: [],
    search: activeFilters.search,
  };

  for (let i = 0; i < activeFilters.ingredients.length; i++) {
    copy.ingredients.push(activeFilters.ingredients[i]);
  }

  for (let i = 0; i < activeFilters.appliances.length; i++) {
    copy.appliances.push(activeFilters.appliances[i]);
  }

  for (let i = 0; i < activeFilters.ustensils.length; i++) {
    copy.ustensils.push(activeFilters.ustensils[i]);
  }

  return copy;
}

/**
 * Réinitialise tous les filtres actifs.
 */
export function resetFilters() {
  activeFilters = {
    ingredients: [],
    appliances: [],
    ustensils: [],
    search: "",
  };
}
