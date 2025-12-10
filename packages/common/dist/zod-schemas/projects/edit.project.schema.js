import { z } from 'zod';
const titleRegex = /^[a-zA-Z0-9\s.,ñáéíóúÁÉÍÓÚ\-_]*$/;
const PROJECT_STATUS = ['pending', 'on-hold', 'in-progress', 'completed'];
export const editProjectSchema = z.object({
    status: z.enum(PROJECT_STATUS, {
        error: () => ({ message: 'Invalid status. Must be one of the predefined options.' })
    })
        .optional(),
    title: z.string()
        .trim()
        .min(5, { message: 'Title must contain at least 5 characters' })
        .max(80, { message: 'Title cant exceed 80 characters' })
        .regex(titleRegex, { message: 'The title contains disallowed characters. Use only letters, numbers, spaces, and the symbols: ., -_' })
        .optional(),
    description: z.string()
        .trim()
        .max(500, { message: 'Description cant exceed 500 characters' })
        .nonempty({ message: 'Description is a required information to set your project record' })
        .optional()
}).refine((data) => data.status !== undefined || data.title !== undefined || data.description !== undefined, {
    message: 'Field values must be provided to perform an update to your project'
});
export const editProjectStatusOnly = editProjectSchema
    .pick({ status: true })
    .required({ status: true });
