import axios from 'axios';

import type { ErrorMessage, ErrorState } from '../types/error.types';

export const parseLocalStateError = (error: unknown): ErrorState => {
    if (axios.isAxiosError(error) && error.response) { 
        const statusCode: number = error.response.status
        const errorData = error.response.data as ErrorMessage
        const message: string = errorData.message


        return {
            type: statusCode.toString(),
            message: message
        }

    } else {
        return {
            type: 'Unknown',
            message: 'An unknown error occurred or the server is unreachable. Please try again.'
        }
    }
}