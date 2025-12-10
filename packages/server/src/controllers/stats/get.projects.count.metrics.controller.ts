import { AppError } from "src/utils/AppError.js"
import { getProjectsCountMetricsService } from "src/services/stats/get.projects.count.metrics.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { ProjectsCountMetricsSuccessData, ProjectsResponseError } from "src/types/custom.js"


export const getProjectsCountMetricsController = async(req: Request, res: Response<ProjectsCountMetricsSuccessData | ProjectsResponseError>): Promise <Response<ProjectsCountMetricsSuccessData | ProjectsResponseError>> => {
    const userId = req.userId

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    try {

        const {projectsCountMetrics} = await getProjectsCountMetricsService({userId: userId})
        return res.status(200).json({message: 'Projects count metrics fetched succesfully', projectsCountMetrics: projectsCountMetrics})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}