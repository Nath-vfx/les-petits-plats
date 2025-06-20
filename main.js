import { getFilteredRecipes } from "./modules/recipes.js";
import {
  addFilter,
  removeFilter,
  setSearchFilter,
  getActiveFilters,
  resetFilters,
} from "./modules/filters.js";
import {
  renderRecipes,
  renderFilters,
  renderSelectedTags,
} from "./modules/dom.js";
import { recipes as recipesData } from "./data/recipes.js";

function setupEventListeners() {
  // Recherche principale (mode lazy)
  const searchInput = document.getElementById("searchbar");
  const searchBtn = document.querySelector(".searchbar button");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      setSearchFilter(searchInput.value);
      updateUI();
    });
    // Optionnel : recherche sur "Entrée"
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        setSearchFilter(searchInput.value);
        updateUI();
      }
    });
  }

  // Filtres via <select>
  const ingredientsSelect = document.getElementById("ingredients");
  if (ingredientsSelect) {
    ingredientsSelect.addEventListener("change", function (e) {
      if (e.target.value) {
        addFilter("ingredients", e.target.value);
        ingredientsSelect.selectedIndex = 0;
        updateUI();
      }
    });
  }
  const appliancesSelect = document.getElementById("appliances");
  if (appliancesSelect) {
    appliancesSelect.addEventListener("change", function (e) {
      if (e.target.value) {
        addFilter("appliances", e.target.value);
        appliancesSelect.selectedIndex = 0;
        updateUI();
      }
    });
  }
  const ustensilsSelect = document.getElementById("ustensils");
  if (ustensilsSelect) {
    ustensilsSelect.addEventListener("change", function (e) {
      if (e.target.value) {
        addFilter("ustensils", e.target.value);
        ustensilsSelect.selectedIndex = 0;
        updateUI();
      }
    });
  }

  // Suppression des tags sélectionnés
  const tagsContainer = document.querySelector(".selected-list");
  if (tagsContainer) {
    tagsContainer.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("remove-tag")) {
        const li = e.target.parentNode;
        const classes = li.className.split(" ");
        let type = null;
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].indexOf("tag-") === 0) {
            type = classes[i].replace("tag-", "");
            break;
          }
        }
        if (type) {
          removeFilter(type, li.firstChild.textContent);
          updateUI();
        }
      }
    });
  }
}

function updateUI() {
  const filters = getActiveFilters();
  const filteredRecipes = getFilteredRecipes(recipesData, filters);
  renderRecipes(filteredRecipes);
  renderFilters(filteredRecipes, filters);
  renderSelectedTags(filters);
}

function init() {
  updateUI();
  setupEventListeners();
}

init();
