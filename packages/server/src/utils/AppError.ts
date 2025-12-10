export class AppError extends Error {
    public errorType: string
    public status: number;
    public isOperational: boolean;

    constructor(message: string, errorType: string, statusCode: number = 500) {
        super(message)
        
        this.errorType = errorType
        this.status = statusCode
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}