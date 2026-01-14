import type { CorsOptions } from 'cors';

const allowedOrigins = [

    'http://localhost:5173',

    'https://cautious-capybara-pqxwxvjp6x6frgj4-5173.app.github.dev',


];

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin) => void): void => {
        if (!origin) {
            return callback(null, true)
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('This origin is not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}