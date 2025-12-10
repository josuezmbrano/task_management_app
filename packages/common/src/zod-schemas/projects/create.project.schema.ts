import {z} from 'zod'
import type { ZodObject } from 'zod'

const titleRegex = /^[a-zA-Z0-9\s.,ñáéíóúÁÉÍÓÚ\-_]*$/;

const PROJECT_CATEGORIES = ['Development/Engineering', 'Design/UX', 'Maintenance/Support', 'Infrastructure/Devops', 'Data analysis', 'Marketing/Sales'] as const

export const createProjectSchema: ZodObject = z.object({
    
    category: z.enum(PROJECT_CATEGORIES, {
        error: () => ({ message: 'Invalid category. Must be one of the predefined options.' })
    }),

    title: z.string()
    .trim()
    .min(5, {message: 'Title must contain at least 5 characters'})
    .max(80, {message: 'Title cant exceed 80 characters'})
    .regex(titleRegex, {message: 'The title contains disallowed characters. Use only letters, numbers, spaces, and the symbols: ., -_'}),

    description: z.string()
    .trim()
    .max(500, {message: 'Description cant exceed 500 characters'})
    .nonempty({message: 'Description is a required information to set your project record'})

})