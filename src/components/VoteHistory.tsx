import React, { useEffect } from 'react'
import { Username } from 'src/components/Username'
import { PollStatusBadge } from 'src/components/PollStatusBadge'
import { PollStatus } from 'src/types/proposal'
import { type Address } from 'everscale-inpage-provider'
import { useAccountStore } from 'src/modules/AccountStore'

interface VoteHistoryProps {
    proposalId: number
    address: Address
}

export const VoteHistory = ({ proposalId, address }: VoteHistoryProps) => {
    const [pollStatus, setPollStatus] = React.useState<PollStatus | undefined>(
        undefined
    )
    const [votes, setVotes] = React.useState<number>(0)

    const daoContract = useAccountStore((state) => state.daoContract)
    const getVoteCast = useAccountStore((state) => state.getVoteCast)
    const getVoteLock = useAccountStore((state) => state.getVoteLock)

    const updatePollStatus = async () => {
        if (!daoContract) return

        const _pollStatus = await getVoteCast(proposalId, address)
        if (_pollStatus === '1') setPollStatus(PollStatus.For)
        else if (_pollStatus === '2') setPollStatus(PollStatus.Against)
        else if (_pollStatus === '3') setPollStatus(PollStatus.Abstain)

        const _votes = await getVoteLock(proposalId, address)
        setVotes(Number(_votes))
    }

    useEffect(() => {
        if (!daoContract) return

        updatePollStatus()
    }, [daoContract])

    return (
        <div
            className={
                'flex flex-row justify-between items-center bg-slate-800 rounded p-3'
            }
        >
            <div className={'flex flex-row items-center space-x-1.5'}>
                <div className={'rounded-full bg-red-400 w-[28px] h-[28px]'} />
                <p className={'text-[16px] leading-[20px] text-slate-400'}>
                    <Username address={address} />
                </p>
            </div>
            <div className={'flex flex-row items-center space-x-6'}>
                <p
                    className={
                        'text-[14px] leading-[18px] text-slate-200 w-[60px]'
                    }
                >
                    {votes} Votes
                </p>
                <div className={'flex flex-col items-end w-[83px]'}>
                    {pollStatus ? (
                        <PollStatusBadge status={pollStatus} />
                    ) : null}
                </div>
            </div>
        </div>
    )
}
