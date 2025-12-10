import jwt from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'node_modules/@types/express/index.js'
import type{ AuthResponseData } from 'src/types/custom.js'
import type { IAuthPayload } from 'src/types/interfaces/auth/IAuthData.js'


export const checkAuth = (req: Request, res: Response<AuthResponseData>, next: NextFunction): Response<AuthResponseData> | void => {
    
    const JWT_SECRET = process.env.JWT_SECRET
    const token: string = req.cookies.token

    if (!JWT_SECRET) {
        throw new Error ('JWT Secret key not available, failed to continue operation')
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.', errorType: 'UNAUTHORIZED' })
    }

    try {
        const verifiedPayload = jwt.verify(token, JWT_SECRET) as IAuthPayload
        req.userId = verifiedPayload.userId
        req.sessionId = verifiedPayload.sessionId
        next()
    } catch (error) {

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid or expired token.', errorType: 'INVALID_TOKEN' })
        }
        
        console.error(error)
        return res.status(500).json({ message: 'An unexpected internal server error ocurred.', errorType: 'INTERNAL_SERVER_ERROR' })
    }

}