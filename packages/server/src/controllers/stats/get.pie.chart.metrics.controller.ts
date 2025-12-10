import { AppError } from "src/utils/AppError.js"
import { getPieChartMetricsService } from "src/services/stats/get.pie.chart.metrics.service.js"

import type { Request, Response } from "express-serve-static-core"
import type { PieChartResponseSuccess, PieChartResponseError } from "src/types/custom.js"


export const getPieChartMetricsController = async(req: Request, res: Response<PieChartResponseSuccess | PieChartResponseError>): Promise<Response<PieChartResponseSuccess | PieChartResponseError>> => {

    const userId = req.userId

    if (!userId) {
        return res.status(401).json({ message: 'Operation denied. No user id auth provided.', errorType: 'UNAUTHORIZED_OPERATION' })
    }

    try {

        const {finalChartMetrics} = await getPieChartMetricsService({userId: userId})
        return res.status(200).json({message: 'Pie chart metrics fetched succesfully', pieChartMetrics: finalChartMetrics})

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })

    }
}  