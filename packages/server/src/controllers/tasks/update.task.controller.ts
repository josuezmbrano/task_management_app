import { AppError } from "src/utils/AppError.js"
import { updateTaskService } from "src/services/tasks/update.task.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { TaskResponseSuccessData, TaskResponseError } from "src/types/custom.js"


export const updateTaskController = async(req: Request, res: Response<TaskResponseSuccessData | TaskResponseError>): Promise <Response<TaskResponseSuccessData | TaskResponseError>> => {

    const userId = req.userId
    const projectById = req.params.projectId
    const taskById = req.params.taskId
    const taskUpdate = req.body
    

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    if (!projectById) {
        return res.status(400).json({ message: 'Missing required project ID in request parameters.', errorType: 'BAD_REQUEST' })
    }

    if (!taskById) {
        return res.status(400).json({ message: 'Missing required task ID in request parameters.', errorType: 'BAD_REQUEST' })
    }

    try {

        const {taskUpdated} = await updateTaskService({userId: userId, projectById: projectById, taskById: taskById, taskUpdate: taskUpdate})
        return res.status(200).json({message: 'Project task updated successfully', tasks: taskUpdated})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }

}