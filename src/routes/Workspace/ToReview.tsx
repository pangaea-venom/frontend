import React from 'react'
import { TaskListItem } from 'src/components/TaskListItem'
import { type Task } from 'src/types/task'
import { useAccountStore } from 'src/modules/AccountStore'

export const ToReview = () => {
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [taskIds, setTaskIds] = React.useState({})

    const account = useAccountStore((state) => state.account)
    const daoContract = useAccountStore((state) => state.daoContract)

    const getTask = useAccountStore((state) => state.getTask)

    const updateTasks = () => {
        if (!account) return

        account.createdTasks.forEach(async (task) => {
            const taskData = await getTask(Number(task))
            if (
                // @ts-ignore
                taskIds[task]
            )
                return

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

    return (
        <div className="flex flex-col space-y-3">
            {tasks.map((task, index) => (
                // eslint-disable-next-line
                <TaskListItem key={index} isToReview task={task} />
            ))}
        </div>
    )
}
