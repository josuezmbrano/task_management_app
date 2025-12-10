import { AppError } from 'src/utils/AppError.js'
import { sessionManagerService } from 'src/services/sessions/session.manager.service.js'

import type { Request, Response } from 'node_modules/@types/express/index.js'
import type { SessionPersistentSuccessData, SessionResponseError } from 'src/types/custom.js'


export const sessionManager = async (req: Request, res: Response<SessionPersistentSuccessData | SessionResponseError>): Promise<Response<SessionPersistentSuccessData | SessionResponseError>> => {
    const userId = req.userId
    const sessionId = req.sessionId

    if (!userId || !sessionId) {
         return res.status(401).json({message: 'Access denied. No token provided for user session.', errorType: 'UNAUTHORIZED_ACCESS'})
    }

    try {
        const activeUserSession = await sessionManagerService({userId: userId, sessionId: sessionId})
        return res.status(200).json({message: 'User session active', user: activeUserSession})
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}