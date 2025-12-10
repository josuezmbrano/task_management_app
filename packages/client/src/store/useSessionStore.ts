import { create } from 'zustand';

interface SessionState {
    appLifetime: number
}

interface SessionActions {
    initializeAppLifetime: (seconds: number) => void
    updateAppLifetime: (value: number | ((prevValue: number) => number)) => void
}

export const SessionStore = create<SessionState & SessionActions>((set) => ({
    appLifetime: 0,
    initializeAppLifetime: (seconds) => set(({appLifetime: seconds})), // Add appLifetime metric value from api,
    updateAppLifetime: (value) => set((state) => ({appLifetime: typeof value === 'function' ? value(state.appLifetime) : value})) // Accept a direct assignment or a function based on the prev state
}))