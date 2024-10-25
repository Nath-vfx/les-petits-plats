import {recipes} from "./scripts/recipes.js";

const selectedAppliances = [];
const selectedUstensils = [];
const selectedIngredients = [];
let selectedFilters = [];
let recipesList = recipes;
const searchInput = document.querySelector("#searchbar");
let searchValue = '';

async function updateDisplayedData(list) {
    await displayFilters(getAllIngredients(list), "ingredients");
    await displayFilters(getAllUstensils(list), "ustensils");
    await displayFilters(getAllAppliances(list), "appliances");
    await displayRecipes(list);
    await displayRecipesNumber(list);
}

function displayRecipesNumber(list) {
    const recipeNumberPlace = document.querySelector(".assurance-title");
    recipeNumberPlace.textContent = `${list.length} recettes`;
}

// Récupères la list des ingrédients
function getAllIngredients(recipesList) {
    const ingredients = [];
    /*recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        });
    });
    return ingredients;*/
    for (let i = 0; i < recipesList.length; i++) {
        const recipe = recipesList[i];
        for (let j = 0; j < recipesList[i].ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            ingredients.push(ingredient.ingredient.toLowerCase());
        }
    }
    return ingredients;
}

//récupère la liste des ustensils
function getAllUstensils(recipesList) {
    const ustensils = [];
    /*recipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensils.push(ustensil.toLowerCase());
        });
    });
    return ustensils;*/
    for (let i = 0; i < recipesList.length; i++) {
        const recipe = recipesList[i];
        for (let j = 0; j < recipesList[i].ustensils.length; j++) {
            const ustensil = recipe.ustensils[j];
            ustensils.push(ustensil.toLowerCase());
        }
    }
    return ustensils;
}

//Récupère la liste des appareils
function getAllAppliances(recipesList) {
    const appliances = [];
    /*recipesList.forEach((recipe) => {
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;*/
    for (let i = 0; i < recipesList.length; i++) {
        const recipe = recipesList[i];
        appliances.push(recipe.appliance.toLowerCase());
    }
    return appliances;
}

async function research(searchValue) {
    // Si la recherche est active (>= 3 caractères) ou si des filtres sont actifs
    if (searchValue.length >= 3) {
        if (selectedFilters.length > 0) {
            await filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, searchValue);
        } else {
            // Si une recherche est active mais pas de filtre, afficher les recettes correspondantes
            console.log("Recherche active mais pas de filtre, affichage des recettes correspondantes.");
            await filterRecipes(recipes, selectedIngredients, selectedUstensils, selectedAppliances, searchValue);
        }
    } else if (selectedFilters.length > 0) {
        // Si pas de recherche active mais des filtres actifs, afficher les recettes correspondantes aux filtres
        console.log("Pas de recherche mais des filtres actifs, affichage des recettes correspondantes aux filtres.");
        await filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, "");
    } else {
        // Si aucune recherche et aucun filtre actif, afficher toutes les recettes
        console.log("Aucune recherche ni filtre actif, affichage des recettes complètes.");
        await updateDisplayedData(recipes);
    }
}

async function removeSelectedFilters() {
    const selectedItems = document.querySelectorAll(".selected-list-item");

    for (let i = 0; i < selectedItems.length; i++) {
        const e = selectedItems[i];

        const svgElement = e.querySelector('.selected-list-item-suppr');

        svgElement.addEventListener('click', async (event) => {
            event.stopPropagation();

            const type = e.getAttribute('data-selector-type');
            const text = e.textContent.trim();
            let selectedList;

            switch (type) {
                case "Ingredients":
                    selectedList = selectedIngredients;
                    break;
                case "Ustensils":
                    selectedList = selectedUstensils;
                    break;
                case "Appliances":
                    selectedList = selectedAppliances;
                    break;
            }

            const index = selectedList.indexOf(text);
            if (index !== -1) selectedList.splice(index, 1);
            const indexSelectedFilters = selectedFilters.findIndex(el => el.name === text && el.type === type);
            if (indexSelectedFilters !== -1) selectedFilters.splice(indexSelectedFilters, 1);
            console.log(`New list of ${type}:`, selectedList);
            console.log('Selected filters : ', selectedFilters);
            await research(searchValue);

            e.style.display = "none";
        });
    }
}

