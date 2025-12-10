import { useState } from 'react'
import { useEditTask } from '../../../api/tasks.api'

import { editTaskStatusOnly } from '@task-app/common/src/zod-schemas/tasks/edit.task.schema'
import { parseLocalStateError } from '../../../utils/parseLocalStateError'
import { useModalStore } from '../../../store/useModalStore'

import { EditTaskFormComponent } from './EditTaskFormComponent'
import { DeleteTaskComponent } from './DeleteTaskComponent'

import { FileCheck } from 'lucide-react'

import type { JSX } from 'react'
import type { TaskCardProps } from '../../../types/domain.types'
import type { ChangeEvent } from 'react'



export const TaskCardComponent = ({ title, description, status, completedAt, taskId, projectId }: TaskCardProps): JSX.Element => {

    const { closeModal, openModal } = useModalStore()

    const { mutate: editTaskStatus, isPending } = useEditTask({ projectId: projectId, taskId: taskId })
    const [validationError, setValidationError] = useState({ type: '', message: '' })


    const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {

        const { value } = e.target
        const resultValue = editTaskStatusOnly.safeParse({ status: value })

        if (!resultValue.success) {
            const error = resultValue.error.issues[0].message;
            setValidationError({ type: 'Warning', message: error })
            return
        }

        const successfullResult = resultValue as unknown as { success: true; data: { status: string } }
        const validatedValue = successfullResult.data.status

        editTaskStatus({ status: validatedValue }, {
            onSuccess: (response) => {
                alert(response.message)
                setValidationError({ type: '', message: '' })
            },
            onError: (error) => {
                const localError = parseLocalStateError(error)
                setValidationError(localError)
            }
        })
    }



    return (
        <div className='task-card-container'>
            {validationError.message && <span className='select-status-error'>{validationError.type}: {validationError.message}</span>}
            <div className='task-status-div'>

                <span className={`project-status ${status}`}>{status}</span>
                <select className='select-status' value={status} onChange={onChangeStatus} disabled={isPending}>
                    <option value='' disabled>Change status</option>
                    <option value='pending'>Pending</option>
                    <option value='on-hold'>On-hold</option>
                    <option value='in-progress'>In-progress</option>
                    <option value='completed'>Completed</option>
                </select>


            </div>
            <div className='task-card-header'>
                <h5>{title}</h5>
            </div>
            <p>{description}</p>
            <div className='task-card-footer'>
                <div className='task-card-button-div'>
                    <button className='task-edit' onClick={() => openModal(<EditTaskFormComponent title={title} description={description} projectId={projectId} taskId={taskId} closeModal={closeModal} />)}>Edit</button>
                    <button className='task-delete' onClick={() => openModal(<DeleteTaskComponent projectId={projectId} taskId={taskId} closeModal={closeModal} />)}>Delete</button>
                </div>

                {completedAt && <FileCheck color='#00a43b' />}
            </div>
        </div>
    )
}