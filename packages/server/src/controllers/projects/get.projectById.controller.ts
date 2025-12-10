import { AppError } from "src/utils/AppError.js"
import { getProjectByIdService } from "src/services/projects/get.projectById.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { ProjectResponseSuccessData, ProjectsResponseError } from "src/types/custom.js"

export const getProjectByIdController = async (req: Request, res: Response<ProjectResponseSuccessData | ProjectsResponseError>): Promise<Response<ProjectResponseSuccessData | ProjectsResponseError>> => {

    const userId = req.userId
    const projectById = req.params.projectId

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    if (!projectById) {
        return res.status(400).json({ message: 'Missing required project ID in request parameters.', errorType: 'BAD_REQUEST' })
    }

    try {
        const { userProject } = await getProjectByIdService({projectById: projectById})
        return res.status(200).json({message: 'User project fetched successfully', projects: userProject})
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }

}