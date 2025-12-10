import { axiosClient } from './axiosClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUserSlice } from '../store/authSlice'


import type { AppLifeTimeResponseSuccessData, AppLifeTimeResponseError, SessionPersistentSuccessData, SessionResponseError, AuthUserData, ProjectsCountMetricsSuccessData, ProjectsResponseError, ProjectsCountMetrics } from 'src/types/api.types'
import type { TaskActivityChartResponseSuccess, TaskResponseError, TaskActivityMetric } from 'src/types/api.types'
import type { PieChartResponseSuccess, PieChartResponseError, ChartPieMetrics } from 'src/types/api.types'
import type { AxiosError } from 'axios'




export const useSessionPersistent = (): { isLoading: boolean } => {

    const setUser = createUserSlice(state => state.setUser)
    const setIsLoggedIn = createUserSlice(state => state.setIsLoggedIn)


    const result = useQuery<SessionPersistentSuccessData, AxiosError<SessionResponseError>, AuthUserData>({
        queryKey: ['user-session'],
        queryFn: async () => {
            const response = await axiosClient.get('/user/session')
            return response.data
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
        select: (data) => data.user
    })


    if (result.isSuccess) {
        setUser(result.data)
        setIsLoggedIn(true)
    }

    if (result.isError) {
        setUser(null)
        setIsLoggedIn(false)
    }

    return { isLoading: result.isLoading }
}



export const useSessionMetrics = () => {
    const isLoggedIn = createUserSlice(state => state.isLoggedIn)
    const sessionId = createUserSlice((state) => state.user?.session_public_id)

    const appTime = useQuery<AppLifeTimeResponseSuccessData, AxiosError<AppLifeTimeResponseError>, number>({
        queryKey: ['session-metrics', sessionId],
        queryFn: async () => {
            const response = await axiosClient.get('/user/session/metrics')
            return response.data
        },
        enabled: isLoggedIn && !!sessionId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (data) => data.totalAppLifetime
    })

    return {appTime: appTime.data, appTimePending: appTime.isPending}
}


export const useSessionHeartBeat = () => {
    return useMutation<undefined, AxiosError<SessionResponseError>>({
        mutationFn: async () => {
            await axiosClient.patch('/user/session/heartbeat')
        }
    })
}


export const useGetProjectsCount = () => {

    const projectsCountQuery = useQuery<ProjectsCountMetricsSuccessData, AxiosError<ProjectsResponseError>, ProjectsCountMetrics>({
        queryKey: ['projects-count'],
        queryFn: async () => {
            const response = await axiosClient.get('/user/stats/projectscount')
            return response.data
        },
        select: (data) => data.projectsCountMetrics
    })

    return { countError: projectsCountQuery.error, countPending: projectsCountQuery.isPending, projectsMetrics: projectsCountQuery.data }
}


export const useGetTaskActivityChartMetrics = () => {

    const taskActivityQuery = useQuery<TaskActivityChartResponseSuccess, AxiosError<TaskResponseError>, TaskActivityMetric[]>({
        queryKey: ['seven-days-completed'],
        queryFn: async () => {
            const response = await axiosClient.get('/user/stats/taskactivitychart')
            return response.data
        },
        select: (data) => data.tasksCountChart
    })

    return {activityChartError: taskActivityQuery.error, activityChartPending: taskActivityQuery.isPending, taskActivityChart: taskActivityQuery.data}
}


export const useGetPieChartMetrics = () => {

    const pieChartMetricsQuery = useQuery<PieChartResponseSuccess, AxiosError<PieChartResponseError>, ChartPieMetrics[]>({
        queryKey: ['productivity-chart-pie'],
        queryFn: async () => {
            const response = await axiosClient.get('/user/stats/piechartmetrics')
            return response.data
        },
        select: (data) => data.pieChartMetrics
    })

    return {pieChartError: pieChartMetricsQuery.error, pieChartPending: pieChartMetricsQuery.isPending, pieChartData: pieChartMetricsQuery.data}
}