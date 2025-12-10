import { sessionsCleanupService } from "src/services/sessions/sessions.cleanup.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { CleanupSessionResponseError } from "src/types/custom.js"

export const sessionsCleanupController = async (req: Request, res: Response<CleanupSessionResponseError>) => {

    try {

        await sessionsCleanupService()
        return res.status(204).send()

    } catch (error) {

        console.error('Error during cleanup session job:', error)

        res.status(500).json({
            message: 'Failed to complete cleanup job.',
            error: (error as Error).message
        })
    }

}