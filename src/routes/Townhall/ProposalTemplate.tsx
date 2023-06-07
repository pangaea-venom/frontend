import React, { useEffect, useState } from 'react'
import { PollStatus, type Proposal } from 'src/types/proposal'
import { PollStatusBadge } from 'src/components/PollStatusBadge'
import { useAccountStore } from 'src/modules/AccountStore'
import { useParams } from 'react-router-dom'
import { numberWithCommas, toDateString } from 'src/util'
import { Username } from 'src/components/Username'

export const ProposalTemplate = () => {
    const [proposal, setProposal] = useState<Proposal | undefined>(undefined)

    const [pollStatus, setPollStatus] = React.useState<PollStatus | undefined>(
        undefined
    )

    const { proposalId } = useParams()

    const getProposal = useAccountStore((state) => state.getProposal)
    const daoContract = useAccountStore((state) => state.daoContract)

    const updateProposal = async () => {
        const proposal = await getProposal(Number(proposalId))
        setProposal(proposal)
    }

    useEffect(() => {
        if (!daoContract) return

        updateProposal()
    }, [])

    if (!proposal) return null

    const yesCount = Number(proposal.yes)
    const noCount = Number(proposal.no)
    const abstainCount = Number(proposal.abstain)
    const totalCount = yesCount + noCount + abstainCount

    return (
        <div className={'container mx-auto flex flex-col mt-10 pb-25'}>
            <p
                className={
                    'text-[24px] leading-[30px] font-bold text-slate-50 mb-4'
                }
            >
                {proposal.title}
            </p>
            <div className={'flex flex-row space-x-3 items-center mb-5'}>
                <div
                    className={
                        'rounded-full border border-slate-200 bg-red-400 w-[28px] h-[28px]'
                    }
                />
                <div className={'items-center flex flex-row space-x-1'}>
                    <p
                        className={
                            'text-[12px] leading-[15px] text-slate-300 font-medium'
                        }
                    >
                        <Username address={proposal.creator} />
                    </p>
                    <p className={'text-[12px] leading-[15px] text-slate-500'}>
                        ·
                    </p>
                    <p className={'text-[12px] leading-[15px] text-slate-500'}>
                        Proposed on: {toDateString(proposal.createdTime)}
                    </p>
                </div>
            </div>
            <div className={'w-full h-[1px] bg-slate-700 mb-11'} />
            <div className={'flex flex-row space-x-11 items-start'}>
                <div className={'flex flex-col space-y-5 w-full'}>
                    <p
                        className={
                            'text-[20px] leading-[25px] font-medium text-slate-50 mb-5'
                        }
                    >
                        Details
                    </p>
                    <p
                        className={
                            'text-[14px] leading-[18px] text-slate-300 mb-12'
                        }
                    >
                        {proposal.description}
                    </p>
                    <div className={'flex flex-col space-y-4 w-full'}>
                        <p
                            className={
                                'text-[20px] leading-[25px] font-medium text-slate-50'
                            }
                        >
                            Votes
                        </p>
                        <div
                            className={
                                'flex flex-row justify-between items-center'
                            }
                        >
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-300 font-medium'
                                }
                            >
                                97 addresses
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-300 font-medium'
                                }
                            >
                                1,502 Votes
                            </p>
                        </div>
                        <div className={'flex flex-col space-y-[1px]'}>
                            <div
                                className={
                                    'flex flex-row justify-between items-center bg-slate-800 rounded p-3'
                                }
                            >
                                <div
                                    className={
                                        'flex flex-row items-center space-x-1.5'
                                    }
                                >
                                    <div
                                        className={
                                            'rounded-full bg-red-400 w-[28px] h-[28px]'
                                        }
                                    />
                                    <p
                                        className={
                                            'text-[16px] leading-[20px] text-slate-400'
                                        }
                                    >
                                        <Username address={proposal.creator} />
                                    </p>
                                </div>
                                <div
                                    className={
                                        'flex flex-row items-center space-x-6'
                                    }
                                >
                                    <p
                                        className={
                                            'text-[14px] leading-[18px] text-slate-200 w-[60px]'
                                        }
                                    >
                                        283 Votes
                                    </p>
                                    <div
                                        className={
                                            'flex flex-col items-end w-[83px]'
                                        }
                                    >
                                        <PollStatusBadge
                                            status={PollStatus.For}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    'flex flex-row justify-between items-center bg-slate-800 rounded p-3'
                                }
                            >
                                <div
                                    className={
                                        'flex flex-row items-center space-x-1.5'
                                    }
                                >
                                    <div
                                        className={
                                            'rounded-full bg-red-400 w-[28px] h-[28px]'
                                        }
                                    />
                                    <p
                                        className={
                                            'text-[16px] leading-[20px] text-slate-400'
                                        }
                                    >
                                        Chelsea Kim
                                    </p>
                                </div>
                                <div
                                    className={
                                        'flex flex-row items-center space-x-6'
                                    }
                                >
                                    <p
                                        className={
                                            'text-[14px] leading-[18px] text-slate-200 w-[60px]'
                                        }
                                    >
                                        125 Votes
                                    </p>
                                    <div
                                        className={
                                            'flex flex-col items-end w-[83px]'
                                        }
                                    >
                                        <PollStatusBadge
                                            status={PollStatus.Against}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    'flex flex-row justify-between items-center bg-slate-800 rounded p-3'
                                }
                            >
                                <div
                                    className={
                                        'flex flex-row items-center space-x-1.5'
                                    }
                                >
                                    <div
                                        className={
                                            'rounded-full bg-red-400 w-[28px] h-[28px]'
                                        }
                                    />
                                    <p
                                        className={
                                            'text-[16px] leading-[20px] text-slate-400'
                                        }
                                    >
                                        Chelsea Kim
                                    </p>
                                </div>
                                <div
                                    className={
                                        'flex flex-row items-center space-x-6'
                                    }
                                >
                                    <p
                                        className={
                                            'text-[14px] leading-[18px] text-slate-200 w-[60px]'
                                        }
                                    >
                                        73 Votes
                                    </p>
                                    <div
                                        className={
                                            'flex flex-col items-end w-[83px]'
                                        }
                                    >
                                        <PollStatusBadge
                                            status={PollStatus.Abstain}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'flex flex-col basis-[468px] shrink-0 bg-slate-800 rounded-xl p-6 p-5 pb-6'
                    }
                >
                    <p
                        className={
                            'text-[20px] leading-[25px] font-medium text-slate-50 mb-4'
                        }
                    >
                        Votes
                    </p>
                    <div
                        className={'flex flex-row space-x-2 items-center mb-5'}
                    >
                        <p
                            className={
                                'text-[14px] leading-[18px] text-slate-300 font-medium'
                            }
                        >
                            {numberWithCommas(totalCount)} Votes
                        </p>
                        <p
                            className={
                                'text-[14px] leading-[18px] text-slate-500'
                            }
                        >
                            97 addresses
                        </p>
                    </div>
                    <div className={'flex flex-col space-y-4 w-full'}>
                        <div className={'flex flex-col space-y-1 w-full'}>
                            <div
                                className={
                                    'flex flex-row items-center space-x-2'
                                }
                            >
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-green-300 font-bold'
                                    }
                                >
                                    For
                                </p>
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-gray-50 font-bold ml-2'
                                    }
                                >
                                    {yesCount}
                                </p>
                            </div>
                            <div
                                className={
                                    'flex flex-row space-x-5 items-center'
                                }
                            >
                                <div
                                    className={
                                        'h-[8px] bg-slate-600 w-full rounded'
                                    }
                                >
                                    <div
                                        className={`h-[8px] bg-green-300 rounded`}
                                        style={{
                                            width: `${
                                                yesCount /
                                                Math.max(1, totalCount)
                                            }%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {yesCount / Math.max(1, totalCount)}%
                                </p>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-1 w-full'}>
                            <div
                                className={
                                    'flex flex-row items-center space-x-2'
                                }
                            >
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-red-400 font-bold'
                                    }
                                >
                                    Against
                                </p>
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-gray-50 font-bold ml-2'
                                    }
                                >
                                    {noCount}
                                </p>
                            </div>
                            <div
                                className={
                                    'flex flex-row space-x-5 items-center'
                                }
                            >
                                <div
                                    className={
                                        'h-[8px] bg-slate-600 w-full rounded'
                                    }
                                >
                                    <div
                                        className={`h-[8px] bg-red-400 rounded`}
                                        style={{
                                            width: `${
                                                noCount /
                                                Math.max(1, totalCount)
                                            }%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {noCount / Math.max(1, totalCount)}%
                                </p>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-1 w-full'}>
                            <div
                                className={
                                    'flex flex-row items-center space-x-2'
                                }
                            >
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-slate-400 font-bold'
                                    }
                                >
                                    Abstain
                                </p>
                                <p
                                    className={
                                        'text-[20px] leading-[25px] text-gray-50 font-bold ml-2'
                                    }
                                >
                                    {abstainCount}
                                </p>
                            </div>
                            <div
                                className={
                                    'flex flex-row space-x-5 items-center'
                                }
                            >
                                <div
                                    className={
                                        'h-[8px] bg-slate-600 w-full rounded'
                                    }
                                >
                                    <div
                                        className={`h-[8px] bg-slate-400 rounded`}
                                        style={{
                                            width: `${
                                                abstainCount /
                                                Math.max(1, totalCount)
                                            }%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {abstainCount / Math.max(1, totalCount)}%
                                </p>
                            </div>
                        </div>
                    </div>
                    <p
                        className={
                            'mt-11 text-[20px] leading-[25px] text-slate-50 font-medium'
                        }
                    >
                        Cast your vote
                    </p>
                    <div className={'flex flex-col space-y-2 mt-5'}>
                        <button
                            onClick={() => {
                                setPollStatus(PollStatus.For)
                            }}
                            className={`py-2 text-slate-300 text-[16px] leading-[20px] rounded border 
                                ${
                                    pollStatus === PollStatus.For
                                        ? 'border-slate-50'
                                        : 'border-slate-600'
                                }`}
                        >
                            For
                        </button>
                        <button
                            onClick={() => {
                                setPollStatus(PollStatus.Against)
                            }}
                            className={`py-2 text-slate-300 text-[16px] leading-[20px] rounded border 
                                ${
                                    pollStatus === PollStatus.Against
                                        ? 'border-slate-50'
                                        : 'border-slate-600'
                                }`}
                        >
                            Against
                        </button>
                        <button
                            onClick={() => {
                                setPollStatus(PollStatus.Abstain)
                            }}
                            className={`py-2 text-slate-300 text-[16px] leading-[20px] rounded border 
                                ${
                                    pollStatus === PollStatus.Abstain
                                        ? 'border-slate-50'
                                        : 'border-slate-600'
                                }`}
                        >
                            Abstain
                        </button>
                    </div>
                    <button
                        className={
                            'mt-5 text-[16px] leading-[20px] text-sky-50 bg-sky-500 rounded py-2 disabled:opacity-70'
                        }
                        disabled={!pollStatus}
                    >
                        Vote
                    </button>
                </div>
            </div>
        </div>
    )
}
