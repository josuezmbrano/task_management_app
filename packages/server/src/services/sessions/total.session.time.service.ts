import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import {prisma} from '../../prisma/prisma.client.js'


export const totalSessionTimeService = async (userId: string): Promise <number> => {

    try {
        
        const result = await prisma.$transaction(async (prisma) => {
            const sessionTime = await prisma.session.aggregate({
                where: {
                    owner_id: userId
                },
                _sum: {
                    totalSessionTime: true
                }
            })

            const totalTime: number = sessionTime._sum.totalSessionTime || 0

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    totalAppLifetime: totalTime
                }
            })

            return totalTime
        })

        return result
        
    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
}