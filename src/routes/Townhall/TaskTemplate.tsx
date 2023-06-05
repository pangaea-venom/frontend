import React from 'react'
import { type Task, TaskStatus } from 'src/types/task'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { numberWithCommas } from 'src/util'

export const TaskTemplate = () => {
    const [isJoined, setIsJoined] = React.useState(false)

    const task: Task = {
        id: 1,
        title: 'Task 1',
        description: 'This is a task',
        status: TaskStatus.InReview,
        memberAmount: 3,
        bounty: 100,
        dueDate: new Date().toDateString(),
    }

    return (
        <div className={'container mx-auto flex flex-col mt-7'}>
            <div className={'flex flex-row w-full space-x-8 pb-32'}>
                <div className={'flex flex-col w-full space-y-7 grow '}>
                    <div className={'flex flex-row justify-between'}>
                        <p
                            className={
                                'text-[24px] leading-[30px] font-bold text-slate-50'
                            }
                        >
                            {task.title}
                        </p>
                        <button
                            onClick={() => {
                                setIsJoined(true)
                            }}
                            className={`text-[16px] leading-[20px] 
                                ${
                                    isJoined
                                        ? 'bg-transparent border border-slate-400 text-slate-400'
                                        : 'text-sky-50 bg-sky-500'
                                } 
                                font-medium py-2 px-4 rounded`}
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </button>
                    </div>
                    <p className={'text-[16px] leading-[20px] text-slate-200'}>
                        {task.description}
                    </p>
                    <div className={'flex flex-col space-y-4'}>
                        <div className={'flex flex-row items-center'}>
                            <div
                                className={
                                    'rounded-full w-[28px] h-[28px] border border-slate-50 bg-red-400'
                                }
                            />
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-300 ml-3'
                                }
                            >
                                Chelsea Lee
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 ml-1'
                                }
                            >
                                created the task
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 ml-2.5'
                                }
                            >
                                1 day ago
                            </p>
                        </div>
                        <div className={'flex flex-row items-start'}>
                            <div
                                className={
                                    'rounded-full w-[28px] h-[28px] border border-slate-50 bg-red-400'
                                }
                            />
                            <div
                                className={
                                    'flex flex-col space-y-2 w-full ml-3'
                                }
                            >
                                <div className={'flex flex-row items-center'}>
                                    <p
                                        className={
                                            'text-[12px] leading-[15px] text-slate-300'
                                        }
                                    >
                                        Satoshi Nakatomo
                                    </p>
                                    <p
                                        className={
                                            'text-[12px] leading-[15px] text-slate-500 ml-2.5'
                                        }
                                    >
                                        1 day ago
                                    </p>
                                </div>
                                <div
                                    className={
                                        'p-3 rounded-lg bg-slate-800 text-slate-200 text-[14px] leading-[17px]'
                                    }
                                >
                                    Nicely done! I proud of you Doku!
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-row space-x-3'}>
                            <div
                                className={
                                    'rounded-full w-[28px] h-[28px] border border-slate-50 bg-[#5A4CB0]'
                                }
                            />
                            <textarea
                                className={
                                    'appearance-none w-full bg-slate-700 rounded-lg text-slate-200 text-[14px] leading-[17px] p-3'
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col shrink-0 space-y-6'}>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Status
                        </p>
                        <TaskStatusLabel status={task.status} />
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Owner
                        </p>
                        <div
                            className={'flex flex-row items-center space-x-1.5'}
                        >
                            <div
                                className={
                                    'rounded-full w-[16px] h-[16px] bg-red-400'
                                }
                            />
                            <p
                                className={
                                    'text-slate-50 text-[14px] leading-[18px]'
                                }
                            >
                                Chelsea Lee
                            </p>
                        </div>
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Due Date
                        </p>
                        <DueDateLabel dueDate={task.dueDate} />
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Bounty
                        </p>
                        <div
                            className={'flex flex-row items-center space-x-1.5'}
                        >
                            <img
                                src={'/venom-blue.svg'}
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <p
                                className={
                                    'text-slate-50 text-[14px] leading-[18px]'
                                }
                            >
                                {numberWithCommas(task.bounty)} Venom
                            </p>
                        </div>
                    </div>
                    <div className={'flex flex-row space-x-2'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Assignee
                        </p>
                        <div className={'flex flex-col space-y-4'}>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={
                                        'flex flex-row items-center space-x-1.5'
                                    }
                                >
                                    <div
                                        className={
                                            'rounded-full w-[16px] h-[16px] bg-red-400'
                                        }
                                    />
                                    <p
                                        className={
                                            'text-slate-50 text-[14px] leading-[18px]'
                                        }
                                    >
                                        Ieyasu Dokugawa
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
