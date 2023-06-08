import React from 'react'
import { TaskBox } from 'src/components/TaskBox'
import { useAccountStore } from 'src/modules/AccountStore'
import { type Task } from 'src/types/task'
import { toDate } from 'src/util'

export const OpenedTasks = () => {
    const numOfTasks = useAccountStore((state) => state.numOfTasks)

    const [tasks, setTasks] = React.useState<Task[]>([])
    const [taskIds, setTaskIds] = React.useState({})

    const daoContract = useAccountStore((state) => state.daoContract)

    const getTask = useAccountStore((state) => state.getTask)

    const updateTasks = () => {
        Array.from({ length: numOfTasks }).forEach(async (_, index) => {
            const taskId = numOfTasks - index
            const taskData = await getTask(taskId)

            // @ts-ignore
            if (
                taskIds[taskId] ||
                taskData?.status === '3' ||
                toDate(taskData?.endTime) < new Date()
            )
                return
            setTaskIds((prev) => ({
                ...prev,
                [taskId]: true,
            }))
            // @ts-ignore
            setTasks((prev) => [...prev, taskData])
        })
    }

    React.useEffect(() => {
        if (!daoContract || !numOfTasks) return

        updateTasks()
    }, [daoContract, numOfTasks])

    return (
        <div className={'grid grid-cols-3 gap-x-5 gap-y-4 w-full'}>
            {tasks.map((task, index) => (
                <TaskBox key={index} task={task} />
            ))}
        </div>
    )
}
