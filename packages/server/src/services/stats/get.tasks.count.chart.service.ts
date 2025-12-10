import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"
import { prisma } from '../../prisma/prisma.client.js'
import { format, startOfDay, subDays, eachDayOfInterval } from 'date-fns'

import type { TaskActivityMetric, RawMetricResult } from "src/types/interfaces/stats/metrics.types.js"



export const getTasksCountChartService = async ({ userId }: { userId: string }) => {

    const endDate = new Date()
    const startDate = startOfDay(subDays(endDate, 6))
    const statusToFilter = 'completed'

    try {

        const rawActivity = await prisma.$queryRaw<RawMetricResult[]>
            `
            SELECT
                DATE_TRUNC('day', "completedAt") AS day,
                COUNT(*)::int AS count
            FROM
                "Task"
            WHERE
                "owner_id" = ${userId} AND
                "status" = ${statusToFilter} AND
                "completedAt" >= ${startDate} AND
                "completedAt" <= ${endDate}
            GROUP BY
                day
            ORDER BY
                day
        `

        const dailySkeleton = eachDayOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
            const isoDay = format(date, "yyyy-MM-dd'T'00:00:00.000'Z'")
            acc[isoDay] = { day: isoDay, count: 0 }
            return acc
        }, {} as Record<string, TaskActivityMetric>)


        rawActivity.forEach(metric => {
            const isoDay = metric.day.toISOString()
            if (dailySkeleton[isoDay]) {
                dailySkeleton[isoDay].count = metric.count
            }
        })


        const groupedtasksActivity: TaskActivityMetric[] = Object.values(dailySkeleton)
            .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());


        return { groupedtasksActivity }

    } catch (error) {

        prismaErrorHandler(error)
        throw error

    }


}