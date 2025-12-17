import { useGetPieChartMetrics, useGetProjectsCount, useGetTaskActivityChartMetrics, useSessionMetrics } from '../../../api/user.api'

import { GlobalProjectsSummary } from '../components/GlobalProjectsSummary'
import { TaskActivityChart } from '../components/TaskActivityChart'
import { PieChartMetrics } from '../components/PieChartMetrics'
import { AppLifetimeMetric } from '../components/AppLifetimeMetric'

import LoadingSpinner from '../../../assets/svg/loading-spinner.svg?react'
import ErrorImg from '../../../assets/session/error.png'

import type { JSX } from 'react'


export const ProductivityPage = (): JSX.Element => {

    const {projectsMetrics, countPending, countError} = useGetProjectsCount()
    const {taskActivityChart, activityChartPending, activityChartError} = useGetTaskActivityChartMetrics()
    const {pieChartData, pieChartPending, pieChartError} = useGetPieChartMetrics()
    const {appTime, appTimePending} = useSessionMetrics()


    if (countPending || activityChartPending || pieChartPending || appTimePending) {
        return (
            <div className='productivity-loading-state'>
                <LoadingSpinner />
                <h4>Loading productivity stats..</h4>
            </div>
        );
    }

    if (countError || activityChartError || pieChartError || !projectsMetrics || !taskActivityChart || !pieChartData || !appTime) {
        return (
            <div className='productivity-error-state'>
                <img src={ErrorImg} alt='error-productivity' />
                <h4>User stats error encountered..</h4>
            </div>
        );
    }
    
    const tasksCompletedCount: number = taskActivityChart.reduce((acc, metric) => acc + metric.count, 0)

    return (
        <section>

        <GlobalProjectsSummary projectsMetrics={projectsMetrics}/>
        <TaskActivityChart taskMetrics={taskActivityChart} />
        <PieChartMetrics pieChartData={pieChartData} />
        <AppLifetimeMetric tasksCompletedCount={tasksCompletedCount}/>

        </section>
    )
}