import React from 'react'
import { TaskStatus } from 'src/types/task'

interface TaskStatusLabelProps {
    status: TaskStatus
}

export const TaskStatusLabel = ({ status }: TaskStatusLabelProps) => {
    return (
        <div className={`flex flex-row items-center space-x-2`}>
            <div
                className={`
                w-[10px] h-[10px]
                rounded-full ${
                    status === TaskStatus.InProgress
                        ? 'bg-green-400'
                        : status === TaskStatus.InReview
                        ? 'bg-blue-400'
                        : ''
                }`}
            />
            <p
                className={`
                text-[14px] leading-[18px] 
                text-slate-50`}
            >
                {status}
            </p>
        </div>
    )
}
