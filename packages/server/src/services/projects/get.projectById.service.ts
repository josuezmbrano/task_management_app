import { AppError } from 'src/utils/AppError.js'
import { prisma } from '../../prisma/prisma.client.js'

export const getProjectByIdService = async ({ projectById }: {projectById: string}) => {

    const userProject = await prisma.project.findUnique({
        
        where: {
            public_id: projectById
        },
        select: {
            public_id: true,
            title: true,
            description: true,
            category: true,
            status: true
        }
    })

    if (!userProject) {
        throw new AppError('Requested project not found or doesnt exist', 'RESOURCE_NOT_FOUND', 404)
    }

    return {userProject}
}