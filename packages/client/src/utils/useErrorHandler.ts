import axios from 'axios'

import type { AxiosError } from 'axios'
import type { FieldValues, GlobalError, UseFormSetError } from 'react-hook-form'
import type { ErrorMessage } from '../types/error.types'

export const useErrorHandler = <TForm extends FieldValues>(setError: UseFormSetError<TForm & GlobalError>) => {
    const handleAxiosError = (error: AxiosError) => {

        if (axios.isAxiosError(error) && error.response) {
            const statusCode: number = error.response.status
            const errorData = error.response.data as ErrorMessage
            const message: string = errorData.message

            return setError('root.serverError', {
                type: statusCode.toString(),
                message: message
            })

        } else {
            return setError('root.serverError', {
                type: 'Unknown',
                message: 'An unknown error occurred or the server is unreachable. Please try again.'
            })
        }       
    }

    return {handleAxiosError}
}