async function displaySelectedStuffs(stuffs) {
    const selectedStuffsContainer = document.querySelector('.selected-list');

    let allSelectedStuffs = ""

    /*stuffs.forEach((stuff) => {
        allSelectedStuffs += `
        <li class="selected-list-item" data-selector-type="${stuff.type}"><span>${stuff.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="selected-list-item-suppr"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </li>
        `;
    })*/

    for (let i = 0; i < stuffs.length; i++) {
        allSelectedStuffs += `
        <li class="selected-list-item" data-selector-type="${stuffs[i].type}"><span>${stuffs[i].name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="selected-list-item-suppr"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </li>
        `;
    }

    selectedStuffsContainer.innerHTML = allSelectedStuffs;
    await removeSelectedFilters();
}


async function getSelectedFilters() {
    const selector = document.querySelectorAll('select');

    /*await selector.forEach((e) => {
        e.addEventListener('change', () => {
            const selectedItem = e.options[e.selectedIndex].text;
            if (selectedItem !== "Ingredients" && selectedItem !== "Appliances" && selectedItem !== "Ustensils") {
                if(e.id === 'ingredients' && !selectedIngredients.includes(selectedItem)) {
                    selectedIngredients.push(e.options[e.selectedIndex].text);
                    console.log('Selected ingredients : ', selectedIngredients);
                } else if(e.id === 'ustensils' && !selectedUstensils.includes(selectedItem)) {
                    selectedUstensils.push(e.options[e.selectedIndex].text);
                    console.log('Selected ustensils : ', selectedUstensils);
                } else if(e.id === 'appliances' && !selectedAppliances.includes(selectedItem)) {
                    selectedAppliances.push(e.options[e.selectedIndex].text);
                    console.log('Selected appliances : ', selectedAppliances);
                }
            }

            filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, searchValue)
            selectedFilters = [
                ...selectedAppliances.map(item => ({ type: 'Appliances', name: item })),
                ...selectedIngredients.map(item => ({ type: 'Ingredients', name: item })),
                ...selectedUstensils.map(item => ({ type: 'Ustensils', name: item }))
            ];
            console.log("Selected stuffs : ", selectedFilters)
            displaySelectedStuffs(selectedFilters);
        })
    })*/

    for (let i = 0; i < selector.length; i++) {
        selector[i].addEventListener('change', () => {
            const selectedItem = selector[i].options[selector[i].selectedIndex].text;
            if (selectedItem !== "Ingredients" && selectedItem !== "Appliances" && selectedItem !== "Ustensils") {
                if (selector[i].id === 'ingredients' && !selectedIngredients.includes(selectedItem)) {
                    selectedIngredients.push(selector[i].options[selector[i].selectedIndex].text);
                    console.log('Selected ingredients : ', selectedIngredients);
                } else if (selector[i].id === 'ustensils' && !selectedUstensils.includes(selectedItem)) {
                    selectedUstensils.push(selector[i].options[selector[i].selectedIndex].text);
                    console.log('Selected ustensils : ', selectedUstensils);
                } else if (selector[i].id === 'appliances' && !selectedAppliances.includes(selectedItem)) {
                    selectedAppliances.push(selector[i].options[selector[i].selectedIndex].text);
                    console.log('Selected appliances : ', selectedAppliances);
                }
            }

            filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, searchValue)
            selectedFilters = [];
            for (let i = 0; i < selectedAppliances.length; i++) {
                selectedFilters.push({type: 'Appliances', name: selectedAppliances[i]});
            }
            for (let i = 0; i < selectedIngredients.length; i++) {
                selectedFilters.push({type: 'Ingredients', name: selectedIngredients[i]});
            }
            for (let i = 0; i < selectedUstensils.length; i++) {
                selectedFilters.push({type: 'Ustensils', name: selectedUstensils[i]});
            }
            console.log("Selected stuffs : ", selectedFilters)
            displaySelectedStuffs(selectedFilters);
        })
    }
}

