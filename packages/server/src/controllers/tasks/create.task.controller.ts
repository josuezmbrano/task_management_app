import { AppError } from "src/utils/AppError.js"
import { createTaskService } from "src/services/tasks/create.task.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { TaskResponseSuccessData, TaskResponseError } from "src/types/custom.js"


export const createTaskController = async(req: Request, res: Response<TaskResponseSuccessData | TaskResponseError>): Promise<Response<TaskResponseSuccessData | TaskResponseError>> => {
    const userId = req.userId
    const projectById = req.params.projectId
    const { title, description } = req.body

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    if (!projectById) {
        return res.status(400).json({ message: 'Missing required project ID in request parameters.', errorType: 'BAD_REQUEST' })
    }

    try {

        const {taskCreated} = await createTaskService({userId: userId, projectById: projectById, title: title, description: description})
        return res.status(201).json({message: 'Project task created successfully', tasks: taskCreated})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}