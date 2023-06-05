import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

export const MyTasksTab = () => {
    const tabItems = [
        {
            label: 'Assigned',
            value: 'assigned',
        },
        {
            label: 'Result',
            value: 'result',
        },
        {
            label: 'To Review',
            value: 'to-review',
        },
    ]

    const match = useMatch('/workspace/my-tasks/:activeName')
    const activeName = match?.params.activeName

    const navigate = useNavigate()

    const onClick = (value: string) => {
        navigate(`/workspace/my-tasks/${value}`)
    }

    return (
        <div className={`flex flex-row items-center space-x-5`}>
            {tabItems.map((tabItem) => (
                <button
                    key={tabItem.value}
                    className={`text-slate-50 text-[16px] leading-[20px] font-medium p-2 rounded-lg hover:bg-slate-700 
                        ${activeName === tabItem.value ? 'bg-slate-800' : ''}`}
                    onClick={() => {
                        onClick(tabItem.value)
                    }}
                >
                    {tabItem.label}
                </button>
            ))}
        </div>
    )
}
