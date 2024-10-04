import { selectedStuffs } from "../main.js";

let listSelectedStuffs = selectedStuffs;


export async function displayRecipes(list) {
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

export async function displayStuffs(stuffs, name) {
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

    stuffsContainer.innerHTML = `<option value="" selected disabled>-- Choisir --</default>` + allStuffs ;
}

