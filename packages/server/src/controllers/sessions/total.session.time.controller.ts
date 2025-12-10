import { totalSessionTimeService } from 'src/services/sessions/total.session.time.service.js'
import { AppError } from 'src/utils/AppError.js'

import type { AppLifeTimeResponseSuccessData, AppLifeTimeResponseError } from 'src/types/custom.js'
import type { Request, Response } from 'express'

export const totalSessionTimeController = async (req: Request, res: Response<AppLifeTimeResponseSuccessData | AppLifeTimeResponseError>): Promise <Response<AppLifeTimeResponseSuccessData | AppLifeTimeResponseError>> => { 
    const userId = req.userId

    if (!userId) {
        return res.status(400).json({message: 'User ID is required. Invalid Authentication.', errorType: 'UNAUTHORIZED_ACCESS'})
    }

    try {
        const totalTime: number = await totalSessionTimeService(userId)
        return res.status(200).json({message: 'Total session time updated successfully.', totalAppLifetime: totalTime})
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({message: error.message, errorType: error.errorType})
        }

        console.error(error)
        return res.status(500).json({message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR'})

    }
}