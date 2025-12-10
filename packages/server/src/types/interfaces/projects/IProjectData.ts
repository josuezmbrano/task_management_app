export interface CreateProjectData {
    category: string,
    title: string,
    description: string
    userId: string
}

export interface ProjectUpdateData {
    title?: string
    description?: string
    status?: string
}

export interface UpdateProjectData {
    userId: string
    projectById: string
    projectUpdate: ProjectUpdateData
}

export interface DeleteProjectData {
    userId: string
    projectById: string
}
