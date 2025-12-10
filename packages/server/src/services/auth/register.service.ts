import { prisma } from '../../prisma/prisma.client.js'
import { genSalt, hash } from 'bcrypt-ts'
import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import { generateAccessToken } from 'src/utils/jwt.js'

import type { IAuthPayload, RegisterData } from 'src/types/interfaces/auth/IAuthData.js'
import type { IUserCredentials, ISessionCredentials } from 'src/types/interfaces/models/IDBmodels.js'
import type { AuthUserData } from 'src/types/custom.js'

export const registerService = async ({ username, email, password, firstname, lastname, hashedRefreshToken, searchToken, refreshTokenExpiresAt }: RegisterData): Promise<{userCreated: AuthUserData, jwtToken: string}> => {

    try {
        const salt: string = await genSalt(10)
        const passwordHashed: string = await hash(password, salt)

        const result: {user: IUserCredentials, session: ISessionCredentials} = await prisma.$transaction(async(tx) => {
            const user = await tx.user.create({
                data: {
                    username: username,
                    password: passwordHashed,
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                }
            })
            const session = await tx.session.create({
                data: {
                    refreshTokenHashed: hashedRefreshToken,
                    searchToken: searchToken,
                    refreshTokenExpiresAt: refreshTokenExpiresAt,
                    owner_id: user.id
                }
            })

            return {user, session}
        })

        const userPayload: IAuthPayload = {
            userId: result.user.id,
            sessionId: result.session.id
        }

        const jwtToken: string = generateAccessToken(userPayload)

        const userCreated: AuthUserData = {
            public_id: result.user.public_id,
            username: result.user.username,
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            session_public_id: result.session.session_public_id,
        }

        return {userCreated, jwtToken}
    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
}