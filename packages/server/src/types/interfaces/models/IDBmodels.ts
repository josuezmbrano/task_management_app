export interface IUserCredentials {
    password: string;
    id: string;
    public_id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date;
    totalAppLifetime: number;
}

export interface ISessionCredentials {
    refreshTokenExpiresAt: Date;
    id: string;
    updatedAt: Date;
    session_public_id: string;
    refreshTokenHashed: string;
    isSessionProcessed: boolean;
    loggedAt: Date;
    loggedOutAt: Date | null;
    lastActiveAt: Date | null;
    logoutReason: string | null;
    totalSessionTime: number;
    owner_id: string;
}