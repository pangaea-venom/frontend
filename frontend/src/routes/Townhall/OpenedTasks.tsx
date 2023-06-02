import React from 'react'
import { TaskBox } from 'src/components/TaskBox'
import { TaskStatus } from 'src/types/task'

export const OpenedTasks = () => {
    return (
        <div className={'grid grid-cols-3 gap-x-5 gap-y-4 w-full'}>
            {Array.from({ length: 6 }).map((_, index) => (
                <TaskBox
                    key={index}
                    task={{
                        id: index,
                        title: 'Task Title',
                        description: 'Task Description',
                        status: TaskStatus.InProgress,
                        bounty: 30,
                        dueDate: new Date().toDateString(),
                        memberAmount: 3,
                    }}
                />
            ))}
        </div>
    )
}
