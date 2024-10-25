import { recipes } from "./scripts/recipes.js";

const selectedAppliances = [];
const selectedUstensils = [];
const selectedIngredients = [];
let selectedFilters = [];
let recipesList = recipes;
const searchInput = document.querySelector("#searchbar");
let searchValue = '';

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


async function getSelectedFilters() {
    const selector = document.querySelectorAll('select');

    await selector.forEach((e) => {
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
    })
}



// Affiches l'ensemble des recettes
function displayRecipes(list) {
    const recipesContainer = document.querySelector(".recipes-container")
    let allRecipes = "";

    list.forEach((recipe) => {
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
    });    

    recipesContainer.innerHTML = allRecipes;
}

// Affiche les éléments séléctionnés en fonction des recettes ainsi triées
function displayFilters(stuffs, name) {
    const e = [...new Set(stuffs)].sort((a, b) => a.localeCompare(b));

    const stuffsContainer = document.querySelector(`#${name}`);
    let allStuffs = "";

    e.forEach((stuff) => {
        allStuffs += `
        <option value="${stuff}">
            ${stuff}
        </option>
        `
    })

    stuffsContainer.innerHTML = `<option class="selector-label" value="" selected disabled>${name.charAt(0).toUpperCase() + name.slice(1)}</default>` + allStuffs ;
}

async function filterRecipes(recipes, ing = [], ust = [], apl = [], searchValue = "") {
    // Filtrer les recettes qui contiennent les ingrédients, ustensiles, appareils et le texte de recherche
    recipesList = recipes.filter(recipe =>
        // Filtrer par ingrédients
        (ing.length === 0 || ing.every(filterIng =>
            recipe.ingredients.some(e => 
                e.ingredient.toLowerCase().includes(filterIng.toLowerCase())
            )
        )) &&
        
        // Filtrer par ustensiles
        (ust.length === 0 || ust.every(filterUst =>
            recipe.ustensils.some(e =>
                e.toLowerCase().includes(filterUst.toLowerCase())
            )
        )) &&

        // Filtrer par appareils
        (apl.length === 0 || apl.every(filterApl =>
            recipe.appliance.toLowerCase().includes(filterApl.toLowerCase())
        )) &&

        // Filtrer par recherche texte
        (!searchValue || Object.values(recipe).some(value => 
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
        ))
    );

    // Afficher les recettes filtrées
    console.log("Filtered recipes : ", recipesList);

    // Mettre à jour les données affichées
    await updateDisplayedData(recipesList);
    return recipesList;
}

async function displaySelectedStuffs(stuffs) {
    const selectedStuffsContainer = document.querySelector('.selected-list');

    let allSelectedStuffs = ""

    stuffs.forEach((stuff) => {
        allSelectedStuffs += `
        <li class="selected-list-item" data-selector-type="${stuff.type}"><span>${stuff.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="selected-list-item-suppr"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </li>
        `;
    })

    selectedStuffsContainer.innerHTML = allSelectedStuffs;
    await removeSelectedFilters();
}

async function research() {
    searchValue = searchInput.value.trim().toLowerCase();

    // Si la recherche est active (>= 3 caractères) ou si des filtres sont actifs
    if (searchValue.length >= 3) {
            await filterRecipes(recipes, selectedIngredients, selectedUstensils, selectedAppliances, searchValue);
    } else {
        if (selectedFilters.length > 0) {
            console.log("Recherche active ou filtres actifs : ", searchValue);

            // Toujours filtrer à partir de la liste d'origine `recipesList`
            await filterRecipes(recipes, selectedIngredients, selectedUstensils, selectedAppliances, "");
        } else {
            // Si aucune recherche et aucun filtre actif, afficher toutes les recettes
            console.log("Aucune recherche ni filtre actif, affichage des recettes complètes.");
            await updateDisplayedData(recipesList);
        }
    }
}

async function removeSelectedFilters() {
    const selectedItems = document.querySelectorAll(".selected-list-item");

    selectedItems.forEach((e) => {
        // Sélectionner l'élément SVG pour l'écouteur d'événements
        const svgElement = e.querySelector('.selected-list-item-suppr');
        
        svgElement.addEventListener('click', async (event) => {
            // Empêcher l'événement de propagation vers le parent li
            event.stopPropagation();

            const type = e.getAttribute('data-selector-type');
            const text = e.textContent.trim();
            let selectedList;

            // Déterminer la liste correcte en fonction du type
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

            // Supprimer l'élément de la liste sélectionnée
            const index = selectedList.indexOf(text);
            if (index !== -1) selectedList.splice(index, 1);
            console.log(`New list of ${type}:`, selectedList);
            await getSelectedFilters()

            // Rafraîchir la liste des recettes en fonction des nouveaux critères
            await research(); // Appeler research pour prendre en compte à la fois la recherche texte et les filtres

            // Masquer l'élément sélectionnédisplayFilters
            e.style.display = "none";
        });
    });

}

async function updateDisplayedData(list) {
    await displayFilters(getAllIngredients(list), "ingredients");
    await displayFilters(getAllUstensils(list), "ustensils");
    await displayFilters(getAllAppliances(list), "appliances");
    await displayRecipes(list);
    await displayRecipesNumber(list);
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
    await research();
});

await init()