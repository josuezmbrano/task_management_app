import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { prisma } from '../../prisma/prisma.client.js'
import { generateAccessToken, generateRefreshToken } from 'src/utils/jwt.js'

import type { IAuthPayload, RefreshTokenData } from 'src/types/interfaces/auth/IAuthData.js'


export const refreshTokenService = async ({ userId, sessionId }: RefreshTokenData): Promise<{ newAccessToken: string, newRefreshToken: string }> => {

    try {
        const userPayload: IAuthPayload = {
            userId: userId,
            sessionId: sessionId
        }

        const newAccessToken: string = generateAccessToken(userPayload)
        const { hashedRefreshToken, T_Final: newRefreshToken, refreshTokenExpiresAt } = await generateRefreshToken()
        const searchToken = newRefreshToken.substring(0, 32)
        const now = new Date()

        await prisma.session.update({
            where: {
                id: sessionId
            },
            data: {
                refreshTokenHashed: hashedRefreshToken,
                searchToken: searchToken,
                refreshTokenExpiresAt: refreshTokenExpiresAt,
                lastActiveAt: now
            }
        })

        return { newAccessToken, newRefreshToken }

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
}