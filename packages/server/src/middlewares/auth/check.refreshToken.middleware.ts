import { prisma } from '../../prisma/prisma.client.js'
import {compare} from 'bcrypt-ts'
import { Request, Response, NextFunction } from 'express-serve-static-core'

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ message: 'Access denied. No refresh token provided.', errorType: 'REFRESH_TOKEN_MISSING' })
    }

    if (refreshToken.length < 64) {
        return res.status(401).json({ message: 'Invalid token format.' , errorType: 'REFRESH_TOKEN_INVALID' })
    }

    const searchToken = refreshToken.substring(0, 32)

    try {

        const validateSession = await prisma.session.findUnique({
            where: {
                searchToken: searchToken
            }
        })

        const isProduction: boolean = process.env.NODE_ENV === 'production'

        if (!validateSession) {
           return res.status(401).json({message: 'Invalid user credential, could not validate session.', errorType: 'SESSION_NOT_FOUND'})
        }

        const now = new Date()
        const totalSessionInMs: number = now.getTime() - validateSession.loggedAt.getTime()
        const totalSessionInSec: number = Math.floor(totalSessionInMs / 1000)

        const isTokenValid: boolean = await compare(refreshToken, validateSession.refreshTokenHashed)
        const isTokenExpired: boolean = now > validateSession.refreshTokenExpiresAt
        

        if (!isTokenValid || isTokenExpired) {
            await prisma.session.update({
                where: {
                    id: validateSession.id
                },
                data: {
                    refreshTokenHashed: `REVOKED_${validateSession.id}`,
                    searchToken: `REVOKED_${validateSession.id}`,
                    lastActiveAt: now,
                    loggedOutAt: now,
                    logoutReason: 'Session_revoked',
                    isSessionProcessed: true,
                    totalSessionTime: totalSessionInSec
                }
            })

            res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
        })
            return res.status(401).json({message: 'Update token invalid', errorType: 'TOKEN_REVOKED'})
        }

        req.userId = validateSession.owner_id
        req.sessionId = validateSession.id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}