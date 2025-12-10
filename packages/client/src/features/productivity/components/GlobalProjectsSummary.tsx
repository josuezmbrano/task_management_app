import { Clock8, Pause, Cog, BadgeCheck } from 'lucide-react';
import FolderImg from '../../../assets/session/folders.png'

import type { ProjectsCountMetricsProps } from '../../../types/domain.types'
import type { JSX } from 'react';

export const GlobalProjectsSummary = ({ projectsMetrics }: { projectsMetrics: ProjectsCountMetricsProps }): JSX.Element => {

    const totalCount = projectsMetrics.total
    const pendingCount = projectsMetrics.pending
    const onHoldCount = projectsMetrics['on-hold']
    const inProgressCount = projectsMetrics['in-progress']
    const completedCount = projectsMetrics.completed

    return (
        <section className='global-project-summary-section'>
            <div className='global-project-summary-container'>

                <div className='global-project-summary-top'>
                    <div className='total-projects-summary'>
                        <span>Total projects</span>
                        <div className='total-card-bottom'>
                            <img src={FolderImg} alt='folder-icon'/>
                            <h3>{totalCount}</h3>
                        </div>
                    </div>
                </div>


                <div className='global-project-summary-bottom'>

                    <div className='global-project-bottom-top'>
                        <div className='pending-projects-summary'>
                            <span>Pending</span>
                            <div className='bottom-card-summary-div pending-summary'>
                                <Clock8 size={40} />
                                <h2>{pendingCount}</h2>
                            </div>
                        </div>
                        <div className='onhold-projects-summary'>
                            <span>On-hold</span>
                            <div className='bottom-card-summary-div onhold-summary'>
                                <Pause size={40} />
                                <h2>{onHoldCount}</h2>
                            </div>
                        </div>
                    </div>

                    <div className='global-project-bottom-bottom'>
                        <div className='inprogress-projects-summary'>
                            <span>In-progress</span>
                            <div className='bottom-card-summary-div inprogress-summary'>
                                <Cog size={40} />
                                <h2>{inProgressCount}</h2>
                            </div>
                        </div>
                        <div className='completed-projects-summary'>
                            <span>Completed</span>
                            <div className='bottom-card-summary-div completed-summary'>
                                <BadgeCheck size={40} />
                                <h2>{completedCount}</h2>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}