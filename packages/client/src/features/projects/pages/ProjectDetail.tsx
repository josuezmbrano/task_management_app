import { Link, useParams } from 'react-router'
import { useGetProjectById } from '../../../api/projects.api'
import { useGetTasks } from '../../../api/tasks.api'
import { useModalStore } from '../../../store/useModalStore'

import { EmptyTasksState } from '../../../components/ui/EmptyTasksState'
import { CreateTaskFormComponent } from '../../../features/tasks/components/CreateTaskFormComponent'
import { TaskListComponent } from '../../../features/tasks/components/TaskListComponent'
import { ModalWrapper } from '../../../components/ui/ModalWrapper'

import { CircleArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../../assets/svg/loading-spinner.svg?react'
import BlockShuffle from '../../../assets/svg/blocks-shuffle.svg?react'
import ErrorImg from '../../../assets/session/error.png'
import NotFound from '../../../assets/session/infeliz.png'

import type { JSX } from 'react'



export const ProjectDetail = (): JSX.Element => {

    const { openModal, closeModal, isOpen } = useModalStore()

    const { projectId } = useParams()
    const { project, isPending, isLoading, error } = useGetProjectById(projectId as string)
    const { tasks = [], tasksLoading, tasksPending } = useGetTasks(projectId as string)


    if (isLoading || isPending) {
        return (
            <div className='project-detail-loading-state'>
                <LoadingSpinner />
                <h4>Loading project information..</h4>
            </div>
        )
    }

    if (error) {
        return (
            <div className='error-connection-project-detail'>
                <Link to='../projects'><CircleArrowLeft size={35} color='#0aa6eeff' />Go back to projects</Link>
                <h4>Could not stablish connection. project information failed</h4>
                <img src={ErrorImg} alt='error-project-detail' />
            </div>
        )
    }

    if (!project) {
        return (
            <div className='error-project-detail'>
                <Link to='../projects'><CircleArrowLeft size={35} color='#0aa6eeff' />go back to projects</Link>
                <div className='error-project-detail-info'>
                    <img src={NotFound} />
                    <h1>404</h1>
                    <h4>Project not found</h4>
                    <p>The project with ID: '{projectId}' doesnt exist or you dont have access.</p>
                </div>
            </div>
        )
    }


    return (
        <section className='project-detail-section'>

            <div className='project-detail-uppercontainer'>
                <nav className='project-detail-nav'>
                    <Link className='project-detail-arrow' to='../projects'><CircleArrowLeft size={35} color='#ffffff' /></Link>
                    <h5>Task details</h5>
                </nav>
                <div className='project-detail-info-container'>
                    <h2><span className='brand-info'>Synergy</span> - {project.title}</h2>
                    <div className='project-detail-info'>
                        <span>Description</span>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>

            <div className='project-detail-lowercontainer'>
                {tasksPending || tasksLoading ? (
                    <div className='project-tasks-loading-blocks'>
                        <BlockShuffle width='200px'/>
                        <p>Checking for tasks..</p>
                    </div>
                ) : tasks.length > 0 ? (
                    <>
                        <div className='project-detail-list-header'>
                            <h5>Tasks</h5>
                            <button onClick={() => openModal(<CreateTaskFormComponent projectId={projectId as string} closeModal={closeModal} />)}>Create task</button>
                        </div>
                        <div className='project-detail-tasklist'>
                            <TaskListComponent tasks={tasks} projectId={projectId as string} />
                        </div>
                    </>
                ) : (
                    <EmptyTasksState projectId={projectId as string} />
                )}
            </div>

            {isOpen && <ModalWrapper />}

        </section>
    )
}