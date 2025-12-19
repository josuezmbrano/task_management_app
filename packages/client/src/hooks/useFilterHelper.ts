import { useMemo } from "react"

export const useFilterHelper = (paramsToFilter: {category: string, status: string}) => {

    const activeFilters = useMemo(() => {
        return Object.fromEntries(
        Object.entries(paramsToFilter).filter(([key, value]) => {
            return value !== '' && value !== null
        })
    )
    }, [paramsToFilter])

    return {activeFilters}
}