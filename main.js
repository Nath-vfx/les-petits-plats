import {displayStuffs, displayRecipes} from "./scripts/display.js"
import {getAllAppliances, getAllIngredients, getAllUstensils} from "./scripts/fetch.js"
import { recipes } from "./scripts/recipes.js";

let selectedAppliances = [];
let selectedUstensils = [];
let selectedIngredients = [];
let recipesList = recipes;

export let selectedStuffs = [];

export async function getSelectedStuffs() {
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
            filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances)
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

async function filterRecipes(recipes, ing, ust, apl) {
    // Filtrer les recettes qui contiennent les ingrédients, ustensiles, et appareils sélectionnés (si non vides)
    const filteredRecipes = recipes.filter(recipe => 
        // Vérifier si la recette contient tous les ingrédients sélectionnés (si le filtre des ingrédients n'est pas vide)
        (Array.isArray(ing) && ing.length > 0 ? 
            ing.every(filterIng =>
                recipe.ingredients.some(e => 
                    typeof e.ingredient === 'string' &&
                    e.ingredient.toLowerCase().trim().includes(filterIng.toLowerCase().trim())
                )
            ) : true) &&

        // Vérifier si la recette contient tous les ustensiles sélectionnés (si le filtre des ustensiles n'est pas vide)
        (Array.isArray(ust) && ust.length > 0 ? 
            ust.every(filterUst =>
                recipe.ustensils.some(e => 
                    typeof e === 'string' &&
                    e.toLowerCase().trim().includes(filterUst.toLowerCase().trim())
                )
            ) : true) &&

        // Vérifier si la recette contient l'appareil sélectionné (si le filtre des appareils n'est pas vide)
        (Array.isArray(apl) && apl.length > 0 ? 
            apl.every(filterApl =>
                typeof recipe.appliance === 'string' &&
                recipe.appliance.toLowerCase().trim().includes(filterApl.toLowerCase().trim())
            ) : true)
    );

    // Afficher les recettes filtrées
    console.log("Filtered recipes : ", filteredRecipes);

    await displayStuffs(await getAllIngredients(filteredRecipes), "ingredients");
    await displayStuffs(await getAllUstensils(filteredRecipes), "ustensils");
    await displayStuffs(await getAllAppliances(filteredRecipes), "appliances");

    // Retourner les recettes filtrées
    await displayRecipes(filteredRecipes);
}

export async function displaySelectedStuffs(stuffs) {
    const selectedStuffsContainer = document.querySelector('.selected-list');

    let allSelectedStuffs = ""

    stuffs.forEach((stuff) => {
        allSelectedStuffs += `
        <li class="selected-list-item" data-selector-type="${stuff.type}">${stuff.name}</li>
        `;
    })

    console.log("All selected stuffs : ",allSelectedStuffs);
    

    selectedStuffsContainer.innerHTML = allSelectedStuffs;
    removeSelectedStuffs();
}



async function removeSelectedStuffs() {

    const selectedItem = document.querySelectorAll(".selected-list-item");
    console.log('remove stuffs : ',selectedStuffs);

    let index = null;
    
    selectedItem.forEach((e) => {
        e.addEventListener('click', () => {
            if (e.getAttribute('data-selector-type') === "Ingredients") {
                index = selectedIngredients.indexOf(e);
                selectedIngredients.splice(index, 1);
                console.log('New list of Ingredients: ', selectedIngredients);
            } else if (e.getAttribute('data-selector-type') === "Ustensils") {
                index = selectedUstensils.indexOf(e);
                selectedUstensils.splice(index, 1);
                console.log('New list of Ustensils:', selectedUstensils);
            } else if (e.getAttribute('data-selector-type') === "Appliances") {
                index = selectedAppliances.indexOf(e);
                selectedAppliances.splice(index, 1);
                console.log('New list of Appliances:', selectedAppliances);
            }
            filterRecipes(recipesList, selectedIngredients, selectedUstensils, selectedAppliances);
            e.style.display = "none";
        })
    })

}

async function init() {
    await displayStuffs(await getAllIngredients(recipesList), "ingredients");
    await displayStuffs(await getAllUstensils(recipesList), "ustensils");
    await displayStuffs(await getAllAppliances(recipesList), "appliances");
    await getSelectedStuffs();
    await displayRecipes(recipes);
}

init()