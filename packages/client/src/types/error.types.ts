export interface GlobalError {
    'root.serverError': {type: string | null; message: string | undefined}
}

export type ErrorMessage = {
    message: string
}

export type ErrorState = {
    type: string
    message: string
}