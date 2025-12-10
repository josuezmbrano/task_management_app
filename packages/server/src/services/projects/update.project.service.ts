import {prisma} from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"

import type { UpdateProjectData } from "src/types/interfaces/projects/IProjectData.js"


export const updateProjectService = async ({userId, projectById, projectUpdate}: UpdateProjectData) => {

    

    try {

        const projectUpdated = await prisma.project.update({
            where: {
                owner_id: userId,
                public_id: projectById
            },
            data: projectUpdate,
            select: {
                public_id: true,
                title: true,
                description: true,
                category: true,
                status: true
            }
        })

        return {projectUpdated}
    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }

}