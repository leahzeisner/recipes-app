import { getRecipes, getNumIngredientsOwned, toggleIngredient, removeIngredient, getRecipe } from "./recipes"
import { getFilters } from "./filters" 


// Render the application recipes based on the search bar filters (home page)
const renderRecipes = () => {
    const filters = getFilters()
    const recipes = getRecipes()

    const recipesElement = document.querySelector('#recipes') 

    // filter the recipes by search bar
    let filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    if (filters.foodCategory !== 'all') {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.category === filters.foodCategory)
    }

    recipesElement.innerHTML = ''

    // if there are recipes according to the filters
    if (filteredRecipes.length > 0) {

        // iterate through the recipes, generate for each recipe
        filteredRecipes.forEach((recipe) => {
            const recipeElement = generateRecipeDOM(recipe)
            recipesElement.appendChild(recipeElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'You have no recipes.'
        emptyMessage.classList.add('empty-message')
        recipesElement.appendChild(emptyMessage)
    } 
}



// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeElement = document.createElement('a')
    const titleElement = document.createElement('p')
    const summaryElement = document.createElement('p')
    const foodCategoryElement = document.createElement('p')


    // set up the recipe title text
    if (recipe.title.length > 0) {
        titleElement.textContent = recipe.title
    } else {
        titleElement.textContent = 'Unnamed Recipe'
    }
    titleElement.classList.add('list-item__title')
    recipeElement.appendChild(titleElement) 


    // set up the food category label
    if (recipe.category.length > 0) {
        foodCategoryElement.textContent = recipe.category[0].toUpperCase() + recipe.category.substring(1)
    }
    foodCategoryElement.classList.add('list-item__category')
    recipeElement.appendChild(foodCategoryElement) 


    // set up the recipe summary text
    if (recipe.ingredients.length > 0) {
        const ingredientCount = getNumIngredientsOwned(recipe)
        if (ingredientCount === 0) {
            summaryElement.textContent = 'You have none of the ingredients for this recipe.'
        } else if (ingredientCount === recipe.ingredients.length) {
            summaryElement.textContent = 'You have all of the ingredients for this recipe.'
        } else {
            summaryElement.textContent = `You have ${ingredientCount} of the ${recipe.ingredients.length} ingredients for this recipe.`
        }
    } else {
        summaryElement.textContent = 'No ingredients listed for this recipe.'
    }
    summaryElement.classList.add('list-item__summary')
    recipeElement.appendChild(summaryElement)


    // set up the link to the edit page
    recipeElement.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeElement.classList.add('list-item') 

    return recipeElement
}



// Initialize the edit page for the given recipe
const initializeEditPage = (recipeId) => {
    const recipe = getRecipe(recipeId)
    const titleElement = document.querySelector('#recipe-title')
    const stepsElement = document.querySelector('#recipe-steps')
    const categoryElement = document.querySelector('#select-category-dropdown')

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    stepsElement.value = recipe.steps
    categoryElement.value = recipe.category
    renderIngredients(recipeId)
}



// Render the ingredients for this recipe
const renderIngredients = (recipeId) => {
    const recipe = getRecipe(recipeId)
    if (recipe) {
        const ingredientElement = document.querySelector('#ingredients')
        const ingredients = recipe.ingredients

        ingredientElement.innerHTML = '' 

        if (ingredients.length > 0) {
            ingredients.forEach((ingredient) => {
                ingredientElement.appendChild(generateIngredientDOM(recipe, ingredient))
            })
        } else {
            const emptyMessageElement = document.createElement('p')
            emptyMessageElement.classList.add('empty-message')
            emptyMessageElement.textContent = 'No ingredients added.'
            ingredientElement.appendChild(emptyMessageElement)
        }
    }  
}



//Generate the DOM structure for an ingredient
const generateIngredientDOM = (recipe, ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const deleteButton = document.createElement('button')


    // set up the checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.haveIt
    checkbox.classList.add('list-item--ingredient-checkbox')
    checkbox.addEventListener('change', () => {
        toggleIngredient(recipe, ingredient.name)
    })
    containerEl.appendChild(checkbox)


    // set up the ingredient name text
    textEl.textContent = ingredient.name
    containerEl.appendChild(textEl)


    // set up container
    ingredientEl.classList.add('list-item--ingredient')
    containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)


    // set up the delete button
    deleteButton.textContent = 'Delete'
    deleteButton.classList.add('button', 'button--text')
    deleteButton.addEventListener('click', () => {
        removeIngredient(recipe, ingredient.name)
        renderIngredients(recipe)
    })
    ingredientEl.appendChild(deleteButton)


    return ingredientEl
}



export {generateRecipeDOM, renderRecipes, initializeEditPage, renderIngredients}