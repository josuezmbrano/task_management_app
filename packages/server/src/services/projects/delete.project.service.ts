import { prisma } from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"
import { AppError } from 'src/utils/AppError.js'

import type { DeleteProjectData } from "src/types/interfaces/projects/IProjectData.js"



export const deleteProjectService = async ({ userId, projectById }: DeleteProjectData) => {

    try {

        const projectToDelete = await prisma.project.findUnique({
                where: {
                    public_id: projectById
                },
                select: {
                    id: true
                }
            })

        if (!projectToDelete) {
            throw new AppError('Project not found or operation denied.', 'NOT_FOUND', 404 )
        }

        await prisma.$transaction(async (prisma) => {

            await prisma.task.deleteMany({
                where: {
                    project_id: projectToDelete.id,
                    owner_id: userId
                }
            })
            await prisma.project.delete({
                where: {
                    public_id: projectById,
                    owner_id: userId
                }
            })
        })

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
    
}