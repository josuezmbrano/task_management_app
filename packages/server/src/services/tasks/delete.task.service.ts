import {prisma} from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"
import { AppError } from 'src/utils/AppError.js'

import type { DeleteTaskData } from "src/types/interfaces/tasks/ITaskData.js"



export const deleteTaskService = async({userId, projectById, taskById} : DeleteTaskData) => {

    try {

        const projectToDeleteTask = await prisma.project.findFirst({
            where: {
                public_id: projectById,
                owner_id: userId
            },
            select: {
                id: true
            }
        })

        if (!projectToDeleteTask) {
            throw new AppError('Project task not found or operation denied.', 'NOT_FOUND', 404 )
        }

        await prisma.task.delete({
            where: {
                project_id: projectToDeleteTask.id,
                public_id: taskById
            }
        })

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }

}