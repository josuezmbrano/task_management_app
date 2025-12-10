import { prismaErrorHandler } from 'src/utils/prismaErrorHandler.js'
import {prisma} from '../../prisma/prisma.client.js'
import {compare, genSalt, hash} from 'bcrypt-ts'
import { AppError } from 'src/utils/AppError.js'

import type { ChangePasswordData } from 'src/types/interfaces/auth/IAuthData.js'
import type { IUserCredentials } from 'src/types/interfaces/models/IDBmodels.js'

export const changePasswordService = async ({userId, password, newPassword}: ChangePasswordData): Promise <void> => {
    
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        throw new Error('JWT Secret key not available, failed to continue operation')
    }

    try {

        const user: IUserCredentials | null = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const dummyPassword: string = '$2a$10$ALF3NoUD2ZExEOhKmYlssuyVcNgc4MfqNUQrQ4fug6btUB.kgvIhS'
        const passwordToCompare: string = user ? user.password : dummyPassword

        const isPasswordValid: boolean = await compare(password, passwordToCompare)

        if (!user || !isPasswordValid) {
            throw new AppError('Invalid credentials.', 'INVALID_CREDENTIALS', 401)
        }

        const salt: string = await genSalt(10)
        const newPasswordHashed: string = await hash(newPassword, salt)

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: newPasswordHashed
            }
        })

    } catch (error) {
        prismaErrorHandler(error)
        throw error
    }
}