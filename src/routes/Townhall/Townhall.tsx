import React, { useEffect } from 'react'
import { Tabs } from 'src/components/Tabs'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { useAccountStore } from 'src/modules/AccountStore'

export const Townhall = () => {
    const match = useMatch('/townhall/:activeName')
    const activeName = match?.params.activeName

    const daoContract = useAccountStore((state) => state.daoContract)
    const setNumOfTasks = useAccountStore((state) => state.setNumOfTasks)
    const setNumOfProposals = useAccountStore(
        (state) => state.setNumOfProposals
    )

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

        const { _numOfTasks } = await daoContract.methods._numOfTasks({}).call()
        const { _numOfProposals } = await daoContract.methods
            ._numOfProposals({})
            .call()
        const numOfTasks = Number(_numOfTasks)
        const numOfProposals = Number(_numOfProposals)
        setNumOfTasks(numOfTasks)
        setNumOfProposals(numOfProposals)
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
                <Outlet />
            </div>
        </div>
    )
}
