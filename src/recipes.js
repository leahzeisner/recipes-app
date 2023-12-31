import uuidv4 from 'uuid/v4'
import { renderIngredients } from './views'

let recipes = []



// FUNCTIONS FOR RECIPES


// Expose the data stored in the recipes array
const getRecipes = () => recipes



// Get the recipe with the given id
const getRecipe = (id) => recipes.find((recipe) => recipe.id === id)



// Read existing recipes from local storage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}



// Save the recipes to local storage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}


// Create a recipe
const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        id: id,
        title: '',
        summary: '', 
        steps: '', 
        ingredients: [],
        category: ''
    })
    saveRecipes()

    return id
}



// Update the recipe with the given id using the given updates
const updateRecipe = (id, updates) => {
    const recipe = getRecipe(id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }
    
    if (typeof updates.steps === 'string') {
        recipe.steps = updates.steps
    } 

    if (typeof updates.category === 'string') {
        recipe.category = updates.category.toLowerCase()
    }

    saveRecipes()

    return recipe
}



// Remove a recipe from the list
const removeRecipe = (id) => {
    const index = recipes.findIndex((recipe) => recipe.id === id)

    if (index >= 0) {
        recipes.splice(index, 1)
        saveRecipes()
    }
}








// FUNCTIONS FOR INGREDIENTS



// Toggle the 'haveIt' value for the ingredient with the given name
const toggleIngredient = (recipe, ingredientName) => {
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.name.toLowerCase() === ingredientName.toLowerCase())
        
    if (ingredient) {
        ingredient.haveIt = !(ingredient.haveIt)
        renderIngredients()
        saveRecipes()
    }   
}



// Update the ingredients for the recipe with the given id
const updateIngredients = (recipeId, updates) => {
    const recipe = getRecipe(recipeId)
    let ingredientExists = false
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.name.toLowerCase() === updates.name.toLowerCase()) {
            ingredientExists = true
        }
    })

    if (recipe && !ingredientExists) {
        recipe.ingredients.push(updates)
        saveRecipes()    
    } 
}



// Remove the todo with the given id
const removeIngredient = (recipe, ingredientName) => {
    const ingredientsIndex = recipe.ingredients.findIndex((ingredient) => ingredient.name.toLowerCase() === ingredientName.toLowerCase())
    
    if (ingredientsIndex >= 0) {
        recipe.ingredients.splice(ingredientsIndex, 1)
        saveRecipes()
        renderIngredients(recipe.id)
        
    }   
}



// Returns the number of ingredients the user has for this recipe
const getNumIngredientsOwned = (recipe) => {
    const ingredientsOwned = recipe.ingredients.filter((ingredient) => ingredient.haveIt)
    return ingredientsOwned.length        
}



recipes = loadRecipes() 
export {getRecipes, getRecipe, saveRecipes, createRecipe, removeRecipe, updateRecipe, toggleIngredient, removeIngredient, getNumIngredientsOwned, updateIngredients} 