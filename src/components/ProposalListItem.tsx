import React, { useEffect, useState } from 'react'
import { type Proposal, ProposalStatusMap } from 'src/types/proposal'
import { ProposalStatusLabel } from 'src/components/ProposalStatusLabel'
import { useNavigate } from 'react-router-dom'
import { useAccountStore } from 'src/modules/AccountStore'
import { toDateString } from 'src/util'

interface ProposalListItemProps {
    proposalId: number
    isMine?: boolean
}

export const ProposalListItem = ({
    proposalId,
    isMine,
}: ProposalListItemProps) => {
    const navigate = useNavigate()

    const [proposal, setProposal] = useState<Proposal | undefined>(undefined)

    const getProposal = useAccountStore((state) => state.getProposal)
    const daoContract = useAccountStore((state) => state.daoContract)

    const updateProposal = async () => {
        const proposal = await getProposal(proposalId)
        setProposal(proposal)
    }

    useEffect(() => {
        if (!daoContract) return

        updateProposal()
    }, [])

    if (!proposal) return null

    const handleClick = (index: number) => {
        navigate(`/townhall/proposals/${index}`)
    }

    const yesCount = Number(proposal.yes)
    const noCount = Number(proposal.no)
    const abstainCount = Number(proposal.abstain)
    const totalCount = yesCount + noCount + abstainCount

    return (
        <div
            onClick={() => {
                handleClick(proposal.id)
            }}
            className={
                'flex flex-row justify-between py-2.5 ' +
                'pl-2 pr-3 bg-slate-800 rounded-lg items-center ' +
                'cursor-pointer hover:bg-slate-700'
            }
        >
            <div className={'flex flex-row items-center space-x-12'}>
                <div className={'py-1 pl-3 w-[120px]'}>
                    <ProposalStatusLabel
                        /* @ts-ignore */
                        status={ProposalStatusMap[proposal.status]}
                    />
                </div>
                <div className={'flex flex-col space-y-2'}>
                    <p
                        className={
                            'text-[16px] leading-[20px] font-semibold text-slate-50'
                        }
                    >
                        {proposal.title}
                    </p>
                    <p className={'text-[14px] leading-[18px] text-slate-500'}>
                        Proposed on: {toDateString(proposal.createdTime)}
                    </p>
                </div>
            </div>
            {!isMine ? (
                <div className={'flex flex-row space-x-11 items-center'}>
                    <div className={'flex flex-col space-y-1'}>
                        <div
                            className={
                                'flex flex-row items-center space-x-[4px]'
                            }
                        >
                            <p
                                className={
                                    'text-[22px] leading-[25px] text-green-300 font-medium'
                                }
                            >
                                {yesCount}
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 font-medium'
                                }
                            >
                                (
                                {Math.round(
                                    (yesCount / Math.max(totalCount, 1)) * 100
                                )}
                                %)
                            </p>
                        </div>
                        <div className={'h-[4px] bg-slate-600 w-[100px]'}>
                            <div
                                className={`h-[4px] bg-green-300`}
                                style={{
                                    width: `${Math.round(
                                        (yesCount / Math.max(totalCount, 1)) *
                                            100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col space-y-[4px]'}>
                        <div
                            className={
                                'flex flex-row items-center space-x-[4px]'
                            }
                        >
                            <p
                                className={
                                    'text-[22px] leading-[25px] text-red-400 font-medium'
                                }
                            >
                                {noCount}
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 font-medium'
                                }
                            >
                                {Math.round(
                                    (noCount / Math.max(totalCount, 1)) * 100
                                )}
                                %
                            </p>
                        </div>
                        <div className={'h-[4px] bg-slate-600 w-[100px]'}>
                            <div
                                className={`h-[4px] bg-red-400`}
                                style={{
                                    width: `${Math.round(
                                        (noCount / Math.max(totalCount, 1)) *
                                            100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col items-end w-[131px]'}>
                        <p
                            className={
                                'text-[16px] leading-[20px] text-slate-300 font-medium'
                            }
                        >
                            {totalCount} Votes
                        </p>
                        <p
                            className={
                                'text-[14px] leading-[18px] text-slate-500'
                            }
                        >
                            {totalCount} addresses
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
