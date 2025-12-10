import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { editProjectSchema } from '@task-app/common/src/zod-schemas/projects/edit.project.schema'
import { useEditProject } from '../../../api/projects.api'
import { useErrorHandler } from '../../../utils/useErrorHandler'

import DotsLoading from '../../../assets/svg/3-dots-scale-middle.svg?react'

import type { EditProjectForm } from '../../../types/schema.types'
import type { EditProjectProps } from '../../../types/domain.types'
import type { SubmitHandler } from 'react-hook-form'
import type { JSX } from 'react'


export const EditProjectFormComponent = ({ projectId, title, description, closeModal }: EditProjectProps): JSX.Element => {

    const { register, handleSubmit, setError, formState: { errors, isDirty } } = useForm<EditProjectForm>({
        resolver: zodResolver(editProjectSchema),
        defaultValues: {
            title: title,
            description: description
        }
    })

    const { mutate: editProject, isPending } = useEditProject(projectId)
    const { handleAxiosError } = useErrorHandler(setError)

    const onSubmit: SubmitHandler<EditProjectForm> = (projectUpdate: EditProjectForm) => {

        if (!isDirty) {
            return setError('root.serverError', {
                type: 'Reminder',
                message: 'Must perform a change on at least one of the fields to update'
            })
        }

        editProject(projectUpdate, {
            onSuccess: (response) => {
                alert(response.message)
                closeModal()
            },
            onError: handleAxiosError
        })

    }



    return (
        <>
            {!isPending ?
                (
                    <>
                        <div className='modal-header-title'>
                            <h3>Edit project</h3>
                        </div>
                        <form className='edit-project-modal-form' onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <input className='edit-project-modal-form-field' {...register('title')} type='text' />
                                {errors.title && <span className='edit-project-modal-form-errors'>{errors.title.message}</span>}
                            </div>

                            <div>
                                <textarea className='edit-project-modal-form-field edit-project-textarea' {...register('description')} />
                                {errors.description && <span className='edit-project-modal-form-errors'>{errors.description.message}</span>}
                            </div>

                            <button className='edit-project-form-submit' type='submit'>Save changes</button>
                            {errors.root?.serverError && <span className='edit-project-modal-form-errors'>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}

                        </form>
                    </>
                )
                :
                (
                    <div className='editing-project-loading'>
                        <h3>Editing project...</h3>
                        <DotsLoading width='200px' height='120px'/>
                    </div>
                )
            }
        </>
    )
}