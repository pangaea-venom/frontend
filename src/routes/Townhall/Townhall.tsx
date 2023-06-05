import React from 'react'
import { Tabs } from 'src/components/Tabs'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

export const Townhall = () => {
    const match = useMatch('/townhall/:activeName')
    const activeName = match?.params.activeName

    const navigate = useNavigate()

    const handleClick = (activeName: string) => {
        navigate(`/townhall/${activeName}`)
    }

    const tabItems = [
        {
            label: 'Opened Tasks',
            value: 'opened-tasks',
        },
        {
            label: 'Proposal',
            value: 'proposal',
        },
    ]

    return (
        <div className={'container mx-auto flex flex-col mt-[24px]'}>
            <div className={'flex flex-col w-full space-y-[28px]'}>
                <Tabs
                    onClick={handleClick}
                    tabItems={tabItems}
                    activeName={activeName}
                />
                <Outlet />
            </div>
        </div>
    )
}
