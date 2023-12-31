import { createRecipe } from "./recipes";
import { renderRecipes } from "./views";
import { setFilters } from "./filters"

renderRecipes()

document.querySelector('#create-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

document.querySelector('#sort-dropdown').addEventListener('change', (e) => {
    setFilters({
        foodCategory: e.target.value.toLowerCase()
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
}) 