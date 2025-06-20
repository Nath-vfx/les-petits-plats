/**
 * Module de gestion des filtres sélectionnés pour les recettes.
 * Gère l'ajout, la suppression et la récupération des filtres actifs.
 */

let activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  search: ''
};

/**
 * Ajoute un filtre à la catégorie spécifiée.
 * @param {string} type - 'ingredients', 'appliances', ou 'ustensils'
 * @param {string} value - Valeur du filtre à ajouter
 */
export function addFilter(type, value) {
  if (!activeFilters[type].includes(value.toLowerCase())) {
    activeFilters[type].push(value.toLowerCase());
  }
}

/**
 * Retire un filtre de la catégorie spécifiée.
 * @param {string} type - 'ingredients', 'appliances', ou 'ustensils'
 * @param {string} value - Valeur du filtre à retirer
 */
export function removeFilter(type, value) {
  activeFilters[type] = activeFilters[type].filter(
    v => v !== value.toLowerCase()
  );
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
  // On retourne une copie pour éviter les effets de bord
  return JSON.parse(JSON.stringify(activeFilters));
}

/**
 * Réinitialise tous les filtres actifs.
 */
export function resetFilters() {
  activeFilters = {
    ingredients: [],
    appliances: [],
    ustensils: [],
    search: ''
  };
}
