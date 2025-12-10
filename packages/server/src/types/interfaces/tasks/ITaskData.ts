export interface CreateTaskData {
    userId: string
    projectById: string
    title: string
    description: string
}

export interface GetTasksData {
    userId: string
    projectById: string
}

export interface TaskUpdateData {
    title?: string
    description?: string
    status?: string
    completedAt?: Date | null
}

export interface UpdateTaskData {
    userId: string
    projectById: string
    taskById: string
    taskUpdate: TaskUpdateData
}

export interface DeleteTaskData {
    userId: string,
    projectById: string,
    taskById: string
}