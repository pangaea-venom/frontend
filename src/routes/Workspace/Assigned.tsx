import React from 'react'
import { TaskStatusLabel } from 'src/components/TaskStatusLabel'
import { type Task, TaskStatus, TaskStatusMap } from 'src/types/task'
import { SmallTaskBox } from 'src/components/SmallTaskBox'
import { useAccountStore } from 'src/modules/AccountStore'

export const Assigned = () => {
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [taskIds, setTaskIds] = React.useState({})

    const account = useAccountStore((state) => state.account)
    const daoContract = useAccountStore((state) => state.daoContract)

    const getTask = useAccountStore((state) => state.getTask)

    const updateTasks = () => {
        if (!account) return

        account.createdTasks.forEach(async (task) => {
            const taskData = await getTask(Number(task))
            // @ts-ignore
            if (taskIds[task]) return
            setTaskIds((prev) => ({
                ...prev,
                [task]: true,
            }))
            // @ts-ignore
            setTasks((prev) => [...prev, taskData])
        })
    }

    React.useEffect(() => {
        if (!account || !daoContract) return

        updateTasks()
    }, [account, daoContract])

    const inProgressTasks = tasks.filter(
        // @ts-ignore
        (task) => TaskStatusMap[task.status] === TaskStatus.InProgress
    )
    const inReviewTasks = tasks.filter(
        // @ts-ignore
        (task) => TaskStatusMap[task.status] === TaskStatus.InReview
    )

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
                        {inProgressTasks.length}
                    </p>
                </div>
                <div className={'flex flex-col space-y-3'}>
                    {inProgressTasks.map((task, index) => (
                        // eslint-disable-next-line
                        <SmallTaskBox key={index} task={task} /> 
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
                        {inReviewTasks.length}
                    </p>
                </div>
                <div className={'flex flex-col space-y-3'}>
                    {inReviewTasks.map((task, index) => (
                        // eslint-disable-next-line
                        <SmallTaskBox key={index} task={task} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}
