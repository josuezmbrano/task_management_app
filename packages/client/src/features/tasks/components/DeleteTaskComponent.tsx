import { useState } from 'react'
import { useDeleteTask } from '../../../api/tasks.api'
import { parseLocalStateError } from '../../../utils/parseLocalStateError'

import DotsLoading from '../../../assets//svg/3-dots-scale-middle.svg?react'

import type { JSX } from 'react'
import type { DeleteTaskProps } from '../../../types/domain.types'
import type { ErrorState } from '../../../types/error.types'
import type { AxiosError } from 'axios'


export const DeleteTaskComponent = ({ projectId, taskId, closeModal }: DeleteTaskProps): JSX.Element => {

    const { mutate: deleteTask, isPending } = useDeleteTask({ projectId: projectId, taskId: taskId })

    const [errorState, setErrorState] = useState<ErrorState>({ type: '', message: '' })

    const deleteHandler = () => {
        deleteTask(undefined, {
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
                        <div className='task-eliminate-header-div'>
                            <h3>Confirm Deletion</h3>
                        </div>
                        <div className='task-eliminate-warning-div'>
                            <div className='task-eliminate-message'>
                                <p>
                                    Are you sure you want to delete this task? This action cannot
                                    be undone.
                                </p>
                            </div>
                            <div className='task-eliminate-buttons'>
                                <button className='task-eliminate-delete-button' onClick={deleteHandler}>Delete</button>
                                <button className='task-eliminate-cancel-button' onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                        {errorState.message && <span>{errorState.type}: {errorState.message}</span>}
                    </>
                ) : (
                    <div className='eliminating-task-loading'>
                        <h3>Deleting task...</h3>
                        <DotsLoading width='200px' height='120px' />
                    </div>
                )}
        </>
    )

}