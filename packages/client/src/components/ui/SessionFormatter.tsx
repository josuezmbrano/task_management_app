import { SessionStore } from "../../store/useSessionStore";

export const SessionFormatter = () => {

    const {appLifetime} = SessionStore()

    function formatLifetimeCrono(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsRemaining = seconds % 60;

        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(secondsRemaining).padStart(2, '0');

        return `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }

    const lifetime = formatLifetimeCrono(appLifetime)

    return (
        <span>{lifetime}</span>
    )
}