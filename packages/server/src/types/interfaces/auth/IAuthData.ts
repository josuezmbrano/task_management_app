export interface ChangePasswordData {
    userId: string
    password: string,
    newPassword: string
}

export interface LoginData {
    username: string,
    password: string,
    email: string
    hashedRefreshToken: string
    searchToken: string
    refreshTokenExpiresAt: Date
}

export interface RegisterData {
    username: string
    email: string
    password: string
    firstname: string
    lastname: string
    hashedRefreshToken: string
    searchToken: string
    refreshTokenExpiresAt: Date
}

export interface SessionData {
    userId: string
    sessionId: string
}

export interface RefreshTokenData {
    userId: string
    sessionId: string
}

export type IAuthPayload = {
    userId: string
    sessionId: string
}
