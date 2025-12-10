import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { prisma } from '../../prisma/prisma.client.js'
import { AppError } from 'src/utils/AppError.js'

import type { SessionData } from 'src/types/interfaces/auth/IAuthData.js'
import { ISessionCredentials } from 'src/types/interfaces/models/IDBmodels.js'


export const logoutService = async ({ userId, sessionId }: SessionData): Promise<void> => {

    try {
        const sessionExists: ISessionCredentials | null = await prisma.session.findFirst({
            where: {
                owner_id: userId,
                id: sessionId,
            }
        })

        if (!sessionExists) {
            throw new AppError('User session not found.', 'SESSION_NOT_FOUND' , 401)
        }

        const now: Date = new Date()
        const totalSessionInMs: number = now.getTime() - sessionExists.loggedAt.getTime()
        const totalSessionInSec: number = Math.floor(totalSessionInMs / 1000)

        await prisma.session.update({
            where: {
                id: sessionExists.id
            },
            data: {
                refreshTokenHashed: `REVOKED_${sessionExists.id}`,
                searchToken: `REVOKED_${sessionExists.id}`,
                loggedOutAt: now,
                logoutReason: 'User_logout',
                isSessionProcessed: true,
                lastActiveAt: now,
                totalSessionTime: totalSessionInSec
            }
        })

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
}