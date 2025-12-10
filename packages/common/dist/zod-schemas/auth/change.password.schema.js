import { z } from 'zod';
export const changePasswordSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
}).refine((data) => data.newPassword !== data.password, {
    message: "The new password must be different than your actual password.",
    path: ["newPassword"],
});
