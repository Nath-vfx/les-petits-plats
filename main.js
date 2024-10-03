import {displayRecipes, displayStuffs} from "./scripts/display.js"
import {getAllAppliances, getAllIngredients, getAllUstensils, getSelectedStuffs} from "./scripts/fetch.js"



async function init() {
    await displayRecipes();
    await displayStuffs(await getAllIngredients(), "ingredients");
    await displayStuffs(await getAllUstensils(), "ustensils");
    await displayStuffs(await getAllAppliances(), "appliances");
    await getSelectedStuffs();


}

init()