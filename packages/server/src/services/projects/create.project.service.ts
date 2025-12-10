import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import {prisma} from '../../prisma/prisma.client.js'

import type { CreateProjectData } from 'src/types/interfaces/projects/IProjectData.js'

export const createProjectService = async ({category, description, title, userId} : CreateProjectData) => {

    try {
        const projectData = await prisma.project.create({
            data: {
                category: category,
                title: title,
                description: description,
                owner_id: userId
            }
        })
    
        const projectCreated = {
            public_id: projectData.public_id,
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            status: projectData.status,
        }
    
        return {projectCreated}

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
    
}