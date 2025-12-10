import { AppError } from 'src/utils/AppError.js'
import { prisma } from '../../prisma/prisma.client.js'

import type { GetTasksData } from "src/types/interfaces/tasks/ITaskData.js"

export const getTasksService = async ({ userId, projectById }: GetTasksData) => {

    const projectToGetTasks = await prisma.project.findFirst({
        where: {
            public_id: projectById,
            owner_id: userId
        },
        select: {
            id: true
        }
    })

    if (!projectToGetTasks) {
        throw new AppError('Project not found or operation denied', 'NOT_FOUND', 404)
    }

    const userTasks = await prisma.task.findMany({
        where: {
            owner_id: userId,
            project_id: projectToGetTasks.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            public_id: true,
            title: true,
            description: true,
            status: true,
            completedAt: true
        }
    })

    return { userTasks }

}