import React, { useEffect, useState, type KeyboardEvent, useRef } from 'react'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { DueDateLabel } from 'src/components/DueDateLabel'
import { useNavigate, useParams } from 'react-router-dom'
import { type Task, TaskStatusMap } from 'src/types/task'
import { VenomLabel } from 'src/components/VenomLabel'
import { useAccountStore } from 'src/modules/AccountStore'
import { Username } from 'src/components/Username'
import { toDate, toNano } from 'src/util'
import { CommentBox } from 'src/components/CommentBox'
import { toast } from 'react-toastify'
import { type Address } from 'everscale-inpage-provider'
import moment from 'moment'

export const TaskTemplate = () => {
    const { taskId } = useParams()
    const [comment, setComment] = useState('')
    const commentRef = useRef<HTMLTextAreaElement>(null)

    const [task, setTask] = useState<Task | undefined>(undefined)
    const [selectedAssignee, setSelectedAssignee] = useState<
        Address | undefined
    >(undefined)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const daoContract = useAccountStore((state) => state.daoContract)
    const getTask = useAccountStore((state) => state.getTask)
    const address = useAccountStore((state) => state.address)
    const setGlobalTask = useAccountStore((state) => state.setTask)
    const setLoading = useAccountStore((state) => state.setLoading)
    const setAccount = useAccountStore((state) => state.setAccount)

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

        try {
            await daoContract.methods
                .claimTask({ taskID: Number(taskId) })
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

            const user = await daoContract.methods
                .getMember({ member: address })
                .call()
            setAccount(user.value0)

            setTask(newTask)
            setGlobalTask(Number(taskId), newTask)

            toast.success('Successfully joined task')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const addComment = async () => {
        if (!daoContract || !address) return

        if (comment.length < 140) {
            toast.error('Comment must be at least 140 characters long')
            return
        }

        setLoading(true)

        const amount = toNano(1)

        try {
            await daoContract.methods
                .submitTask({ taskID: Number(taskId), submission: comment })
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
            if (commentRef.current) {
                commentRef.current.value = ''
                setComment('')
            }
            toast.success('Comment added successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            addComment()
        }
    }

    const cancelTask = async () => {
        if (!daoContract || !address) return

        setLoading(true)

        const amount = toNano(2)

        try {
            await daoContract.methods
                .cancelTask({ taskID: Number(taskId) })
                .send({
                    from: address,
                    amount,
                })

            const user = await daoContract.methods
                .getMember({ member: address })
                .call()
            setAccount(user.value0)

            setGlobalTask(Number(taskId), undefined)
            toast.success('Task cancelled successfully')
            navigate('/', { replace: true })
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const startReview = async () => {
        if (!daoContract || !address) return

        setLoading(true)

        const amount = toNano(1)

        try {
            await daoContract.methods
                .startReview({ taskID: Number(taskId) })
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
            toast.success('Review started successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const finishReview = async () => {
        if (!daoContract || !address || !selectedAssignee) return

        setLoading(true)

        const amount = toNano(1)

        try {
            await daoContract.methods
                .finishReview({
                    taskID: Number(taskId),
                    winner: selectedAssignee,
                })
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
            navigate('/', { replace: true })
            toast.success('Review finished successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    if (!task || !address) return null

    const isJoined = task.assignees.some((assignee) => assignee.equals(address))

    const isMine = task.owner.equals(address)

    const isExpired = toDate(task.endTime) < new Date()

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
                        {!isMine ? (
                            <button
                                onClick={handleJoin}
                                disabled={isJoined}
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
                        ) : (
                            <button
                                onClick={cancelTask}
                                className={`text-[16px] leading-[20px] 
                                            text-sky-50 bg-sky-500
                                font-medium py-2 px-4 rounded`}
                            >
                                Cancel
                            </button>
                        )}
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
                                {moment(toDate(task.startTime)).fromNow()}
                            </p>
                        </div>
                        {task.comments.map((comment, index) => (
                            <CommentBox
                                commentId={Number(comment)}
                                key={index}
                            />
                        ))}
                        {!isExpired ? (
                            <div className={'flex flex-row space-x-3'}>
                                <div
                                    className={
                                        'rounded-full w-[28px] h-[28px] border border-slate-50 bg-[#5A4CB0]'
                                    }
                                />
                                <div
                                    onClick={() => {
                                        if (!isJoined) {
                                            toast.error(
                                                'You need to join the task to comment'
                                            )
                                        }
                                    }}
                                    className={'relative w-full'}
                                >
                                    <textarea
                                        disabled={!isJoined}
                                        onChange={(e) => {
                                            setComment(e.target.value)
                                        }}
                                        ref={commentRef}
                                        placeholder={'Write a comment...'}
                                        onKeyDown={handleSubmit}
                                        rows={4}
                                        className={
                                            'appearance-none w-full bg-slate-700 rounded-lg text-slate-200 text-[14px] leading-[17px] p-3'
                                        }
                                    />
                                    <button
                                        disabled={!isJoined}
                                        onClick={addComment}
                                        className={
                                            'absolute right-3 bottom-3 px-3 py-1 rounded border' +
                                            ' border-slate-300 bg-slate-700 text-[12px] leading-[15px]'
                                        }
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={'flex flex-row space-x-3'}>
                                <div
                                    className={
                                        'rounded-full w-[28px] h-[28px] border border-slate-50 bg-[#5A4CB0]'
                                    }
                                />
                                <div
                                    className={
                                        'w-full bg-slate-700 rounded-lg text-slate-200 text-[14px] leading-[17px] p-3'
                                    }
                                >
                                    Due to the task being expired, you can no
                                    longer comment on it.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={'flex flex-col shrink-0 space-y-6 basis-[230px]'}
                >
                    <div className={'flex flex-col space-y-2'}>
                        <div className={'flex flex-row space-x-2 items-center'}>
                            <p
                                className={
                                    'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                                }
                            >
                                Status
                            </p>
                            <TaskStatusLabel
                                /* @ts-ignore */
                                status={TaskStatusMap[task.status]}
                            />
                        </div>
                        {isMine && task.status === '0' && isExpired ? (
                            <button
                                onClick={startReview}
                                className={`text-[14px] leading-[17px] 
                                            text-sky-50 bg-sky-500 py-1 rounded`}
                            >
                                Start review
                            </button>
                        ) : null}
                    </div>
                    {!isMine ? (
                        <div className={'flex flex-row space-x-2 items-center'}>
                            <p
                                className={
                                    'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1 w-[80px]'
                                }
                            >
                                Owner
                            </p>
                            <div
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
                                    <Username address={task.owner} />
                                </p>
                            </div>
                        </div>
                    ) : null}
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
                    {isMine && task.status === '1' ? (
                        <div className={'flex flex-col space-y-3'}>
                            <p
                                className={
                                    'text-slate-400 text-[14px] leading-[17px] py-[3px] pl-1'
                                }
                            >
                                Choose the member
                            </p>
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                    }}
                                    className={
                                        'flex items-center rounded ' +
                                        'bg-slate-700 border border-slate-600 py-3 px-4 flex-row justify-between w-full'
                                    }
                                >
                                    <div
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
                                            {selectedAssignee ? (
                                                <Username
                                                    address={selectedAssignee}
                                                />
                                            ) : null}
                                        </p>
                                    </div>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </button>
                                <ul
                                    className={
                                        'absolute z-[1000] float-left m-0 inset-x-0 top-[100%] ' +
                                        'min-w-max list-none rounded border-none ' +
                                        'bg-clip-padding shadow-lg ' +
                                        (open ? 'block' : 'hidden')
                                    }
                                >
                                    {task.assignees.map((assignee, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setSelectedAssignee(assignee)
                                                setOpen(false)
                                            }}
                                        >
                                            <div
                                                className={
                                                    'flex items-center rounded ' +
                                                    'bg-slate-700 hover:bg-slate-800 cursor-pointer' +
                                                    ' border border-slate-600 py-3 px-4' +
                                                    ' flex-row justify-between w-full'
                                                }
                                            >
                                                <div
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
                                                        <Username
                                                            address={assignee}
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={finishReview}
                                disabled={!selectedAssignee}
                                className={`text-[16px] leading-[20px] 
                                            text-sky-50 bg-sky-500
                                font-medium py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Confirm
                            </button>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    )
}
