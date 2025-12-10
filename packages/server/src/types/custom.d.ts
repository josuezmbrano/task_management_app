import { Request } from 'express-serve-static-core';
import { TaskActivityMetric, ChartPieMetrics } from './interfaces/stats/metrics.types.ts';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string
        sessionId?: string
        refreshToken?: string
        hashedRefreshToken?: string
        refreshTokenExpiresAt?: Date
    }
}

// AUTH RELATED RESPONSES
export interface AuthUserData {
    public_id: string;
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



// PROJECTS RELATED RESPONSES
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



// TASKS RELATED RESPONSES
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


//  CHARTS RELATED RESPONSE 

export interface TaskActivityChartResponseSuccess {
    message: string
    tasksCountChart: TaskActivityMetric[]
}

export interface PieChartResponseSuccess {
    message: string
    pieChartMetrics: ChartPieMetrics[]
}

export interface PieChartResponseError {
    message: string
    errorType: string
}


// USER SESSION RELATED RESPONSES
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
