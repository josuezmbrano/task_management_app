import axios from 'axios';

import type { AxiosError, AxiosInstance } from 'axios';



export const axiosClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})



// Flag to determine if a request is being processed
let isRefreshing: boolean = false

// Array of queues for requests that failed so we can process them later
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void
}> = []

// Helper function to handle all failed requests on queue
// If error, reject them all
// If no error, retry and resolve them all
const processQueue = (error: AxiosError | null, token: unknown = null) => {
    
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

export const setupAxiosInterceptor = (): void => {

    axiosClient.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && (error.response.data.errorType === 'UNAUTHORIZED' || error.response.data.errorType === 'INVALID_TOKEN') && originalRequest && !originalRequest._retry) {

            if (originalRequest.url?.includes('/auth/refreshtoken')) {
                return Promise.reject(error)
            }

            originalRequest._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                })
                .then(() => {
                    return axiosClient(originalRequest)
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await axiosClient.post('/auth/refreshtoken')
                processQueue(null)
                return axiosClient(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError as AxiosError)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }

        }
        return Promise.reject(error)
    })

}