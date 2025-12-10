import { Prisma } from 'src/prisma/client/client.js'
import { AppError } from './AppError.js'

export const prismaErrorHandler = (error: any) => {

    if (error instanceof AppError) {
        throw error
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        if (error.code === 'P2002') {
            throw new AppError('Username or Email already exists', 'CREDENTIALS_TAKEN', 409)
        }

        if (error.code === 'P2025') {
            throw new AppError('Searched record does not exist', 'RESOURCE_NOT_FOUND', 404)
        }

        if (error.code === 'P2003') {
            throw new AppError('Restriction failure', 'VALIDATION_FAILED', 422)
        }

        if (error.code === 'P2004') {
            throw new AppError('Failure in a constraint defined in the database', 'DATA_INTEGRITY_VIOLATION', 400)
        }

    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error('Prisma Unknown Error: ', error.message)
        throw new AppError('An unexpected server error ocurred.', 'INTERNAL_SERVER_ERROR', 500)
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error('Prisma Initialization Error: Check DATABASE_URL: ', error.message)
        throw new AppError('Database service is currently unavailable', 'DB_UNAVAILABLE', 503)
    }

    console.error('Unhandled Error in Prisma handler: ', error)
    throw new AppError ('An unexpected internal error ocurred.', 'INTERNAL_SERVER_ERROR', 500)
}