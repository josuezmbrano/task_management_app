import { useGetPieChartMetrics, useGetProjectsCount, useGetTaskActivityChartMetrics, useSessionMetrics } from '../../../api/user.api'

import { GlobalProjectsSummary } from '../components/GlobalProjectsSummary'
import { TaskActivityChart } from '../components/TaskActivityChart'
import { PieChartMetrics } from '../components/PieChartMetrics'
import { AppLifetimeMetric } from '../components/AppLifetimeMetric'

import type { JSX } from 'react'


export const ProductivityPage = (): JSX.Element => {

    const {projectsMetrics, countPending, countError} = useGetProjectsCount()
    const {taskActivityChart, activityChartPending, activityChartError} = useGetTaskActivityChartMetrics()
    const {pieChartData, pieChartPending, pieChartError} = useGetPieChartMetrics()
    const {appTime, appTimePending} = useSessionMetrics()


    if (countPending || activityChartPending || pieChartPending || appTimePending) {
        return (
            <h1>loading..</h1>
        )
    }

    if (countError || activityChartError || pieChartError || !projectsMetrics || !taskActivityChart || !pieChartData || !appTime) {
        return (
            <h1>Error..</h1>
        )
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