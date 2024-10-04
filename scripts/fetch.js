export async function getAllIngredients(recipesList) {
    const ingredients = [];
    recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        });
    });
    return ingredients;
}

export async function getAllUstensils(recipesList) {
    const ustensils = [];
    recipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensils.push(ustensil.toLowerCase());
        });
    });
    return ustensils;
}

export async function getAllAppliances(recipesList) {
    const appliances = [];
    recipesList.forEach((recipe) => {
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;
}