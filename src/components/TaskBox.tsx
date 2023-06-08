import React from 'react'
import { type Task, TaskStatusMap } from 'src/types/task'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { MemberAmountLabel } from 'src/components/MemberAmountLabel'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { VenomLabel } from 'src/components/VenomLabel'
import { useNavigate } from 'react-router-dom'

interface TaskBoxProps {
    task: Task
}

export const TaskBox = ({ task }: TaskBoxProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/townhall/tasks/${task.id}`)
    }

    return (
        <div
            onClick={handleClick}
            className={
                'flex flex-col w-full space-y-5 rounded-lg ' +
                'bg-slate-800 p-5 pb-6 cursor-pointer hover:opacity-80'
            }
        >
            <div className={'flex flex-col space-y-4'}>
                <p
                    className={
                        'text-[20px] leading-[25px] font-bold text-slate-50 truncate'
                    }
                >
                    {task.title}
                </p>
                <div className={'flex flex-col space-y-3'}>
                    {/* @ts-ignore */}
                    <TaskStatusLabel status={TaskStatusMap[task.status]} />
                    <div className={'flex flex-row space-x-2'}>
                        <DueDateLabel
                            dueDate={new Date(
                                Number(task.endTime) * 1000
                            ).toLocaleDateString()}
                        />
                        <MemberAmountLabel amount={task.assignees.length} />
                    </div>
                </div>
            </div>
            <p
                className={
                    'text-[16px] leading-[20px] text-slate-200 h-[80px] whitespace-pre-line truncate'
                }
            >
                {task.description}
            </p>
            <div className={'bg-slate-600 w-full h-[1px]'} />
            <div className={'flex flex-row justify-between items-center'}>
                <p className={'text-[16px] leading-[20px] text-slate-400'}>
                    Bounty
                </p>
                <VenomLabel amount={task.bounty} isSmall />
            </div>
        </div>
    )
}
