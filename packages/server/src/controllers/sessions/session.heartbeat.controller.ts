import { AppError } from "src/utils/AppError.js"
import { sessionHeartbeatService } from "src/services/sessions/session.heartbeat.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { SessionResponseError } from "src/types/custom.js"

export const sessionHeartbeatController = async (req: Request, res: Response<SessionResponseError>): Promise<Response<SessionResponseError>> => {

    const userId = req.userId
    const sessionId = req.sessionId

    if (!userId || !sessionId) {
        return res.status(401).json({ message: 'Access denied. No token provided for user session.', errorType: 'UNAUTHORIZED_ACCESS' })
    }

    try {

        await sessionHeartbeatService({userId: userId, sessionId: sessionId})
        return res.status(204).send()
        
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }

}