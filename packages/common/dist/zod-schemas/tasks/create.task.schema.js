import { z } from 'zod';
const titleRegex = /^[a-zA-Z0-9\s.,ñáéíóúÁÉÍÓÚ\-_]*$/;
export const createTaskSchema = z.object({
    title: z.string()
        .trim()
        .min(3, { message: 'Title must contain at least 3 characters' })
        .max(60, { message: 'Title cant exceed 60 characters' })
        .regex(titleRegex, { message: 'The title contains disallowed characters. Use only letters, numbers, spaces, and the symbols: ., -_' }),
    description: z.string()
        .trim()
        .max(300, { message: 'Description cant exceed 300 characters' })
        .nonempty({ message: 'Description is a required information to set your project record' })
});
