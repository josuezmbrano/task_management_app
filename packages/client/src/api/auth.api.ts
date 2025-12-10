import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from './axiosClient';
import { createUserSlice } from '../store/authSlice';

import type { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { AuthUserResponseSuccesData, AuthResponseError, AuthResponseSuccess } from '../types/api.types';
import type { LoginForm } from '../types/schema.types';
import type { SignupForm } from '../types/schema.types'




export const useLogin = () => {
    const queryClient: QueryClient = useQueryClient()

    const setUser = createUserSlice((state) => state.setUser)
    const setIsLoggedIn = createUserSlice((state) => state.setIsLoggedIn)

    return useMutation<AuthUserResponseSuccesData, AxiosError<AuthResponseError>, LoginForm>({
        mutationFn: async (credentials) => {
            const response = await axiosClient.post('/auth/login', credentials)
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user-session'] })
            setUser(data.user)
            setIsLoggedIn(true)
        }
    })
}

export const useSignup = () => {

    const setUser = createUserSlice((state) => state.setUser)
    const setIsLoggedIn = createUserSlice((state) => state.setIsLoggedIn)

    return useMutation<AuthUserResponseSuccesData, AxiosError<AuthResponseError>, SignupForm>({
        mutationFn: async (credentials) => {
            const response = await axiosClient.post('/auth/register', credentials)
            return response.data
        },
        onSuccess: (data) => {
            setUser(data.user)
            setIsLoggedIn(true)
        }
    })
}

export const useLogout = () => {
    const queryClient: QueryClient = useQueryClient()

    const setUser = createUserSlice((state) => state.setUser)
    const setIsLoggedIn = createUserSlice((state) => state.setIsLoggedIn)

    return useMutation<AuthResponseSuccess, AxiosError<AuthResponseError>, undefined>({
        mutationFn: async () => {
            const response = await axiosClient.post('/auth/logout')
            return response.data
        },
        onSuccess: () => {
            setUser(null)
            setIsLoggedIn(false)
            queryClient.clear()
        }
    })
}

export const useChangePassword = () => {

    const queryClient: QueryClient = useQueryClient()

    return useMutation<AuthResponseSuccess, AxiosError<AuthResponseError>, undefined>({
        mutationFn: async (passwords) => {
            const response = await axiosClient.patch('/auth/changepassword', passwords)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-session'] })
        }
    })
}

export const useRefreshToken = () => {

    const queryClient: QueryClient = useQueryClient()

    const setUser = createUserSlice((state) => state.setUser)
    const setIsLoggedIn = createUserSlice((state) => state.setIsLoggedIn)

    return useMutation<AuthResponseSuccess, AxiosError<AuthResponseError>, undefined>({
        mutationFn: async () => {
            const response = await axiosClient.post('/auth/refreshtoken')
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-session'] })
        },
        onError: () => {
            setUser(null)
            setIsLoggedIn(false)
            queryClient.clear()
        }
    })
}
