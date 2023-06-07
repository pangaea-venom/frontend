import React, { useEffect, useState, type KeyboardEvent } from 'react'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { useParams } from 'react-router-dom'
import { type Task, TaskStatusMap } from 'src/types/task'
import { VenomLabel } from 'src/components/VenomLabel'
import { useAccountStore } from 'src/modules/AccountStore'
import { Username } from 'src/components/Username'
import { toNano } from 'src/util'
import { Comment } from 'src/components/Comment'

export const TaskTemplate = () => {
    const { taskId } = useParams()

    const [task, setTask] = useState<Task | undefined>(undefined)

    const daoContract = useAccountStore((state) => state.daoContract)
    const getTask = useAccountStore((state) => state.getTask)
    const address = useAccountStore((state) => state.address)
    const setGlobalTask = useAccountStore((state) => state.setTask)
    const setLoading = useAccountStore((state) => state.setLoading)

    const updateTask = async () => {
        if (!daoContract) return

        const newTask = await getTask(Number(taskId))
        setTask(newTask)
    }

    useEffect(() => {
        if (!daoContract) return

        updateTask()
    }, [daoContract])

    const handleJoin = async () => {
        if (!daoContract || !address) return

        setLoading(true)
        const amount = toNano(1)

        await daoContract.methods.claimTask({ taskID: Number(taskId) }).send({
            from: address,
            amount,
        })

        const { value0 } = await daoContract.methods
            .getTask({ taskID: Number(taskId) })
            .call()
        const newTask = {
            ...value0,
            id: Number(taskId),
        }
        setTask(newTask)
        setGlobalTask(Number(taskId), newTask)
        setLoading(false)
    }

    const addComment = async (message: string) => {
        if (!daoContract || !address) return

        setLoading(true)

        const amount = toNano(1)

        await daoContract.methods
            .addComment({ taskID: Number(taskId), message })
            .send({
                from: address,
                amount,
            })

        const { value0 } = await daoContract.methods
            .getTask({ taskID: Number(taskId) })
            .call()
        const newTask = {
            ...value0,
            id: Number(taskId),
        }
        setTask(newTask)
        setGlobalTask(Number(taskId), newTask)
        setLoading(false)
    }

    const handleSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        let { value } = e.target as HTMLTextAreaElement
        if (e.key === 'Enter' && !!value.length) {
            addComment(value)
            value = ''
        }
    }

    if (!task || !address) return null

    const isJoined =
        task.assignees.some((assignee) => assignee.equals(address)) ||
        task.owner.equals(address)

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
                            onClick={handleJoin}
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
                                <Username address={task.owner} />
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
                        {task.comments.map((comment, index) => (
                            <Comment commentId={Number(comment)} key={index} />
                        ))}
                        <div className={'flex flex-row space-x-3'}>
                            <div
                                className={
                                    'rounded-full w-[28px] h-[28px] border border-slate-50 bg-[#5A4CB0]'
                                }
                            />
                            <textarea
                                placeholder={'Write a comment...'}
                                onKeyDown={handleSubmit}
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
                        {/* @ts-ignore */}
                        <TaskStatusLabel status={TaskStatusMap[task.status]} />
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
                                <Username address={task.owner} />
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
                        <DueDateLabel
                            dueDate={new Date(
                                Number(task.endTime) * 1000
                            ).toLocaleDateString()}
                        />
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                            }
                        >
                            Bounty
                        </p>
                        <VenomLabel amount={task.bounty} isSmall />
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
                            {task.assignees.map((assignee, index) => (
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
                                        <Username address={assignee} />
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
