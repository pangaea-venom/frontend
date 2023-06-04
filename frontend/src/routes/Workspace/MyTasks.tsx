import React from 'react'
import { Outlet } from 'react-router-dom'
import { MyTasksTab } from 'src/components/Workspace/MyTasksTab'

export const MyTasks = () => {
    return (
        <div className={`flex flex-col space-y-6`}>
            <MyTasksTab />
            <Outlet />
        </div>
    )
}
