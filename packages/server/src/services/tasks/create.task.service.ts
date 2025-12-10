import {prisma} from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"
import { AppError } from 'src/utils/AppError.js'

import type { CreateTaskData } from "src/types/interfaces/tasks/ITaskData.js"



export const createTaskService = async({userId, projectById, title, description}: CreateTaskData) => {

    try {

        const projectToCreateTask = await prisma.project.findFirst({
            where: {
                public_id: projectById,
                owner_id: userId
            }
        })

        if (!projectToCreateTask) {
            throw new AppError('Project not found or operation denied', 'NOT_FOUND', 404 )
        }

        const taskCreated = await prisma.task.create({
            data: {
                title: title,
                description: description,
                owner_id: userId,
                project_id: projectToCreateTask.id,
                completedAt: null
            },
            select: {
                public_id: true,
                title: true,
                description: true,
                status: true,
                completedAt: true
            }    
        })

        return {taskCreated}

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }

}