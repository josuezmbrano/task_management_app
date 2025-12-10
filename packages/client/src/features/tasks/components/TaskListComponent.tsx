import { TaskCardComponent } from './TaskCardComponent'

import type { TasksResponse } from '../../../types/api.types'
import type { JSX } from 'react'


export const TaskListComponent = ({tasks, projectId} : {tasks: TasksResponse[], projectId: string}): JSX.Element => {

    const taskList: JSX.Element[] = tasks.map(task => {
        return (
            <TaskCardComponent 
                key={task.public_id}
                title={task.title}
                description={task.description}
                status={task.status}
                taskId={task.public_id}
                completedAt={task.completedAt}
                projectId={projectId}
            />
        )
    })

    return (
        <div className='task-list-container'>
            {taskList}
        </div>
    )
}