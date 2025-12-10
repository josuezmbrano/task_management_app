import { AppError } from "src/utils/AppError.js"
import { getTasksCountChartService } from "src/services/stats/get.tasks.count.chart.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { TaskActivityChartResponseSuccess, TaskResponseError } from "src/types/custom.js"


export const getTasksCountChartController = async (req: Request, res: Response<TaskActivityChartResponseSuccess | TaskResponseError>): Promise<Response<TaskActivityChartResponseSuccess | TaskResponseError>> => {
    
    const userId = req.userId

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    try {

        const {groupedtasksActivity} = await getTasksCountChartService({userId: userId})
        return res.status(200).json({message: 'Tasks chart count activity metrics fetched succesfully', tasksCountChart: groupedtasksActivity})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}