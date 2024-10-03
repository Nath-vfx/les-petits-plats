import {recipes} from "./recipes.js";
import { selectedStuffs } from "./fetch.js";

let recipesList = recipes;

let listSelectedStuffs = selectedStuffs;


export async function displayRecipes() {
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

    stuffsContainer.innerHTML = allStuffs;
}

export async function displaySelectedStuffs(selectedStuffs) {
    const selectedStuffsContainer = document.querySelector('.selected-list');

    const e = [...new Set(selectedStuffs)]

    let allSelectedStuffs = ""

    e.forEach((stuff) => {
        allSelectedStuffs += `
        <li class="selected-list-item">${stuff}</li>
        `;
    })

    console.log("All selected stuffs : ",allSelectedStuffs);
    

    selectedStuffsContainer.innerHTML = allSelectedStuffs;
    removeSelectedStuffs();
}



async function removeSelectedStuffs() {

    const selectedItem = document.querySelectorAll(".selected-list-item");
    console.log('remove stuffs : ',selectedStuffs);
    
    selectedItem.forEach((e) => {
        e.addEventListener('click', () => {
            console.log('removed !');
            e.style.display = "none";
            let index = listSelectedStuffs.indexOf(e);
            listSelectedStuffs.splice(index, 1)
            console.log('New list : ', listSelectedStuffs);
        })
    })

}