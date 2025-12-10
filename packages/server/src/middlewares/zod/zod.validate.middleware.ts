import {ZodError, ZodType} from 'zod'

import type { Request, Response, NextFunction } from 'express'
import type { AuthResponseData } from 'src/types/custom.js'


export const zodValidate = (validateSchema: ZodType) => {
    return async (req: Request, res: Response<AuthResponseData>, next: NextFunction): Promise<Response<AuthResponseData> | void> => {
        try {
            await validateSchema.parseAsync(req.body)
            next()
        } catch (error) {
            
            if (error instanceof ZodError) {
                const validationErrorMessages = error.issues.map(issue => {
                   return `${issue.path.join('.')}: ${issue.message}`
                })
                return res.status(400).json({message: validationErrorMessages.join(' | ')})
            }

            console.error('Error during validation', error)
            res.status(500).json({message: 'Internal server error.', errorType: 'INTERNAL_SERVER_ERROR'})
        }
    }
}