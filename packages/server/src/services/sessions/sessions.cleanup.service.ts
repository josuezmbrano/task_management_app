import { prisma } from '../../prisma/prisma.client.js'

import { prismaErrorHandler } from "src/utils/prismaErrorHandler.js"


const INACTIVITY_THRESHOLD_MS = 60 * 60 * 1000 // 1 Hora

export const sessionsCleanupService = async () => {
    try {

        const cutOffTime = new Date(Date.now() - INACTIVITY_THRESHOLD_MS)

        const abandonedSessions = await prisma.session.findMany({
            where: {
                isSessionProcessed: false,
                loggedOutAt: null,
                lastActiveAt: {
                    lt: cutOffTime
                }
            },
            select: {
                loggedAt: true,
                lastActiveAt: true,
                id: true
            }
        })

        if (abandonedSessions.length === 0) {
            console.log('No sessions abandoned found')
            return
        }

        const cleanupSessionsPromise = abandonedSessions.map((session) => {

            const totalSessionTimeMs = session.lastActiveAt.getTime() - session.loggedAt.getTime()
            const totalSessionTimeSec = Math.floor(totalSessionTimeMs / 1000)

            return prisma.session.update({
                where: {
                    id: session.id
                },
                data: {
                    isSessionProcessed: true,
                    loggedOutAt: new Date(),
                    logoutReason: 'Session_abandoned',
                    totalSessionTime: totalSessionTimeSec,
                    refreshTokenHashed: `REVOKED_${session.id}`,
                    searchToken: `REVOKED_${session.id}`
                },
                select: {session_public_id: true}
            })
        })

        await prisma.$transaction(cleanupSessionsPromise)
        console.log (`Total sessions cleaned: ${abandonedSessions.length}`)

    } catch (error) {

        prismaErrorHandler(error)
        throw error

    }
}