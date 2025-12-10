import { z } from 'zod'
import type { ZodObject } from 'zod'

export const signupSchema: ZodObject = z.object({

    username: z.string().trim().min(3, {
        message: 'Username must be at least 3 characters long'
    }).max(20, {
        message: 'Username must be less or equl to 20 characters'
    }).regex(/^[a-zA-Z0-9_-]{3,20}$/, {
        message: 'Only letters, numbers, hyphens, and underscores are allowed'
    }),

    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),

    email: z.email({message: 'Email address must be in a valid format'}),

    firstname: z.string().trim().min(3, {
        message: 'Firstname is required and must be at least 3 characters long'
    }).max(30, {
        message: 'Firstname cant be longer than 30 characters'
    }).regex(/^[a-zA-Z\s'-]+$/, {
        message: 'First name can only contain letters, spaces, hyphens, and apostrophes.'
    }),

    lastname: z.string().trim().min(3, {
        message: 'lastname is required and must be at least 3 characters long'
    }).max(30, {
        message: 'lastname cant be longer than 30 characters'
    }).regex(/^[a-zA-Z\s'-]+$/, {
        message: 'First name can only contain letters, spaces, hyphens, and apostrophes.'
    }),
})