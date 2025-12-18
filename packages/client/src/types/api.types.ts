import type { ProjectCategory } from "./domain.types";


// AUTH RELATED API RESPONSE TYPES
export interface AuthUserData {
    public_id: string
    username: string;
    firstname: string;
    lastname: string;
    session_public_id: string;
}

export interface AuthUserResponseSuccesData {
    message: string
    user: AuthUserData
}

export interface AuthResponseSuccess {
    message: string
}

export interface AuthResponseError {
    message: string | string[]
    errorType: string
}



// PROJECTS RELATED API RESPONSE TYPES
export interface ProjectsData {
    public_id: string
    title: string
    description: string
    category: string
    status: string
}

export interface ProjectsArrayResponseSuccessData {
    message: string
    projects: ProjectsData[]
}

export interface GetProjectsData {
    totalInDatabase: number
    filteredProjects: ProjectsData[]
}

export interface GetProjectsArrayResponseSuccessData {
    message: string
    projects: GetProjectsData
}

export interface ProjectResponseSuccessData {
    message: string
    projects: ProjectsData
}

export interface ProjectsResponseSuccess {
    message: string
}

export interface ProjectsResponseError {
    message: string
    errorType: string
}



// TASKS RELATED API RESPONSES TYPES
export interface TasksData {
    title: string;
    description: string;
    public_id: string;
    completedAt: Date | null;
    status: string;
}

export interface TasksArrayResponseSuccessData {
    message: string
    tasks: TasksData[]
}

export interface TaskResponseSuccessData {
    message: string
    tasks: TasksData
}

export interface TaskResponseSuccess {
    message: string
}

export interface TaskResponseError {
    message: string
    errorType: string
}


// METRIC CHARTS RELATED API RESPONSES
export interface TaskActivityMetric {
    day: string
    count: number
}

export interface TaskActivityChartResponseSuccess {
    message: string
    tasksCountChart: TaskActivityMetric[]
}

export interface ProjectsCountMetrics {
    total: number;
    pending: number;
    'on-hold': number;
    'in-progress': number;
    completed: number;
}

export interface ProjectsCountMetricsSuccessData {
    message: string
    projectsCountMetrics: ProjectsCountMetrics
}

export type ChartPieMetrics = {
    category: ProjectCategory
    projectPercentage: number
    categoryTotalProjects: number
    total_tasks: number
    total_completed: number
    total_not_completed: number
} & Record<string, unknown>

export interface PieChartResponseSuccess {
    message: string
    pieChartMetrics: ChartPieMetrics[]
}

export interface PieChartResponseError {
    message: string
    errorType: string
}


// USER SESSION RELATED API RESPONSES 
export interface AppLifeTimeResponseSuccessData {
    message: string
    totalAppLifetime: number
}

export interface AppLifeTimeResponseError {
    message: string
    errorType: string
}

export interface SessionPersistentSuccessData {
    message: string
    user: AuthUserData
}

export interface SessionResponseError {
    message: string
    errorType: string
}

export interface CleanupSessionResponseError {
    message: string
    error: string
}