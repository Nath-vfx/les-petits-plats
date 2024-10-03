import { displaySelectedStuffs } from "./display.js";
import {recipes} from "./recipes.js";

let recipesList = recipes;

export let selectedStuffs = [];

export async function getAllIngredients() {
    const ingredients = [];
    recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        });
    });
    return ingredients;
}

export async function getAllUstensils() {
    const ustensils = [];
    recipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensils.push(ustensil.toLowerCase());
        });
    });
    return ustensils;
}

export async function getAllAppliances() {
    const appliances = [];
    recipesList.forEach((recipe) => {
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;
}

export async function getSelectedStuffs() {
    const selector = document.querySelectorAll('select');

    selector.forEach((e) => {
        e.addEventListener('change', () => {
            console.log(e.options[e.selectedIndex].text);
            selectedStuffs.push(e.options[e.selectedIndex].text)
            console.log(selectedStuffs)
            displaySelectedStuffs(selectedStuffs);
        })
    })

    
}