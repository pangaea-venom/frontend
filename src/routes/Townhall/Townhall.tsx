import React, { useEffect, useState } from 'react'
import { Tabs } from 'src/components/Tabs'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { useAccountStore } from 'src/modules/AccountStore'
import { InnerLoadingOverlay } from 'src/components/InnerLoadingOverlay'

export const Townhall = () => {
    const match = useMatch('/townhall/:activeName')
    const activeName = match?.params.activeName

    const [innerLoading, setInnerLoading] = useState(false)

    const daoContract = useAccountStore((state) => state.daoContract)
    const setNumOfTasks = useAccountStore((state) => state.setNumOfTasks)

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

    const getTasks = async () => {
        if (!daoContract) return

        setInnerLoading(true)

        const { _numOfTasks } = await daoContract.methods._numOfTasks({}).call()
        const numOfTasks = Number(_numOfTasks)
        setNumOfTasks(numOfTasks)
        setInnerLoading(false)
    }

    useEffect(() => {
        if (!daoContract) return

        getTasks()
    }, [daoContract])

    return (
        <div className={'container mx-auto flex flex-col mt-[24px]'}>
            <div className={'flex flex-col w-full space-y-[28px]'}>
                <Tabs
                    onClick={handleClick}
                    tabItems={tabItems}
                    activeName={activeName}
                />
                <InnerLoadingOverlay
                    active={innerLoading}
                    className={'min-h-[300px]'}
                >
                    <Outlet />
                </InnerLoadingOverlay>
            </div>
        </div>
    )
}
