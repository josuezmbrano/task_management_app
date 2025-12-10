import { loginSchema } from '@task-app/common/src/zod-schemas/auth/login.schema'
import { signupSchema } from '@task-app/common/src/zod-schemas/auth/signup.schema'

import { createProjectSchema } from '@task-app/common/src/zod-schemas/projects/create.project.schema'
import { editProjectSchema } from '@task-app/common/src/zod-schemas/projects/edit.project.schema'
import { editProjectStatusOnly } from '@task-app/common/src/zod-schemas/projects/edit.project.schema'

import { createTaskSchema } from '@task-app/common/src/zod-schemas/tasks/create.task.schema'
import { editTaskSchema } from '@task-app/common/src/zod-schemas/tasks/edit.task.schema'
import { editTaskStatusOnly } from '@task-app/common/src/zod-schemas/tasks/edit.task.schema'


import { z } from 'zod'


export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>

export type CreateProjectForm = z.infer<typeof createProjectSchema>
export type EditProjectForm = z.infer<typeof editProjectSchema>
export type EditProjectStatus = z.infer<typeof editProjectStatusOnly>

export type CreateTaskForm = z.infer<typeof createTaskSchema>
export type EditTaskForm = z.infer<typeof editTaskSchema>
export type EditTaskStatus = z.infer<typeof editTaskStatusOnly>
