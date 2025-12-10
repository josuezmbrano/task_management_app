import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTaskSchema } from '@task-app/common/src/zod-schemas/tasks/create.task.schema'
import { useCreateTask } from '../../../api/tasks.api'
import { useErrorHandler } from '../../../utils/useErrorHandler'

import DotsLoading from '../../../assets/svg/3-dots-scale-middle.svg?react'

import type { CreateTaskProps } from '../../../types/domain.types'
import type { CreateTaskForm } from '../../../types/schema.types'
import type { SubmitHandler } from 'react-hook-form'
import type { JSX } from 'react'



export const CreateTaskFormComponent = ({ projectId, closeModal }: CreateTaskProps): JSX.Element => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<CreateTaskForm>({
        resolver: zodResolver(createTaskSchema)
    })

    const { mutate: createTask, isPending } = useCreateTask(projectId)
    const { handleAxiosError } = useErrorHandler(setError)

    const onSubmit: SubmitHandler<CreateTaskForm> = (taskBody: CreateTaskForm) => {
        createTask(taskBody, {
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
                            <h3>Create task</h3>
                        </div>
                        <form className='create-task-modal-form' onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <input className='create-task-modal-form-field' {...register('title')} type='text' placeholder='Task title'/>
                                {errors.title && <span className='create-task-modal-form-errors'>{errors.title.message}</span>}
                            </div>

                            <div>
                                <textarea className='create-task-modal-form-field create-task-textarea'{...register('description')} placeholder='Task description' />
                                {errors.description && <span className='create-task-modal-form-errors'>{errors.description.message}</span>}
                            </div>

                            <button className='create-task-form-submit'>Create task</button>
                            {errors.root?.serverError && <span className='create-task-modal-form-errors'>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}

                        </form>
                    </>

                )
                :
                (
                    <div className='creating-task-loading'>
                        <h3>Adding task...</h3>
                        <DotsLoading width='200px' height='120px'/>
                    </div>
                )}
        </>
    )
}