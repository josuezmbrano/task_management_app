import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { prisma } from '../../prisma/prisma.client.js'

import type { ProjectFilterWhereClause, ProjectFiltersQueryParams } from 'src/types/interfaces/projects/IProjectData.js'



const VALID_CATEGORIES =
    [
        'Development/Engineering',
        'Design/UX',
        'Maintenance/Support',
        'Infrastructure/Devops',
        'Data analysis',
        'Marketing/Sales'
    ]

const VALID_STATUS =
    [
        'pending',
        'on-hold',
        'in-progress',
        'completed'
    ]



export const getProjectsByFilterService = async ({ userId, filters }: { userId: string, filters: ProjectFiltersQueryParams }) => {

    try {

        let whereClause: ProjectFilterWhereClause = {
            owner_id: userId
        }

        if (filters.category && VALID_CATEGORIES.includes(filters.category)) {
            whereClause.category = filters.category
        }

        if (filters.status && VALID_STATUS.includes(filters.status)) {
            whereClause.status = filters.status
        }


        const filteredProjects = await prisma.project.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                public_id: true,
                title: true,
                description: true,
                category: true,
                status: true
            }
        })

        return { filteredProjects }

    } catch (error) {

        prismaErrorHandler(error)
        throw error

    }
}