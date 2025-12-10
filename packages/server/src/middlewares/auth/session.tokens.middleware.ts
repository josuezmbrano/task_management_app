import { generateRefreshToken } from 'src/utils/jwt.js'
import type { Request, Response, NextFunction } from 'node_modules/@types/express/index.js'
import type { AuthResponseData } from 'src/types/custom.js'

export const sessionRefreshTokens = async (req: Request, res: Response<AuthResponseData>, next: NextFunction): Promise<Response<AuthResponseData> | void> => {

    try {
        const { T_Final, hashedRefreshToken, refreshTokenExpiresAt } = await generateRefreshToken()

        req.refreshToken = T_Final
        req.hashedRefreshToken = hashedRefreshToken
        req.refreshTokenExpiresAt = refreshTokenExpiresAt

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR'})
    }   
}