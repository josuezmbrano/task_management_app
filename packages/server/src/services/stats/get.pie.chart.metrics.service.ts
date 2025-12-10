import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { prisma } from '../../prisma/prisma.client.js'

import type { RawChartPieMetricResult, ChartPieMetrics } from 'src/types/interfaces/stats/metrics.types.js'

export const getPieChartMetricsService = async ({ userId }: { userId: string }) => {

    try {

        const rawChartMetrics = await prisma.$queryRaw<RawChartPieMetricResult[]>
            `
            SELECT
                p.category,
                COUNT(DISTINCT p.id) AS category_total_projects,
                COUNT(t.id) AS total_tasks,
                SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS total_completed,
                COUNT(t.id) - SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS total_not_completed
            FROM
                "Project" p
            JOIN
                "Task" t ON p."id" = t."project_id"
            WHERE
                p."owner_id" = ${userId}
            GROUP BY
                p.category
            ORDER BY
                p.category
        `

        const GlobalTotalProjects = rawChartMetrics.reduce((acc, metric) => acc + Number(metric.category_total_projects), 0)

        const finalChartMetrics: ChartPieMetrics[] = rawChartMetrics.map(metric => {
            
            const categoryTotalProjects = Number(metric.category_total_projects)

            const projectPercentage = GlobalTotalProjects > 0 
                ? (categoryTotalProjects / GlobalTotalProjects) * 100
                : 0

            return {
                category: metric.category,
                projectPercentage: parseFloat(projectPercentage.toFixed(2)),
                categoryTotalProjects: categoryTotalProjects,
                total_tasks: Number(metric.total_tasks),
                total_completed: Number(metric.total_completed),
                total_not_completed: Number(metric.total_not_completed)
            }
        })

        return {finalChartMetrics}

    } catch (error) {

        prismaErrorHandler(error)
        throw error

    }

}