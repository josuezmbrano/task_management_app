import { useState } from 'react'
import { useDeleteProject } from '../../../api/projects.api'

import { parseLocalStateError } from '../../../utils/parseLocalStateError'

import DotsLoading from '../../../assets/svg/3-dots-scale-middle.svg?react'

import type { DeleteProjectProps } from '../../../types/domain.types'
import type { ErrorState } from '../../../types/error.types'
import type { AxiosError } from 'axios'
import type { JSX } from 'react'


export const DeleteProjectComponent = ({ projectId, closeModal }: DeleteProjectProps): JSX.Element => {

    const { mutate: deleteProject, isPending } = useDeleteProject(projectId)

    const [errorState, setErrorState] = useState<ErrorState>({type: '', message: ''})


    const deleteHandler = () => {
        deleteProject(undefined, {
            onSuccess: (response) => {
                alert(response.message)
                setErrorState({ type: '', message: '' })
                closeModal()
            },
            onError: (error: AxiosError) => {
                const localError = parseLocalStateError(error)
                setErrorState(localError)
            }
        })
    }


    return (
        <>
            {!isPending ?
                (
                    <>
                        <div className='project-eliminate-warning'>
                            <h3>Are you sure?</h3>
                            <p>This action cannot be undone. All values associated with this project will be lost</p>
                        </div>
                        <div className='project-eliminate-buttons'>
                            <button className='project-eliminate-delete-button' onClick={deleteHandler}>Delete project</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                        {errorState.message && <span>{errorState.type}: {errorState.message}</span>}
                    </>
                )
                :
                (
                    <div className='eliminate-project-loading'>
                        <h3>Deleting project...</h3>
                        <DotsLoading width='200px' height='120px' />
                    </div>
                )
            }
        </>
    )

    
}