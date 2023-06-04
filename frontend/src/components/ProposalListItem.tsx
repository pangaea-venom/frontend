import React from 'react'
import { type Proposal } from 'src/types/proposal'
import { ProposalStatusLabel } from 'src/components/ProposalStatusLabel'

interface ProposalListItemProps {
    proposal: Proposal
    isMine?: boolean
}

export const ProposalListItem = ({
    proposal,
    isMine,
}: ProposalListItemProps) => {
    return (
        <div
            className={
                'flex flex-row justify-between py-2.5 pl-2 pr-3 bg-slate-800 rounded-lg items-center'
            }
        >
            <div className={'flex flex-row items-center space-x-12'}>
                <div className={'py-1 pl-3 w-[120px]'}>
                    <ProposalStatusLabel status={proposal.status} />
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
                        Proposed on: {proposal.proposedDate}
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
                                {proposal.forCount}
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 font-medium'
                                }
                            >
                                (
                                {Math.round(
                                    (proposal.forCount /
                                        (proposal.forCount +
                                            proposal.againstCount)) *
                                        100
                                )}
                                %)
                            </p>
                        </div>
                        <div className={'h-[4px] bg-slate-600 w-[100px]'}>
                            <div
                                className={`h-[4px] bg-green-300`}
                                style={{
                                    width: `${Math.round(
                                        (proposal.forCount /
                                            (proposal.forCount +
                                                proposal.againstCount)) *
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
                                {proposal.againstCount}
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-500 font-medium'
                                }
                            >
                                {Math.round(
                                    (proposal.againstCount /
                                        (proposal.forCount +
                                            proposal.againstCount)) *
                                        100
                                )}
                                %
                            </p>
                        </div>
                        <div className={'h-[4px] bg-slate-600 w-[100px]'}>
                            <div
                                className={`h-[4px] bg-red-400`}
                                style={{
                                    width: `${Math.round(
                                        (proposal.againstCount /
                                            (proposal.forCount +
                                                proposal.againstCount)) *
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
                            {proposal.forCount + proposal.againstCount} Votes
                        </p>
                        <p
                            className={
                                'text-[14px] leading-[18px] text-slate-500'
                            }
                        >
                            {proposal.forCount + proposal.againstCount}{' '}
                            addresses
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
