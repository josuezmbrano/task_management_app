import {prisma} from '../../prisma/prisma.client.js'
import { AppError } from "src/utils/AppError.js"

import type { SessionData } from 'src/types/interfaces/auth/IAuthData.js'
import type { AuthUserData } from 'src/types/custom.js'
import type { ISessionCredentials, IUserCredentials } from 'src/types/interfaces/models/IDBmodels.js'

export const sessionManagerService = async ({userId, sessionId}: SessionData): Promise<AuthUserData> => {

        const userActive: IUserCredentials | null = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!userActive) {
            throw new AppError('User associated with this token was not found.', 'RESOURCE_NOT_FOUND' ,404)
        }

        const sessionActive: ISessionCredentials | null = await prisma.session.findFirst({
            where: {
                owner_id: userId,
                id: sessionId
            }
        })

        if (!sessionActive) {
            throw new AppError('Session associated with this token was not found.', 'RESOURCE_NOT_FOUND' ,404)
        }

        const activeUserSession: AuthUserData = {
            public_id: userActive.public_id,
            username: userActive.username,
            firstname: userActive.firstname,
            lastname: userActive.lastname,
            session_public_id: sessionActive.session_public_id,
        }

        return activeUserSession

}