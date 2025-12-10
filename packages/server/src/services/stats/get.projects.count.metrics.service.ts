import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { prisma } from '../../prisma/prisma.client.js'

export const getProjectsCountMetricsService = async ({ userId }: { userId: string }) => {


    try {

        const groupByCount = await prisma.project.groupBy({
            where: {
                owner_id: userId
            },
            by: ['status'],
            _count: {
                _all: true
            }
        })


        // Fixed object to work with
        const projectsCountMetrics = {
            total: 0,
            pending: 0,
            'on-hold': 0,
            'in-progress': 0,
            completed: 0
        }

        // Safe guard that accepts a status as a type of projectsCountMetrics and return true or false if that status is present in the object
        const isMetricsKey = (s: string): s is keyof typeof projectsCountMetrics => s in projectsCountMetrics

        // For loop that count the total of each status group and adds by the status index the count value if the status return true from the safe guard function
        // For the total property, it just adds the count of every iteration from the values that are received to set the global count
        for (const group of groupByCount) {

            const count = group._count._all

            if (isMetricsKey(group.status)) {
                projectsCountMetrics[group.status] = count
            }

            projectsCountMetrics.total += count
        }

        return { projectsCountMetrics }

    } catch (error) {

        prismaErrorHandler(error)
        throw error

    }
}