import {
  getAllIngredients,
  getAllAppliances,
  getAllUstensils,
} from "./recipes.js";

/**
 * Affiche les recettes dans le DOM sous forme de cartes détaillées.
 * @param {Array} recipes
 */
export function renderRecipes(recipes) {
  const container = document.querySelector(".recipes-container");
  if (!container) return;
  container.innerHTML = "";

  if (recipes.length === 0) {
    const msg = document.createElement("div");
    msg.className = "no-recipes-message";
    msg.textContent = "Aucune recette trouvée.";
    // Style en ligne pour garantir l'affichage
    msg.style.cssText = `
      text-align: center;
      color: #b00;
      background: #fffbe6;
      font-family: 'Manrope', sans-serif;
      font-size: 1.5em;
      font-weight: bold;
      border-radius: 8px;
      padding: 2em 1em;
      margin: 3em auto;
      max-width: 400px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    `;
    container.appendChild(msg);
  } else {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let ingredientsList = "";
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ing = recipe.ingredients[j];
        let quantity = ing.quantity ? ing.quantity : "";
        let unit = ing.unit ? " " + ing.unit : "";
        ingredientsList +=
          "<li><p>" +
          ing.ingredient +
          "</p><span>" +
          quantity +
          unit +
          "</span></li>";
      }
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML =
        '<div class="recipe-card-header">' +
        '<img src="photos/' +
        recipe.image +
        '" alt="">' +
        '<span class="recipe-time">' +
        recipe.time +
        " min</span>" +
        "</div>" +
        '<div class="recipe-card-content">' +
        '<h3 class="recipe-title">' +
        recipe.name +
        "</h3>" +
        '<div class="recipe-desc">' +
        '<h4 class="recipe-desc-title">Recette</h4>' +
        '<p class="recipe-desc-text">' +
        recipe.description +
        "</p>" +
        "</div>" +
        '<div class="recipe-ingredients">' +
        '<h4 class="recipe-ingredient-title">Ingrédients</h4>' +
        '<ul class="recipe-ingredients-list">' +
        ingredientsList +
        "</ul>" +
        "</div>" +
        "</div>";
      container.appendChild(card);
    }
  }

  // Afficher le nombre de recettes
  const title = document.querySelector(".assurance-title");
  if (title) title.textContent = recipes.length + " recettes";
}

/**
 * Affiche les listes de filtres (ingrédients, appareils, ustensiles) dans les <select>.
 * @param {Array} recipes
 * @param {Object} filters
 */
export function renderFilters(recipes, filters) {
  const ingredientsSelect = document.getElementById("ingredients");
  const appliancesSelect = document.getElementById("appliances");
  const ustensilsSelect = document.getElementById("ustensils");
  if (!ingredientsSelect || !appliancesSelect || !ustensilsSelect) return;

  // Ingrédients
  const ingredients = getAllIngredients(recipes);
  ingredientsSelect.innerHTML = '<option value="">Ingrédients</option>';
  for (let i = 0; i < ingredients.length; i++) {
    const opt = document.createElement("option");
    opt.value = ingredients[i];
    opt.textContent = ingredients[i];
    ingredientsSelect.appendChild(opt);
  }

  // Appareils
  const appliances = getAllAppliances(recipes);
  appliancesSelect.innerHTML = '<option value="">Appareils</option>';
  for (let i = 0; i < appliances.length; i++) {
    const opt = document.createElement("option");
    opt.value = appliances[i];
    opt.textContent = appliances[i];
    appliancesSelect.appendChild(opt);
  }

  // Ustensiles
  const ustensils = getAllUstensils(recipes);
  ustensilsSelect.innerHTML = '<option value="">Ustensiles</option>';
  for (let i = 0; i < ustensils.length; i++) {
    const opt = document.createElement("option");
    opt.value = ustensils[i];
    opt.textContent = ustensils[i];
    ustensilsSelect.appendChild(opt);
  }
}

/**
 * Affiche les tags sélectionnés (filtres actifs) dans .selected-list.
 * @param {Object} filters
 */
export function renderSelectedTags(filters) {
  const tagsContainer = document.querySelector(".selected-list");
  if (!tagsContainer) return;
  tagsContainer.innerHTML = "";

  const types = ["ingredients", "appliances", "ustensils"];
  for (let t = 0; t < types.length; t++) {
    const type = types[t];
    for (let i = 0; i < filters[type].length; i++) {
      const li = document.createElement("li");
      li.className = "selected-list-item tag-" + type;
      li.textContent = filters[type][i];

      // Ajout de la croix de suppression
      const close = document.createElement("span");
      close.className = "remove-tag";
      close.innerHTML = "&times;";
      li.appendChild(close);

      tagsContainer.appendChild(li);
    }
  }
}
