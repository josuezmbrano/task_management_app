import { refreshTokenService } from 'src/services/auth/refresh.token.service.js'
import { AppError } from 'src/utils/AppError.js'

import type { Request, Response } from 'node_modules/@types/express/index.js'
import type { AuthResponseSuccess, AuthResponseError } from 'src/types/custom.js'


export const refreshTokenController = async (req: Request, res: Response<AuthResponseSuccess | AuthResponseError>): Promise<Response<AuthResponseSuccess | AuthResponseError>> => {
    
    const userId = req.userId
    const sessionId = req.sessionId

    if (!userId || !sessionId) {
        console.error('CRITICAL: Missing token and user Id from authentication.');
        return res.status(401).json({ message: 'Missing required session credentials.', errorType: 'UNAUTHORIZED_ACCESS' });
    }

    try {
        const {newAccessToken, newRefreshToken} = await refreshTokenService({ userId: userId, sessionId: sessionId })

        const isProduction: boolean = process.env.NODE_ENV === 'production'

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
            maxAge: 600000
        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
            maxAge: 604800000
        })

        return res.status(200).json({ message: 'Session updated correctly'})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}