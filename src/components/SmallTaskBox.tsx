import React from 'react'
import { type Task } from 'src/types/task'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { MemberAmountLabel } from 'src/components/MemberAmountLabel'
import { VenomLabel } from 'src/components/VenomLabel'

interface SmallTaskBoxProps {
    task: Task
}

export const SmallTaskBox = ({ task }: SmallTaskBoxProps) => {
    return (
        <div className={'flex flex-col space-y-5 rounded-lg p-5 bg-slate-800'}>
            <p
                className={
                    'text-[16px] leading-[20px] font-semibold text-slate-50'
                }
            >
                {task.title}
            </p>
            <div className={'flex flex-row space-x-2'}>
                <DueDateLabel dueDate={task.dueDate} />
                <MemberAmountLabel amount={task.memberAmount} />
            </div>
            <div className={'flex flex-row justify-between items-center'}>
                <p className={'text-[14px] leading-[18px] text-slate-400'}>
                    Bounty
                </p>
                <VenomLabel amount={30} isSmall />
            </div>
        </div>
    )
}
