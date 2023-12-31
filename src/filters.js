const filters = {
    searchText: '',
    foodCategory: 'all'
}


// Get the filters object
const getFilters = () => filters

// Update and set the filters using the given updates
const setFilters = (updates) => {

    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.foodCategory === 'string') {
        filters.foodCategory = updates.foodCategory
    }
}


export {getFilters, setFilters} 