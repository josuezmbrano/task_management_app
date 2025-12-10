import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import {authRouter} from './routes/auth/auth.routes.js';
import { userRouter } from './routes/user/user.routes.js';
import { projectsRouter } from './routes/projects/projects.routes.js';

import type { Express } from 'express';

dotenv.config();

const PORT: number = 3000
const app: Express = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you need cookies/auth headers
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
})