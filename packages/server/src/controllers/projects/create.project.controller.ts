import { createProjectService } from "src/services/projects/create.project.service.js"
import { AppError } from "src/utils/AppError.js"

import type { Request, Response } from "express-serve-static-core"
import type { ProjectResponseSuccessData, ProjectsResponseError } from "src/types/custom.js"


export const createProjectController = async (req: Request, res: Response<ProjectResponseSuccessData | ProjectsResponseError>): Promise<Response<ProjectResponseSuccessData | ProjectsResponseError>> => {

    const userId = req.userId
    const { category, description, title } = req.body

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    try {
        const {projectCreated} = await createProjectService({ category: category, description: description, title: title, userId: userId })
        return res.status(201).json({ message: 'Project created succesfully', projects: projectCreated })
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}