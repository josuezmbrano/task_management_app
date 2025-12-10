import { prisma } from '../../prisma/prisma.client.js'

export const getProjectsService = async ({ userId }: { userId: string }) => {

    const userProjects = await prisma.project.findMany({

        where: {
            owner_id: userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            public_id: true,
            title: true,
            description: true,
            category: true,
            status: true
        }
    })

    return { userProjects }
}