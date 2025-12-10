import { prisma } from '../../prisma/prisma.client.js'
import { compare } from 'bcrypt-ts'
import { AppError } from "src/utils/AppError.js"
import { generateAccessToken } from "src/utils/jwt.js"

import type { LoginData, IAuthPayload } from 'src/types/interfaces/auth/IAuthData.js'
import type { IUserCredentials, ISessionCredentials } from 'src/types/interfaces/models/IDBmodels.js'
import type { AuthUserData } from 'src/types/custom.js'


export const loginService = async ({ username, password, email, hashedRefreshToken, searchToken, refreshTokenExpiresAt }: LoginData): Promise <{userLogged: AuthUserData, jwtToken: string}> => {

    const user: IUserCredentials | null = await prisma.user.findUnique({
        where: {
            username: username,
            email: email
        }
    })

    const dummyPassword: string = '$2a$10$ALF3NoUD2ZExEOhKmYlssuyVcNgc4MfqNUQrQ4fug6btUB.kgvIhS'
    const passwordToCompare: string = user ? user.password : dummyPassword

    const isPasswordValid: boolean = await compare(password, passwordToCompare)

    if (!user || !isPasswordValid) {
        throw new AppError('Invalid user credentials.', 'INVALID_CREDENTIALS', 401)
    }

    const session: ISessionCredentials | null = await prisma.session.create({
        data: {
            refreshTokenHashed: hashedRefreshToken,
            searchToken: searchToken,
            refreshTokenExpiresAt: refreshTokenExpiresAt,
            owner_id: user.id
        }
    })

    const userPayload: IAuthPayload = {
        userId: user.id,
        sessionId: session.id
    }

    const jwtToken: string = generateAccessToken(userPayload)

    const userLogged: AuthUserData = {
        public_id: user.public_id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        session_public_id: session.session_public_id,
    }

    return { userLogged, jwtToken }
}