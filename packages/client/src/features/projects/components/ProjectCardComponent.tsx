import { useState } from 'react'
import { useModalStore } from '../../../store/useModalStore'
import { Link } from 'react-router'

import { EditProjectFormComponent } from './EditProjectFormComponent'
import { DeleteProjectComponent } from './DeleteProjectComponent'


import { useEditProject } from '../../../api/projects.api'
import { parseLocalStateError } from '../../../utils/parseLocalStateError'
import { editProjectStatusOnly } from '@task-app/common/src/zod-schemas/projects/edit.project.schema'

import { Eye } from 'lucide-react'

import type { ChangeEvent } from 'react'
import type { ProjectCardProps } from '../../../types/domain.types'
import type { JSX } from 'react'



export const ProjectCardComponent = ({ title, description, status, projectId }: ProjectCardProps): JSX.Element => {

    const openModal = useModalStore((state) => state.openModal)
    const closeModal = useModalStore((state) => state.closeModal)


    const [validationError, setValidationError] = useState({ type: '', message: '' })

    const { mutate: editProjectStatus, isPending } = useEditProject(projectId)



    const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {

        const { value } = e.target
        const resultValue = editProjectStatusOnly.safeParse({ status: value })

        if (!resultValue.success) {
            const error = resultValue.error.issues[0].message;
            setValidationError({ type: 'Warning', message: error })
            return
        }

        const successfullResult = resultValue as unknown as { success: true; data: { status: string } }
        const validatedValue = successfullResult.data.status

        editProjectStatus({ status: validatedValue }, {
            onSuccess: (response) => {
                alert(response.message)
                setValidationError({ type: '', message: '' })
            },
            onError: (error) => {
                const errorState = parseLocalStateError(error)
                setValidationError(errorState)
            }
        })
    }


    return (
        <div className='project-card-container'>
            {validationError.message && <span className='select-status-error'>{validationError.type}: {validationError.message}</span>}
            <div className='project-status-div'>
                <span className={`project-status ${status}`}>{status}</span>
                <select className='select-status' value={status} onChange={onChangeStatus} disabled={isPending}>
                    <option value='' disabled>Change status</option>
                    <option value='pending'>Pending</option>
                    <option value='on-hold'>On-hold</option>
                    <option value='in-progress'>In-progress</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>
            <div className='project-card-header'>
                <h5>{title}</h5>
            </div>
            <p className='project-description-wrapper'>{description}</p>
            <div className='project-card-footer'>
                <div className='project-card-button-div'>
                    <button className='project-card-edit' onClick={() => openModal(<EditProjectFormComponent projectId={projectId} title={title} description={description} closeModal={closeModal} />)}>Edit</button>
                    <button className='project-card-delete' onClick={() => openModal(<DeleteProjectComponent projectId={projectId} closeModal={closeModal} />)}>Delete</button>
                </div>
                    <Link to={projectId}>
                        <Eye />
                    </Link>
            </div>
        </div>
    )
}