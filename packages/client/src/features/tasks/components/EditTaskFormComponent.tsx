import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editTaskSchema } from '@task-app/common/src/zod-schemas/tasks/edit.task.schema'
import { useEditTask } from '../../../api/tasks.api'
import { useErrorHandler } from '../../../utils/useErrorHandler'

import  DotsLoading from '../../../assets/svg/3-dots-scale-middle.svg?react'

import type { JSX } from 'react'
import type { EditTaskProps } from '../../../types/domain.types'
import type { EditTaskForm } from '../../../types/schema.types'
import type { SubmitHandler } from 'react-hook-form'



export const EditTaskFormComponent = ({ title, description, projectId, taskId, closeModal }: EditTaskProps ): JSX.Element => {

    const { register, handleSubmit, setError, formState: { errors, isDirty } } = useForm<EditTaskForm>({
        resolver: zodResolver(editTaskSchema),
        defaultValues: {
            title: title,
            description: description
        }
    })


    const { mutate: editTask, isPending } = useEditTask({ projectId: projectId, taskId: taskId })
    const { handleAxiosError } = useErrorHandler(setError)


    const onSubmit: SubmitHandler<EditTaskForm> = (updateTask: EditTaskForm) => {

        if (!isDirty) {
            return setError('root.serverError', {
                type: 'Reminder',
                message: 'Must perform a change on at least one of the fields to update'
            })
        }

        editTask(updateTask, {
            onSuccess: (response) => {
                alert(response.message)
                closeModal()
            },
            onError: handleAxiosError
        })
    }



    return (
        <>
            {
                !isPending ? (
                    <>
                        <div className='modal-header-title'>
                            <h3>Edit task</h3>
                        </div>
                        <form className='edit-task-modal-form' onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <input className='edit-task-modal-form-field' {...register('title')} type='text' />
                                {errors.title && <span className='edit-task-modal-form-errors'>{errors.title.message}</span>}
                            </div>

                            <div>
                                <textarea className='edit-task-modal-form-field edit-task-textarea' {...register('description')} />
                                {errors.description && <span className='edit-task-modal-form-errors'>{errors.description.message}</span>}
                            </div>

                            <button type='submit' className='edit-task-form-submit'>Edit Task</button>
                            {errors.root?.serverError && <span className='edit-project-modal-form-errors'>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}

                        </form>
                    </>
                ) : (
                    <div className='editing-task-loading'>
                        <h3>Saving changes...</h3>
                        <DotsLoading width='200px' height='120px'/>
                    </div>
                )}
        </>
    )
}