import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { authRouter } from './routes/auth/auth.routes.js';
import { userRouter } from './routes/user/user.routes.js';
import { projectsRouter } from './routes/projects/projects.routes.js';

import type { Express } from 'express';

dotenv.config();



const PORT: number = 3000
const app: Express = express()

const allowedOrigins = [
  'https://cautious-capybara-pqxwxvjp6x6frgj4-5173.app.github.dev',

  'http://localhost:5173',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/projects', projectsRouter)


app.listen(PORT, () => {
  console.log(`Server set up and running on http://localhost:${PORT}`)
  console.log(`CORS Origins: ${allowedOrigins.join(', ')}`);
})