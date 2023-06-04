import React from 'react'
import { TaskResultStatus } from 'src/types/task'

interface TaskResultStatusLabelProps {
    status?: TaskResultStatus
}

export const TaskResultStatusLabel = ({
    status,
}: TaskResultStatusLabelProps) => {
    return (
        <div className={`flex flex-row items-center space-x-2.5`}>
            <div
                className={`
                w-[6px] h-[6px]
                rounded-full ${
                    status === TaskResultStatus.Accepted
                        ? 'bg-green-400'
                        : status === TaskResultStatus.Rejected
                        ? 'bg-red-400'
                        : ''
                }`}
            />
            <p
                className={`
                text-[14px] leading-[18px] 
                ${
                    status === TaskResultStatus.Accepted
                        ? 'text-green-400'
                        : status === TaskResultStatus.Rejected
                        ? 'text-red-400'
                        : ''
                }`}
            >
                {status}
            </p>
        </div>
    )
}
