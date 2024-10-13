import { recipes } from "./scripts/recipes.js";

let selectedAppliances = [];
let selectedUstensils = [];
let selectedIngredients = [];
let selectedStuffs = [];
let recipesList = recipes;
let filteredRecipes = [];
const searchInput = document.querySelector("#searchbar");
let searchValue = '';

async function displayRecipesNumber(list) {
    const recipeNumberPlace = document.querySelector(".assurance-title");
    recipeNumberPlace.textContent = `${list.length} recettes`;
} 

// Récupères la list des ingrédients
function getAllIngredients(recipesList) {
    const ingredients = [];
    recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        });
    });
    return ingredients;
}

//récupère la liste des ustensils
function getAllUstensils(recipesList) {
    const ustensils = [];
    recipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensils.push(ustensil.toLowerCase());
        });
    });
    return ustensils;
}

//Récupère la liste des appareils
function getAllAppliances(recipesList) {
    const appliances = [];
    recipesList.forEach((recipe) => {
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;
}

async function updateDisplayedData(list) {
    await displayStuffs(await getAllIngredients(list), "ingredients");
    await displayStuffs(await getAllUstensils(list), "ustensils");
    await displayStuffs(await getAllAppliances(list), "appliances");
    await displayRecipes(list);
    await displayRecipesNumber(list);
}

// Affiches l'ensemble des recettes
async function displayRecipes(list) {
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




// Récupère les filtres séléctionné
async function getSelectedStuffs() {
    const selector = document.querySelectorAll('select');

    selector.forEach((e) => {
        e.addEventListener('change', () => {
            const selectedItem = e.options[e.selectedIndex].text;
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
            filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, searchValue)
            selectedStuffs = [
                ...selectedAppliances.map(item => ({ type: 'Appliances', name: item })),
                ...selectedIngredients.map(item => ({ type: 'Ingredients', name: item })),
                ...selectedUstensils.map(item => ({ type: 'Ustensils', name: item }))
            ];
            console.log("Selected stuffs : ", selectedStuffs)
            displaySelectedStuffs(selectedStuffs);
        })
    })

    
}

// Affiche les éléments séléctionnés en fonction des recettes ainsi triées
async function displayStuffs(stuffs, name) {
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
    filteredRecipes = recipes.filter(recipe => 
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
    console.log("Filtered recipes : ", filteredRecipes);

    // Mettre à jour les données affichées
    await updateDisplayedData(filteredRecipes);
    return filteredRecipes;
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
    removeSelectedStuffs();
}

async function research() {
    searchValue = searchInput.value.trim().toLowerCase();
    // Vérifier si la recherche est valide ou si des filtres sont activés
    if (searchValue.length >= 3 || selectedStuffs.length > 0) {
        console.log("Recherche active : ", searchValue);

        // Appeler filterRecipes avec le texte de recherche et les filtres
        await filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, searchValue);
    } else if (searchValue.length === 0 && selectedStuffs.length > 0) {
        // Si la recherche est vide mais des filtres sont sélectionnés
        await filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances, null);
    } else if (searchValue.length === 0 && selectedStuffs.length === 0) {
        // Si la recherche et les filtres sont vides, afficher toutes les recettes
        await updateDisplayedData(recipes);
        recipesList = recipes;
        return recipesList;
    }
}

searchInput.addEventListener('input', async () => {
    await research();
});



async function removeSelectedStuffs() {
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

            // Rafraîchir la liste des recettes en fonction des nouveaux critères
            await research(); // Appeler research pour prendre en compte à la fois la recherche texte et les filtres

            // Masquer l'élément sélectionné
            e.style.display = "none";
        });
    });
}

async function init() {
    await displayStuffs(await getAllIngredients(recipesList), "ingredients");
    await displayStuffs(await getAllUstensils(recipesList), "ustensils");
    await displayStuffs(await getAllAppliances(recipesList), "appliances");
    await getSelectedStuffs();
    await displayRecipes(recipes);
    await displayRecipesNumber(recipes);
}

init()