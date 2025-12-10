import {prisma} from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"

import type { SessionData } from "src/types/interfaces/auth/IAuthData.js"



export const sessionHeartbeatService = async({userId, sessionId} : SessionData) => {

    try {

        await prisma.session.update({
            where: {
                owner_id: userId,
                id: sessionId               
            },
            data: {
                lastActiveAt: new Date()
            }
        })
        
    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }

}