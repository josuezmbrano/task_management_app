import { AppError } from 'src/utils/AppError.js'
import { getProjectsByFilterService } from 'src/services/projects/get.projects.byFilter.service.js'

import type { Request, Response } from 'express-serve-static-core'
import type { ProjectsArrayResponseSuccessData, ProjectsResponseError } from 'src/types/custom.js'


export const getProjectsByFilterController = async (req: Request, res: Response<ProjectsArrayResponseSuccessData | ProjectsResponseError>): Promise<Response<ProjectsArrayResponseSuccessData | ProjectsResponseError>> => {

    const userId = req.userId
    const projectsByFilters = req.query

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }


    try {

        const { filteredProjects } = await getProjectsByFilterService({ userId: userId, filters: projectsByFilters })
        return res.status(200).json({message: 'Projects filtered fetched successfully', projects: filteredProjects})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}