import { AppError } from "src/utils/AppError.js"
import { getProjectsService } from "src/services/projects/get.projects.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { ProjectsArrayResponseSuccessData, ProjectResponseSuccessData, ProjectsResponseError } from "src/types/custom.js"


export const getProjectsController = async (req: Request, res: Response<ProjectsArrayResponseSuccessData | ProjectsResponseError>): Promise<Response<ProjectsArrayResponseSuccessData | ProjectsResponseError>> => {
    const userId = req.userId

    if (!userId) {
         return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    try {
        const {userProjects} = await getProjectsService({userId: userId})
        return res.status(200).json({message: 'User projects fetched successfully', projects: userProjects})
    } catch (error) {
        
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}