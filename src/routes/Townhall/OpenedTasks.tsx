import React from 'react'
import { TaskBox } from 'src/components/TaskBox'
import { useAccountStore } from 'src/modules/AccountStore'

export const OpenedTasks = () => {
    const numOfTasks = useAccountStore((state) => state.numOfTasks)

    return (
        <div className={'grid grid-cols-3 gap-x-5 gap-y-4 w-full'}>
            {Array.from({ length: Math.min(numOfTasks, 6) }).map((_, index) => (
                <TaskBox key={index} taskId={numOfTasks - index} />
            ))}
        </div>
    )
}