// Affiches l'ensemble des recettes
function displayRecipes(list) {
    const recipesContainer = document.querySelector(".recipes-container")
    let allRecipes = "";

    /*list.forEach((recipe) => {
        allRecipes += `
        <div class="recipe-card">
            <div class="recipe-card-header">
                <img src="photos/${recipe.image}" alt="">
                <span class="recipe-time">${recipe.time} min</span>
            </div>
            <div class="recipe-card-content">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-desc">
                    <h4 class="recipe-desc-title">Recette</h4>
                    <p class="recipe-desc-text">
                        ${recipe.description}
                    </p>
                </div>
                <div class="recipe-ingredients">
                    <h4 class="recipe-ingredient-title">
                        Ingrédients
                    </h4>
                    <ul class="recipe-ingredients-list">
                        ${recipe.ingredients.map((ingredient) =>
            `<li><p>${ingredient.ingredient}</p><span>${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`
        ).join("")}
                    </ul>
                </div>
            </div>
        </div>
        `
    });    */

    for (let i = 0; i < list.length; i++) {
        allRecipes += `
        <div class="recipe-card">
            <div class="recipe-card-header">
                <img src="photos/${list[i].image}" alt="">
                <span class="recipe-time">${list[i].time} min</span>
            </div>
            <div class="recipe-card-content">
                <h3 class="recipe-title">${list[i].name}</h3>
                <div class="recipe-desc">
                    <h4 class="recipe-desc-title">Recette</h4>
                    <p class="recipe-desc-text">
                        ${list[i].description}
                    </p>
                </div>
                <div class="recipe-ingredients">
                    <h4 class="recipe-ingredient-title">
                        Ingrédients
                    </h4>
                    <ul class="recipe-ingredients-list">
                        ${list[i].ingredients.map((ingredient) =>
            `<li><p>${ingredient.ingredient}</p><span>${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`
        ).join("")}
                    </ul>
                </div>
            </div>
        </div>
        `
    }

    recipesContainer.innerHTML = allRecipes;
}

// Affiche les éléments séléctionnés en fonction des recettes ainsi triées
function displayFilters(stuffs, name) {
    const e = [...new Set(stuffs)].sort((a, b) => a.localeCompare(b));

    const stuffsContainer = document.querySelector(`#${name}`);
    let allStuffs = "";

    /*e.forEach((stuff) => {
        allStuffs += `
        <option value="${stuff}">
            ${stuff}
        </option>
        `
    })*/

    for (let i = 0; i < e.length; i++) {
        allStuffs += `
        <option value="${e[i]}">
            ${e[i]}
        </option>
        `
    }

    stuffsContainer.innerHTML = `<option class="selector-label" value="" selected disabled>${name.charAt(0).toUpperCase() + name.slice(1)}</default>` + allStuffs;
}

async function filterRecipes(recipes, ing = [], ust = [], apl = [], searchValue = "") {
    recipesList = [];

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let match = true;

        // Filtrer par ingrédients
        for (let j = 0; j < ing.length; j++) {
            const filterIng = ing[j];
            let found = false;
            for (let k = 0; k < recipe.ingredients.length; k++) {
                const e = recipe.ingredients[k];
                if (e.ingredient.toLowerCase().includes(filterIng.toLowerCase())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                match = false;
                break;
            }
        }

        // Filtrer par ustensiles
        for (let j = 0; j < ust.length; j++) {
            const filterUst = ust[j];
            let found = false;
            for (let k = 0; k < recipe.ustensils.length; k++) {
                const e = recipe.ustensils[k];
                if (e.toLowerCase().includes(filterUst.toLowerCase())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                match = false;
                break;
            }
        }

        // Filtrer par appareils
        for (let j = 0; j < apl.length; j++) {
            const filterApl = apl[j];
            if (!recipe.appliance.toLowerCase().includes(filterApl.toLowerCase())) {
                match = false;
                break;
            }
        }

        // Filtrer par recherche texte
        if (searchValue) {
            match = false;
            for (const value of Object.values(recipe)) {
                if (value.toString().toLowerCase().includes(searchValue.toLowerCase())) {
                    match = true;
                    break;
                }
            }
        }

        if (match) {
            recipesList.push(recipe);
        }
    }

    // Afficher les recettes filtrées
    console.log("Filtered recipes : ", recipesList);

    // Mettre à jour les données affichées
    await updateDisplayedData(recipesList);
    return recipesList;
}


async function init() {
    await displayFilters(getAllIngredients(recipes), "ingredients");
    await displayFilters(getAllUstensils(recipes), "ustensils");
    await displayFilters(getAllAppliances(recipes), "appliances");
    await getSelectedFilters();
    await displayRecipes(recipes);
    await displayRecipesNumber(recipes);
}

searchInput.addEventListener('input', async () => {
    searchValue = searchInput.value.trim().toLowerCase();
    await research(searchValue);
});

await init();