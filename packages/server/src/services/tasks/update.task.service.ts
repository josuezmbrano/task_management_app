import { prisma } from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"
import { AppError } from 'src/utils/AppError.js'

import type { UpdateTaskData } from "src/types/interfaces/tasks/ITaskData.js"


export const updateTaskService = async ({ userId, projectById, taskById, taskUpdate }: UpdateTaskData) => {

    try {

        const projectToUpdateTask = await prisma.project.findFirst({
            where: {
                public_id: projectById,
                owner_id: userId
            },
            select: {
                id: true
            }
        })

        if (!projectToUpdateTask) {
            throw new AppError('Project not found or operation denied', 'NOT_FOUND', 404)
        }



        // Handles the completedAt field value case where status is completed or not completed 
        let updatePayload = {...taskUpdate}

        if (updatePayload.status === 'completed') {
            updatePayload = {
                ...updatePayload,
                completedAt: new Date()
            }
        } else if (updatePayload.status) {
            updatePayload = {
                ...updatePayload,
                completedAt: null
            }
        }


        
        const taskUpdated = await prisma.task.update({
            where: {
                public_id: taskById,
                project_id: projectToUpdateTask.id
            },
            data: updatePayload,
            select: {
                public_id: true,
                title: true,
                description: true,
                status: true,
                completedAt: true
            }
        })

        return { taskUpdated}

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }

}