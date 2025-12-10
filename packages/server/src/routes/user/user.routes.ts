import express from 'express'

import { checkAuth } from 'src/middlewares/auth/check.auth.middleware.js'
import { sessionManager } from 'src/controllers/sessions/session.manager.controller.js'
import { sessionHeartbeatController } from 'src/controllers/sessions/session.heartbeat.controller.js'
import { totalSessionTimeController } from 'src/controllers/sessions/total.session.time.controller.js'

import { getProjectsCountMetricsController } from 'src/controllers/stats/get.projects.count.metrics.controller.js'
import { getTasksCountChartController } from 'src/controllers/stats/get.tasks.count.chart.controller.js'
import { getPieChartMetricsController } from 'src/controllers/stats/get.pie.chart.metrics.controller.js'

import type { Router } from 'express'

export const userRouter: Router = express.Router()

userRouter.get('/session', checkAuth, sessionManager)
userRouter.patch('/session/heartbeat', checkAuth, sessionHeartbeatController)
userRouter.get('/session/metrics', checkAuth, totalSessionTimeController)


userRouter.get('/stats/projectscount', checkAuth, getProjectsCountMetricsController)
userRouter.get('/stats/taskactivitychart', checkAuth, getTasksCountChartController)
userRouter.get('/stats/piechartmetrics', checkAuth, getPieChartMetricsController)