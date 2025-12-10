import { logoutService } from 'src/services/auth/logout.service.js'
import { AppError } from 'src/utils/AppError.js'

import type { Request, Response } from 'node_modules/@types/express/index.js'
import { AuthResponseSuccess, AuthResponseError } from 'src/types/custom.js'


export const logoutController = async (req: Request, res: Response<AuthResponseSuccess | AuthResponseError>): Promise<Response<AuthResponseSuccess | AuthResponseError> | void> => {
    const userId = req.userId
    const sessionId  = req.sessionId

    if (!userId || !sessionId) {
        return res.status(401).json({ message: 'Access denied. No user id auth provided.', errorType: 'UNAUTHORIZED_ACCESS'})
    }

    const isProduction: boolean = process.env.NODE_ENV === 'production'

    try {

        await logoutService({ userId: userId, sessionId: sessionId })

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
        })

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
        })

        res.status(200).json({ message: 'User logged out successfully.' })
        
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}