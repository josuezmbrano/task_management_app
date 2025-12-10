import { useModalStore } from '../../store/useModalStore'
import { CreateProjectFormComponent } from '../../features/projects/components/CreateProjectFormComponent'

import ProjectManagementIcon from '../../assets/session/project-management.png'
import RocketIcon from '../../assets/session/rocket.png'

import type { JSX } from 'react'

export const EmptyProjectState = (): JSX.Element => {

    const openModal = useModalStore((state) => state.openModal)
    const closeModal = useModalStore((state) => state.closeModal)

    return (
        <section className='empty-project-component'>
            <div className='empty-project-message'>
                <h3>No projects yet? Let's get <span className='empty-project-message-attenuance'>started</span></h3>
                <p>Your projects will appear here.</p>
            </div>
            <div className='empty-project-icon-div'>
                <img src={ProjectManagementIcon} alt='Project-management Icon' />
            </div>
            <div className='empty-project-button-container'>
                <button onClick={() => openModal(<CreateProjectFormComponent closeModal={closeModal} />)}>Create New Project<img src={RocketIcon} alt='Rocket Icon' /></button>
            </div>
        </section>
    )
}