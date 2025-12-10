import { AppError } from "src/utils/AppError.js"
import { getTasksService } from "src/services/tasks/get.tasks.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { TasksArrayResponseSuccessData, TaskResponseError } from "src/types/custom.js"

export const getTasksController = async (req: Request, res: Response<TasksArrayResponseSuccessData | TaskResponseError>): Promise<Response<TasksArrayResponseSuccessData | TaskResponseError>> => {
    const userId = req.userId
    const projectById = req.params.projectId

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    if (!projectById) {
        return res.status(400).json({ message: 'Missing required project ID in request parameters.', errorType: 'BAD_REQUEST' })
    }

    try {

        const { userTasks } = await getTasksService({ userId: userId, projectById: projectById })
        return res.status(200).json({ message: 'Project tasks fetched successfully', tasks: userTasks })

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}