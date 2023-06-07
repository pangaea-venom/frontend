import React from 'react'
import { type Task } from 'src/types/task'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { MemberAmountLabel } from 'src/components/MemberAmountLabel'
import { VenomLabel } from 'src/components/VenomLabel'
import { useNavigate } from 'react-router-dom'

interface SmallTaskBoxProps {
    task: Task
}

export const SmallTaskBox = ({ task }: SmallTaskBoxProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/townhall/tasks/${task.id}`)
    }

    return (
        <div
            onClick={handleClick}
            className={
                'flex flex-col space-y-5 rounded-lg p-5 bg-slate-800 cursor-pointer hover:opacity-80'
            }
        >
            <p
                className={
                    'text-[16px] leading-[20px] font-semibold text-slate-50'
                }
            >
                {task.title}
            </p>
            <div className={'flex flex-row space-x-2'}>
                <DueDateLabel
                    dueDate={new Date(
                        Number(task.endTime) * 1000
                    ).toLocaleDateString()}
                />
                <MemberAmountLabel amount={task.assignees.length} />
            </div>
            <div className={'flex flex-row justify-between items-center'}>
                <p className={'text-[14px] leading-[18px] text-slate-400'}>
                    Bounty
                </p>
                <VenomLabel amount={task.bounty} isSmall />
            </div>
        </div>
    )
}
