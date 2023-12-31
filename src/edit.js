import { removeRecipe, updateRecipe, updateIngredients } from "./recipes"
import { initializeEditPage, renderIngredients } from "./views"


const titleElement = document.querySelector('#recipe-title')
const stepsElement = document.querySelector('#recipe-steps')
const addIngredientsElement = document.querySelector('#add-ingredient')
const deleteElement = document.querySelector('#delete-recipe')
const categoryElement = document.querySelector('#select-category-dropdown')

const recipeId = location.hash.substring(1)
initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value,
    })
}) 


stepsElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        steps: e.target.value,
    })
})
 

addIngredientsElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const ingredientName = e.target.elements.addIngredient.value.trim()

    if (ingredientName.length > 0) {
        updateIngredients(recipeId, {
            name: ingredientName,
            haveIt: false
        })
        renderIngredients(recipeId)
        e.target.elements.addIngredient.value = ''
    }
})


categoryElement.addEventListener('change', (e) => {
    updateRecipe(recipeId, {
        category: e.target.value.toLowerCase()
    })
})


deleteElement.addEventListener('click', (e) => {
    removeRecipe(recipeId) 
    location.assign('/index.html')
})


window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
}) 