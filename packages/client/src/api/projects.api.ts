import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from './axiosClient';

import type { ProjectsArrayResponseSuccessData, ProjectResponseSuccessData, ProjectsResponseError, ProjectsData, ProjectsResponseSuccess } from 'src/types/api.types';
import type { CreateProjectForm, EditProjectForm, EditProjectStatus } from 'src/types/schema.types';
import type { AxiosError } from 'axios';



export const useGetProjects = () => {

    const projectsQuery = useQuery<ProjectsArrayResponseSuccessData, AxiosError<ProjectsResponseError>, ProjectsData[]>({
        queryKey: ['user-projects'],
        queryFn: async () => {
            const response = await axiosClient.get('/projects/')
            return response.data
        },
        select: (data) => data.projects
    })

    return { isLoading: projectsQuery.isLoading, isPending: projectsQuery.isPending, projects: projectsQuery.data }
}


export const useGetProjectById = (projectId: string) => {

    const projectQuery = useQuery<ProjectResponseSuccessData, AxiosError<ProjectsResponseError>, ProjectsData>({
        queryKey: ['user-project', projectId],
        queryFn: async () => {
            const response = await axiosClient.get(`/projects/${projectId}`)
            return response.data
        },
        select: (data) => data.projects,
        enabled: !!projectId
    })

    return { isLoading: projectQuery.isLoading, isPending: projectQuery.isPending, error: projectQuery.error, project: projectQuery.data }
}



export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation <ProjectResponseSuccessData, AxiosError<ProjectsResponseError>, CreateProjectForm>({

        mutationFn: async (projectBody) => {
            const response = await axiosClient.post('/projects/', projectBody)
            return response.data
        },
        onSuccess: (newProjectWrapper) => {
            const newProject = newProjectWrapper.projects

            queryClient.setQueryData<ProjectsArrayResponseSuccessData>(['user-projects'], (oldData) => {
                const currentProjects = oldData?.projects || []
                return oldData ? {...oldData, projects: [newProject, ...currentProjects]} : {message: 'User projects fetched successfully', projects: [newProject]}
            })

            queryClient.invalidateQueries({ queryKey: ['user-projects'] })

        }
    })
}



export const useEditProject = (projectId: string) => {
    const queryClient = useQueryClient()

    return useMutation<ProjectResponseSuccessData, AxiosError<ProjectsResponseError>, EditProjectForm | EditProjectStatus>({

        mutationFn: async (projectUpdate) => {
            const response = await axiosClient.patch(`/projects/${projectId}`, projectUpdate)
            return response.data
        },
        onSuccess: (updatedProjectWrapper) => {

            const updatedProject = updatedProjectWrapper.projects


            queryClient.setQueryData<ProjectsArrayResponseSuccessData>(['user-projects'], (oldData) => {
                const currentProjects = oldData?.projects || []

                const projectsResponse = {message: 'User projects fetched successfully', projects: currentProjects.map(project => project.public_id === projectId ? updatedProject : project)}

                return oldData ? projectsResponse : {message: 'User projects fetched successfully', projects: [updatedProject]}
            })

            queryClient.setQueryData<ProjectsData>(['user-project', projectId], updatedProject)

            queryClient.invalidateQueries({ queryKey: ['user-projects'] })
            queryClient.invalidateQueries({ queryKey: ['user-project', projectId] })

        }
    })
}



export const useDeleteProject = (projectId: string) => {
    const queryClient = useQueryClient()

    return useMutation<ProjectsResponseSuccess, AxiosError<ProjectsResponseError>>({

        mutationFn: async () => {
            const response = await axiosClient.delete(`/projects/${projectId}`)
            return response.data
        },
        onSuccess: () => {

            queryClient.setQueryData<ProjectsArrayResponseSuccessData>(['user-projects'], (oldData) => {
                const currentProjects = oldData?.projects || []
                
                const projectResponse = {message: 'User projects fetched successfully', projects: currentProjects.filter(project => project.public_id !== projectId)}

                return projectResponse 
            })

            queryClient.invalidateQueries({ queryKey: ['user-projects'] })
            queryClient.removeQueries({ queryKey: ['user-project', projectId] })

        }

    })
}