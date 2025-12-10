import { registerService } from 'src/services/auth/register.service.js'
import { AppError } from 'src/utils/AppError.js'

import type { Request, Response } from 'express'
import type{ AuthUserResponseSuccesData, AuthResponseError } from 'src/types/custom.js'

export const registerController = async (req: Request<{}, unknown, {username: string, email: string, password: string, firstname: string, lastname: string}>, res: Response<AuthUserResponseSuccesData | AuthResponseError>): Promise<Response<AuthUserResponseSuccesData | AuthResponseError>> => {
    const { username, email, password, firstname, lastname } = req.body

    const refreshToken = req.refreshToken
    const hashedRefreshToken = req.hashedRefreshToken
    const refreshTokenExpiresAt = req.refreshTokenExpiresAt

    if (!refreshToken || !hashedRefreshToken || !refreshTokenExpiresAt) {
        console.error('CRITICAL: Missing tokens from sessionTokens middleware.');
        return res.status(500).json({ message: 'Internal configuration error: Session tokens missing.', errorType: 'INTERNAL_SERVER_ERROR' });
    }

    const searchToken = refreshToken.substring(0, 32)

    try {
        const { userCreated, jwtToken } = await registerService({ username: username, email: email, password: password, firstname: firstname, lastname: lastname, hashedRefreshToken: hashedRefreshToken, searchToken: searchToken, refreshTokenExpiresAt: refreshTokenExpiresAt })

        const isProduction: boolean = process.env.NODE_ENV === 'production'

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
            maxAge: 600000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            path: '/',
            maxAge: 604800000
        })

        return res.status(201).json({ message: 'Signed up successfully', user: userCreated })
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message, errorType: error.errorType })
        }

        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }
}