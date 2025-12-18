export const useFilterHelper = (paramsToFilter: {category: string, status: string}) => {
 
    const activeFilters = Object.fromEntries(
        Object.entries(paramsToFilter).filter(([key, value]) => {
            return value !== '' && value !== null
        })
    )

    return {activeFilters}
}