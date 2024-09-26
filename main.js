import {recipes} from "./recipes.js"

// const menu = document.querySelector(".nav-test")

let recipesList = recipes

// function toggleNavBar() {
//     menu.classList.toggle("open")
// }

async function getAllIngredients() {
    const ingredients = [];
    recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient.ingredient);
        });
    });
    return ingredients;
}

async function getAllUstensils() {
    const ustensils = [];
    recipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensils.push(ustensil);
        });
    });
    return ustensils;
}

async function getAllAppliances() {
    const appliances = [];
    recipesList.forEach((recipe) => {
        appliances.push(recipe.appliance);
    });
    return appliances;
}


async function displayStuffs(stuffs, name) {
    const e = [...new Set(stuffs)].sort((a, b) => a.localeCompare(b));

    const stuffsContainer = document.querySelector(`.${name} ul`);
    let allStuffs = "";

    e.forEach((stuff) => {
        allStuffs += `
        <li class="">
            <a>${stuff}</a>
        </li>
        `
    })

    stuffsContainer.innerHTML = allStuffs;
}


async function displayRecipes() {
    const recipesContainer = document.querySelector(".recipes-container")
    let allRecipes = "";

    recipesList.forEach((recipe) => {
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
                        <li><p>Ingredient</p><span>Quantity</span></li>
                        ${recipe.ingredients.map((ingredient) =>
            `<li><p>${ingredient.ingredient}</p><span>${ingredient.quantity}</span></li>`
        ).join("")}
                    </ul>
                </div>
            </div>
        </div>
        `
    });

    recipesContainer.innerHTML = allRecipes;
}

async function init() {
    await displayRecipes();
    await displayStuffs(await getAllIngredients(), "ingredients");
    await displayStuffs(await getAllUstensils(), "ustensils");
    await displayStuffs(await getAllAppliances(), "appliances");
}

init();