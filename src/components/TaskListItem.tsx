import React from 'react'
import { type Task, TaskResultStatus } from 'src/types/task'
import { TaskResultStatusLabel } from 'src/components/TaskResultStatusLabel'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { MemberAmountLabel } from 'src/components/MemberAmountLabel'

interface TaskListItemProps {
    task: Task
    isToReview?: boolean
}

export const TaskListItem = ({ task, isToReview }: TaskListItemProps) => {
    return (
        <div className="flex flex-row justify-between items-center bg-slate-800 shadow-md rounded p-5">
            <div className={'flex flex-row items-center space-x-5'}>
                {!isToReview ? (
                    <div
                        className={
                            'flex flex-col w-100px py-1 items-center justify-center'
                        }
                    >
                        <TaskResultStatusLabel
                            status={TaskResultStatus.Rejected}
                        />
                    </div>
                ) : null}
                <p
                    className={
                        'text-slate-50 text-[16px] leading-[20px] font-semibold'
                    }
                >
                    {task.title}
                </p>
            </div>
            <div className={'flex flex-row items-center space-x-5'}>
                <div className={'flex flex-row space-x-2 items-center'}>
                    <DueDateLabel
                        dueDate={new Date(
                            Number(task.endTime) * 1000
                        ).toLocaleDateString()}
                    />
                    <MemberAmountLabel amount={task.assignees.length} />
                </div>
                {!isToReview ? (
                    <button
                        className={
                            'text-[12px] leading-[15px] text-slate-100 rounded px-2 py-1 border border-slate-100'
                        }
                    >
                        Confirm
                    </button>
                ) : null}
            </div>
        </div>
    )
}
