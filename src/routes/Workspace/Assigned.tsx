import React from 'react'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { type Task, TaskStatus } from 'src/types/task'
import { SmallTaskBox } from 'src/components/SmallTaskBox'

export const Assigned = () => {
    return (
        <div className={'flex flex-row space-x-5'}>
            <div className={'flex flex-col space-y-6 grow'}>
                <div className={'flex flex-row items-center space-x-[6px]'}>
                    <TaskStatusLabel status={TaskStatus.InProgress} />
                    <p
                        className={
                            'text-[16px] leading-[20px] text-slate-500 font-medium'
                        }
                    >
                        3
                    </p>
                </div>
                <div className={'flex flex-col space-y-3'}>
                    {Array.from({ length: 3 }).map((task, index) => (
                        // eslint-disable-next-line
                        <SmallTaskBox key={index} task={{} as Task} />
                    ))}
                </div>
            </div>
            <div className={'flex flex-col space-y-6 grow'}>
                <div className={'flex flex-row items-center space-x-[6px]'}>
                    <TaskStatusLabel status={TaskStatus.InReview} />
                    <p
                        className={
                            'text-[16px] leading-[20px] text-slate-500 font-medium'
                        }
                    >
                        3
                    </p>
                </div>
                <div className={'flex flex-col space-y-3'}>
                    {Array.from({ length: 3 }).map((task, index) => (
                        // eslint-disable-next-line
                        <SmallTaskBox key={index} task={{} as Task} />
                    ))}
                </div>
            </div>
        </div>
    )
}
