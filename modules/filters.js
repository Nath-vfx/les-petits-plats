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
  if (!activeFilters[type].includes(val)) {
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
  activeFilters[type] = activeFilters[type].filter((v) => v !== val);
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
  // Copie profonde avec méthodes fonctionnelles
  return {
    ingredients: [...activeFilters.ingredients],
    appliances: [...activeFilters.appliances],
    ustensils: [...activeFilters.ustensils],
    search: activeFilters.search,
  };
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
