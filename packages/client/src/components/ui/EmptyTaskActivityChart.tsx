import AuditImage from '../../assets/session/audit.png'


export const EmptyTaskActivityChart = () => {
    return (
            <div className="empty-task-activity-chart-container">
                <div className="empty-task-activity-chart-image">
                    <img src={AuditImage}/>
                </div>
                <div className="empty-task-activity-chart-titles">
                    <h6>No tasks completed on the last 7 days</h6>
                    <span>Start adding and completing project tasks to see your progress here</span>
                </div>
            </div>
    )
}