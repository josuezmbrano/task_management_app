import { useModalStore } from '../../store/useModalStore'
import { CreateTaskFormComponent } from '../../features/tasks/components/CreateTaskFormComponent'

import TaskIcon from '../../assets/session/task.png'

import type { JSX } from 'react'



export const EmptyTasksState = ({ projectId }: { projectId: string }): JSX.Element => {

    const { openModal, closeModal } = useModalStore()

    return (
        <section className='empty-task-component'>
            <div className='empty-task-message'>
                <h3>
                    No tasks yet?
                    <br />
                    ¡start planning your next step!
                </h3>
                <p>Your list will be shown here once you start adding tasks</p>
            </div>
            <div className='empty-task-icon-div'>
                <img src={TaskIcon} alt='empty-task-image' />
            </div>

            <div className='empty-task-button-container'>
                <button onClick={() => openModal(<CreateTaskFormComponent projectId={projectId} closeModal={closeModal} />)}>Add your first task</button>
            </div>
        </section>
    )
}