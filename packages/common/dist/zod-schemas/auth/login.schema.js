import { z } from 'zod';
export const loginSchema = z.object({
    username: z.string().trim().min(3, {
        message: 'Username must be at least 3 characters long'
    }).max(20, {
        message: 'Username must be less or equl to 20 characters'
    }).regex(/^[a-zA-Z0-9_-]{3,20}$/, {
        message: 'Only letters, numbers, hyphens, and underscores are allowed'
    }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    email: z.email({ message: 'Email address must be in a valid format' }),
});
