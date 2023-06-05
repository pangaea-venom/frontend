import React from 'react'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { TaskStatus } from 'src/types/task'
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
                        <SmallTaskBox
                            key={index}
                            task={{
                                id: index,
                                title: 'Create a new logo for the company',
                                dueDate: new Date().toDateString(),
                                memberAmount: 3,
                                description: '',
                                bounty: 30,
                                status: TaskStatus.InProgress,
                            }}
                        />
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
                        <SmallTaskBox
                            key={index}
                            task={{
                                id: index,
                                title: 'Create a new logo for the company',
                                dueDate: new Date().toDateString(),
                                memberAmount: 3,
                                description: '',
                                bounty: 30,
                                status: TaskStatus.InReview,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
