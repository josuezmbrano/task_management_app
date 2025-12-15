import Piechart from '../../assets/session/statistics.png'

export const EmptyPieChart = () => {
    return (
        <div className="empty-piechart-container">
            <div className="empty-piechart-img">
                <img src={Piechart} />
            </div>
            <div className="empty-piechart-titles">
                <h6>No data for stats distribution yet</h6>
                <span>Complete tasks and make progress across your projects to see your category stats breakdown</span>
            </div>
        </div>
    )
}