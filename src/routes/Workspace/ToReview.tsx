import React from 'react'
import { TaskListItem } from 'src/components/TaskListItem'
import { type Task } from 'src/types/task'

export const ToReview = () => {
    return (
        <div className="flex flex-col space-y-3">
            {Array.from({ length: 0 }).map((_, index) => (
                // eslint-disable-next-line
                <TaskListItem key={index} isToReview task={{} as Task} />
            ))}
        </div>
    )
}
