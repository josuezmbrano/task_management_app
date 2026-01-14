import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {xss} from 'express-xss-sanitizer'

import { authRouter } from './routes/auth/auth.routes.js';
import { userRouter } from './routes/user/user.routes.js';
import { projectsRouter } from './routes/projects/projects.routes.js';
import { corsOptions } from './middlewares/cors.options.js';

import type { Express } from 'express';

dotenv.config();



const PORT: number = 3000
const app: Express = express()


app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use(xss());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Task app server is running!'});
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/projects', projectsRouter)


app.listen(PORT, () => {
  console.log(`Server set up and running on http://localhost:${PORT}`)
})