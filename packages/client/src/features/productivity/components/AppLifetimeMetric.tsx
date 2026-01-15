

import type { JSX } from 'react';

export const AppLifetimeMetric = ({ tasksCompletedCount, appLifetime }: { tasksCompletedCount: number, appLifetime: number }): JSX.Element => {
    
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
        <section className='global-lifetime-summary-section'>
            <div className='global-lifetime-summary-div'>
                <div className='global-lifetime-left-div'>
                    <h5>Lifetime Usage</h5>
                    <span>{lifetime}</span>
                </div>
                <div className='global-lifetime-right-div'>
                    <h5>Tasks completed</h5>
                    <span>{tasksCompletedCount}</span>
                </div>
            </div>
        </section>
    );
}