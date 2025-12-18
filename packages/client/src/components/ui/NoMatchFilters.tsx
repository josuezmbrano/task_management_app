import SearchX from '../../assets/session/not-found.png'

export const NoMatchFilters = () => {
    return (
        <div className="no-match-filters-container">
            <div className='no-match-filters-img-div'>
                <img src={SearchX} alt='Search X not found icon'/>
            </div>
            <div className='no-match-filters-title-div'>
                <h3>¡No results!</h3>
            </div>
            <div className='no-match-filters-p-div'>
                <p>No projects were found with current filters selected, try adjusting the category or status search parameter</p>
            </div>
        </div>
    )
}