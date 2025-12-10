import express from 'express';

import { registerController } from 'src/controllers/auth/register.controller.js';
import { loginController } from 'src/controllers/auth/login.controller.js';
import { logoutController } from 'src/controllers/auth/logout.controller.js';
import { refreshTokenController } from 'src/controllers/auth/refresh.token.controller.js'
import { changePasswordController } from 'src/controllers/auth/change.password.controller.js';

import { zodValidate } from 'src/middlewares/zod/zod.validate.middleware.js';
import { checkAuth } from 'src/middlewares/auth/check.auth.middleware.js';
import { sessionRefreshTokens } from 'src/middlewares/auth/session.tokens.middleware.js';
import { checkRefreshToken } from 'src/middlewares/auth/check.refreshToken.middleware.js';

import { signupSchema } from '@task-app/common/dist/zod-schemas/auth/signup.schema.js'
import { loginSchema } from '@task-app/common/dist/zod-schemas/auth/login.schema.js'
import { changePasswordSchema } from '@task-app/common/dist/zod-schemas/auth/change.password.schema.js'

import type { Router } from 'express';

export const authRouter: Router = express.Router()

// USER AUTH ROUTES
authRouter.post('/register', zodValidate(signupSchema), sessionRefreshTokens, registerController)
authRouter.post('/login', zodValidate(loginSchema), sessionRefreshTokens, loginController)
authRouter.post('/logout', checkAuth, logoutController)

// MISC AUTH ROUTES
authRouter.patch('/changepassword', checkAuth, zodValidate(changePasswordSchema), changePasswordController)

// TOKEN AUTH ROUTES
authRouter.post('/refreshtoken', checkRefreshToken, refreshTokenController)