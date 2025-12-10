import { SessionFormatter } from '../../../components/ui/SessionFormatter';

import type { JSX } from 'react';

export const AppLifetimeMetric = ({ tasksCompletedCount }: { tasksCompletedCount: number }): JSX.Element => {
    

    return (
        <section className='global-lifetime-summary-section'>
            <div className='global-lifetime-summary-div'>
                <div className='global-lifetime-left-div'>
                    <h5>Lifetime Usage</h5>
                    <SessionFormatter />
                </div>
                <div className='global-lifetime-right-div'>
                    <h5>Tasks completed</h5>
                    <span>{tasksCompletedCount}</span>
                </div>
            </div>
        </section>
    );
}