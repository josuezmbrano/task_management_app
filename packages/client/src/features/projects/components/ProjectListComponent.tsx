
import { ProjectCardComponent } from './ProjectCardComponent'
import { useModalStore } from '../../../store/useModalStore'


import { CreateProjectFormComponent } from './CreateProjectFormComponent'

import type { ProjectsData } from '../../../types/api.types'
import type { JSX } from 'react'




export const ProjectListComponent = ({ projects }: { projects: ProjectsData[] }): JSX.Element => {

    const openModal = useModalStore((state) => state.openModal)
    const closeModal = useModalStore((state) => state.closeModal)


    const projectList: JSX.Element[] = projects.map(project => {
        return (
            <ProjectCardComponent
                key={project.public_id}
                title={project.title}
                description={project.description}
                status={project.status}
                projectId={project.public_id}
            />
        )
    })


    return (
        <section>
            <div className='project-list-create'>
                <button onClick={() => openModal(<CreateProjectFormComponent closeModal={closeModal} />)}>Create new project</button>
            </div>
            <div className='project-list-container'>{projectList}</div>
        </section>
    )
}