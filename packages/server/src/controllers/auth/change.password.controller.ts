import { AppError } from 'src/utils/AppError.js'
import { changePasswordService } from 'src/services/auth/change.password.service.js'

import type { Request, Response } from 'node_modules/@types/express/index.js'
import type { AuthResponseSuccess, AuthResponseError } from 'src/types/custom.js'

export const changePasswordController = async (req: Request<{}, unknown, {password: string, newPassword: string}>, res: Response<AuthResponseSuccess | AuthResponseError>): Promise<Response<AuthResponseSuccess | AuthResponseError>> => {
    
    const { password, newPassword } = req.body
    const userId = req.userId

    if (!userId) {
         return res.status(401).json({message: 'Access denied. No user id auth provided.', errorType: 'UNAUTHORIZED_ACCESS'})
    }

    try {

        await changePasswordService({ userId: userId, password: password, newPassword: newPassword })
        return res.status(200).json({ message: 'User password updated successfully' })

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}