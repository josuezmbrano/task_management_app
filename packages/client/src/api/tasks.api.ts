import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from './axiosClient';

import type { TasksArrayResponseSuccessData, TaskResponseError, TasksData, TaskResponseSuccessData, TaskResponseSuccess } from '../types/api.types';
import type { AxiosError } from 'axios';
import type { CreateTaskForm, EditTaskForm } from '../types/schema.types';



export const useGetTasks = (projectId: string) => {

    const tasksQuery = useQuery<TasksArrayResponseSuccessData, AxiosError<TaskResponseError>, TasksData[]>({
        queryKey: ['user-tasks', projectId],
        queryFn: async () => {

            const response = await axiosClient.get(`/projects/${projectId}/tasks`)
            return response.data

        },
        select: (data) => data.tasks,
        enabled: !!projectId
    })

    return { tasksLoading: tasksQuery.isLoading, tasksPending: tasksQuery.isPending, tasks: tasksQuery.data }

}


export const useCreateTask = (projectId: string) => {
    const queryClient = useQueryClient()

    return useMutation<TaskResponseSuccessData, AxiosError<TaskResponseError>, CreateTaskForm>({

        mutationFn: async (taskBody) => {

            const response = await axiosClient.post(`/projects/${projectId}/tasks`, taskBody)
            return response.data

        },
        onSuccess: (newTaskWrapper) => {

            const newTask = newTaskWrapper.tasks

            queryClient.setQueryData<TasksArrayResponseSuccessData>(['user-tasks', projectId], (oldData) => {
                const currentTasks = oldData?.tasks || []
                return oldData ? { ...oldData, tasks: [newTask, ...currentTasks] } : { message: 'Project tasks fetched successfully', tasks: [newTask] }
            })

            queryClient.invalidateQueries({ queryKey: ['user-tasks', projectId] })

        }
    })
}


export const useEditTask = ({ projectId, taskId }: { projectId: string, taskId: string }) => {
    const queryClient = useQueryClient()

    return useMutation<TaskResponseSuccessData, AxiosError<TaskResponseError>, EditTaskForm>({

        mutationFn: async (taskUpdate) => {

            const response = await axiosClient.patch(`/projects/${projectId}/tasks/${taskId}`, taskUpdate)
            return response.data

        },
        onSuccess: (updatedTaskWrapper) => {

            const updatedTask = updatedTaskWrapper.tasks

            queryClient.setQueryData<TasksArrayResponseSuccessData>(['user-tasks', projectId], (oldData) => {

                const currentTasks = oldData?.tasks || []

                const tasksResponse = { message: 'Project tasks fetched successfully', tasks: currentTasks.map(task => task.public_id === taskId ? updatedTask : task) }

                return oldData ? tasksResponse : { message: '', tasks: [updatedTask] }
            })

            queryClient.invalidateQueries({ queryKey: ['user-tasks', projectId] })

        }
    })
}


export const useDeleteTask = ({ projectId, taskId }: { projectId: string, taskId: string }) => {
    const queryClient = useQueryClient()

    return useMutation<TaskResponseSuccess, AxiosError<TaskResponseError>>({
        mutationFn: async () => {

            const response = await axiosClient.delete(`/projects/${projectId}/tasks/${taskId}`)
            return response.data

        },
        onSuccess: () => {

            queryClient.setQueryData<TasksArrayResponseSuccessData>(['user-tasks', projectId], (oldData) => {
                const currentTasks = oldData?.tasks || []

                const tasksResponse = { message: 'Project tasks fetched successfully', tasks: currentTasks.filter(task => task.public_id !== taskId) }

                return tasksResponse
            })

            queryClient.invalidateQueries({ queryKey: ['user-tasks', projectId] })

        }
    })
}