import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt-ts'

export const generateAccessToken = (payload: object): string => {
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        throw new Error('JWT Secret key not available, failed to continue operation')
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' })
}

export const generateRefreshToken = async () => {
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        throw new Error('JWT Secret key not available, failed to continue operation')
    }

    const UUID_A = crypto.randomUUID().replace(/-/g, '')
    const UUID_B = crypto.randomUUID().replace(/-/g, '')

    const T_Final = UUID_A + UUID_B
    const hashedRefreshToken = await hash(T_Final, 10)

    const refreshTokenLifeTime = 7 * 24 * 60 * 60 * 1000;
    const now = new Date()
    const refreshTokenExpiresAt = new Date(now.getTime() + refreshTokenLifeTime)

    return {T_Final, hashedRefreshToken, refreshTokenExpiresAt}
}