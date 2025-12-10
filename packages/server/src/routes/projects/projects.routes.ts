import  express  from 'express'

import { checkAuth } from 'src/middlewares/auth/check.auth.middleware.js'

// PROJECTS CONTROLLER IMPORTS
import { getProjectsController } from 'src/controllers/projects/get.projects.controller.js'
import { getProjectByIdController } from 'src/controllers/projects/get.projectById.controller.js'
import { createProjectController } from 'src/controllers/projects/create.project.controller.js'
import { updateProjectController } from 'src/controllers/projects/update.project.controller.js'
import { deleteProjectController } from 'src/controllers/projects/delete.project.controller.js'

// TASKS CONTROLLER IMPORTS
import { createTaskController } from 'src/controllers/tasks/create.task.controller.js'
import { getTasksController } from 'src/controllers/tasks/get.tasks.controller.js'
import { updateTaskController } from 'src/controllers/tasks/update.task.controller.js'
import { deleteTaskController } from 'src/controllers/tasks/delete.task.controller.js'


import type { Router } from 'express'

export const projectsRouter: Router = express.Router()


// PROJECTS ROUTES
projectsRouter.post('/', checkAuth, createProjectController)
projectsRouter.get('/', checkAuth, getProjectsController)
projectsRouter.get('/:projectId', checkAuth, getProjectByIdController)
projectsRouter.patch('/:projectId', checkAuth, updateProjectController)
projectsRouter.delete('/:projectId', checkAuth, deleteProjectController)

// TASKS ROUTES NESTED UNDER /:PROJECTID

projectsRouter.post('/:projectId/tasks', checkAuth, createTaskController)
projectsRouter.get('/:projectId/tasks', checkAuth, getTasksController)
projectsRouter.patch('/:projectId/tasks/:taskId', checkAuth, updateTaskController)
projectsRouter.delete('/:projectId/tasks/:taskId', checkAuth, deleteTaskController)