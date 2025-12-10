import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createProjectSchema } from '@task-app/common/src/zod-schemas/projects/create.project.schema'
import { useCreateProject } from '../../../api/projects.api'
import { useErrorHandler } from '../../../utils/useErrorHandler'

import DotsLoading from '../../../assets/svg/3-dots-scale-middle.svg?react'

import type { CreateProjectForm } from '../../../types/schema.types'
import type { SubmitHandler } from 'react-hook-form'
import type { JSX } from 'react'




export const CreateProjectFormComponent = ({ closeModal }: { closeModal: () => void }): JSX.Element => {


    const { register, handleSubmit, setError, formState: { errors } } = useForm<CreateProjectForm>({
        resolver: zodResolver(createProjectSchema)
    })


    const { mutate: createProject, isPending } = useCreateProject()
    const { handleAxiosError } = useErrorHandler(setError)


    const onSubmit: SubmitHandler<CreateProjectForm> = (projectBody: CreateProjectForm) => {
        createProject(projectBody, {
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
                            <h3>Set up a new project</h3>
                        </div>
                        <form className='create-project-modal-form' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <select className='create-project-modal-form-select' {...register('category')}>
                                    <option value=''>Select an option</option>
                                    <option value='Development/Engineering'>Development/Engineering</option>
                                    <option value='Design/UX'>Design/UX</option>
                                    <option value='Maintenance/Support'>Maintenance/Support</option>
                                    <option value='Infrastructure/Devops'>Infrastructure/Devops</option>
                                    <option value='Data analysis'>Data analysis</option>
                                    <option value='Marketing/Sales'>Marketing/Sales</option>
                                </select>
                                {errors.category && <span className='create-project-modal-form-errors'>{errors.category.message}</span>}
                            </div>

                            <div>
                                <input className='create-project-modal-form-field' {...register('title')} type='text' placeholder='Project title' />
                                {errors.title && <span className='create-project-modal-form-errors'>{errors.title.message}</span>}
                            </div>

                            <div>
                                <textarea className='create-project-modal-form-field create-project-textarea' {...register('description')} placeholder='Project description' />
                                {errors.description && <span className='create-project-modal-form-errors'>{errors.description.message}</span>}
                            </div>

                            <button className='create-project-form-submit' disabled={isPending} type='submit'>Create project</button>
                            {errors.root?.serverError && <span>{errors.root.serverError.type}: {errors.root.serverError.message}</span>}

                        </form>
                    </>
                )
                :
                (
                    <div className='creating-project-loading'>
                        <h3>Creating project...</h3>
                        <DotsLoading width='200px' height='120px'/>
                    </div>
                )
            }
        </>
    )

}