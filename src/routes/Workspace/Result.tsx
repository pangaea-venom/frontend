import React from 'react'
import { TaskListItem } from 'src/components/TaskListItem'
import { TaskResultStatus, TaskStatus } from 'src/types/task'

export const Result = () => {
    return (
        <div className="flex flex-col space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <TaskListItem
                    key={index}
                    task={{
                        id: index,
                        title: 'Task Title',
                        result: TaskResultStatus.Accepted,
                        dueDate: new Date().toDateString(),
                        memberAmount: 5,
                        bounty: 100,
                        status: TaskStatus.InProgress,
                        description: '',
                    }}
                />
            ))}
        </div>
    )
}
