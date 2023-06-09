import React, { useEffect, useState } from 'react'
import { PollStatus, type Proposal } from 'src/types/proposal'
import { useAccountStore } from 'src/modules/AccountStore'
import { useParams } from 'react-router-dom'
import { numberWithCommas, toDate, toDateString, toNano } from 'src/util'
import { Username } from 'src/components/Username'
import { VoteHistory } from 'src/components/VoteHistory'
import { Dialog } from 'src/components/Dialog'
import moment from 'moment'
import { VenomLabel } from 'src/components/VenomLabel'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'

export const ProposalTemplate = () => {
    const [proposal, setProposal] = useState<Proposal | undefined>(undefined)
    const [open, setOpen] = useState(false)
    const [power, setPower] = useState(1)

    const address = useAccountStore((state) => state.address)
    const balance = useAccountStore((state) => state.balance)

    const setLoading = useAccountStore((state) => state.setLoading)

    const [pollStatus, setPollStatus] = React.useState<PollStatus | undefined>(
        undefined
    )

    const pollStatusToVal = (_pollStatus: PollStatus) => {
        if (_pollStatus === PollStatus.For) {
            return 1
        } else if (_pollStatus === PollStatus.Against) {
            return 2
        }
        return 3
    }

    const { proposalId } = useParams()

    const getProposal = useAccountStore((state) => state.getProposal)
    const daoContract = useAccountStore((state) => state.daoContract)

    const setGlobalProposal = useAccountStore((state) => state.setProposal)

    const castVote = async () => {
        if (!daoContract || !address || !balance || !pollStatus || !proposalId)
            return

        if (power <= 0) return

        if (
            !new BigNumber(balance).isGreaterThan(
                new BigNumber(toNano(1 + power))
            )
        ) {
            toast.error('Insufficient balance')
            return
        }

        setLoading(true)

        const val = pollStatusToVal(pollStatus)

        try {
            if (power === 1) {
                const amount = toNano(0.1)
                await daoContract.methods
                    .castVote({ proposalID: Number(proposalId), val })
                    .send({
                        from: address,
                        amount,
                    })
            } else {
                const amount = toNano(power + 1.1)
                await daoContract.methods
                    .castVoteWithPower({
                        proposalID: Number(proposalId),
                        val,
                        power,
                    })
                    .send({
                        from: address,
                        amount,
                    })
            }

            const { value0 } = await daoContract.methods
                .getProposal({ proposalID: Number(proposalId) })
                .call()
            const { value0: vote } = await daoContract.methods
                .getVote({ proposalID: Number(proposalId) })
                .call()

            const newProposal = {
                ...value0,
                ...vote,
                id: Number(proposalId),
            }
            setProposal(newProposal)
            setGlobalProposal(Number(proposalId), newProposal)

            toast.success('Vote casted successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const updateProposal = async () => {
        const proposal = await getProposal(Number(proposalId))
        setProposal(proposal)
    }

    useEffect(() => {
        if (!daoContract || !proposalId) return

        updateProposal()
    }, [daoContract, proposalId])

    if (!proposal) return null

    const yesCount = Number(proposal.yes)
    const noCount = Number(proposal.no)
    const abstainCount = Number(proposal.abstain)
    const totalCount = yesCount + noCount + abstainCount

    const totalAddresses = proposal.singles.length + proposal.locks.length

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
                                {numberWithCommas(totalAddresses)} addresses
                            </p>
                            <p
                                className={
                                    'text-[12px] leading-[15px] text-slate-300 font-medium'
                                }
                            >
                                {numberWithCommas(totalCount)} Votes
                            </p>
                        </div>
                        <div className={'flex flex-col space-y-[1px]'}>
                            {proposal.locks.map((lock, index) => (
                                <VoteHistory
                                    key={index}
                                    address={lock}
                                    proposalId={proposal.id}
                                />
                            ))}
                            {proposal.singles.map((lock, index) => (
                                <VoteHistory
                                    key={index}
                                    address={lock}
                                    proposalId={proposal.id}
                                />
                            ))}
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
                                'text-[14px] leading-[18px] text-slate-500 font-medium'
                            }
                        >
                            {numberWithCommas(totalAddresses)} addresses
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
                                            width: `${Math.round(
                                                (yesCount /
                                                    Math.max(totalCount, 1)) *
                                                    100
                                            )}%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {Math.round(
                                        (yesCount / Math.max(totalCount, 1)) *
                                            100
                                    )}
                                    %
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
                                            width: `${Math.round(
                                                (noCount /
                                                    Math.max(totalCount, 1)) *
                                                    100
                                            )}%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {Math.round(
                                        (noCount / Math.max(totalCount, 1)) *
                                            100
                                    )}
                                    %
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
                                            width: `${Math.round(
                                                (abstainCount /
                                                    Math.max(totalCount, 1)) *
                                                    100
                                            )}%`,
                                        }}
                                    />
                                </div>
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 font-semibold'
                                    }
                                >
                                    {Math.round(
                                        (abstainCount /
                                            Math.max(totalCount, 1)) *
                                            100
                                    )}
                                    %
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
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Vote
                    </button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <div className={'flex flex-col p-7 bg-slate-100 rounded-lg'}>
                    <p
                        className={
                            'text-[20px] leading-[25px] text-black font-bold text-center'
                        }
                    >
                        Confirm for the voting
                    </p>
                    <p
                        className={
                            'mt-6 text-[16px] leading-[20px] text-black font-medium text-center break-word'
                        }
                    >
                        {proposal.title}
                    </p>
                    <p
                        className={
                            'mt-5 text-[12px] leading-[15px] text-green-500 text-center break-word'
                        }
                    >
                        Remaining Date:{' '}
                        {moment(toDate(proposal.endTime)).fromNow(true)}
                    </p>
                    <div
                        className={
                            'flex flex-col bg-slate-700 rounded-lg mt-5 p-5'
                        }
                    >
                        <p
                            className={
                                'text-[16px] leading-[20px] text-slate-50 font-medium'
                            }
                        >
                            Cast your vote
                        </p>
                        <div
                            className={
                                'flex flex-row w-full justify-between items-center mt-4'
                            }
                        >
                            <p
                                className={
                                    'text-[14px] leading-[18px] text-slate-400'
                                }
                            >
                                Choice
                            </p>
                            <p
                                className={
                                    'text-[14px] leading-[18px] text-slate-50 font-medium'
                                }
                            >
                                {pollStatus}
                            </p>
                        </div>
                        <div
                            className={
                                'flex flex-row w-full justify-between items-center mt-4'
                            }
                        >
                            <p
                                className={
                                    'text-[14px] leading-[18px] text-slate-400'
                                }
                            >
                                Your voting power
                            </p>
                            <input
                                onChange={(e) => {
                                    setPower(Number(e.target.value))
                                }}
                                type={'number'}
                                defaultValue={1}
                                min={1}
                                name={'power'}
                                className={
                                    'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                    'placeholder:text-slate-500 text-slate-50 w-[40px] border rounded'
                                }
                            />
                        </div>
                        <div
                            className={
                                'flex flex-row w-full justify-between items-center mt-4'
                            }
                        >
                            <p
                                className={
                                    'text-[14px] leading-[18px] text-slate-400'
                                }
                            >
                                Lock
                            </p>
                            {power - 1 > 0 ? (
                                <VenomLabel amount={power - 1} isSmall />
                            ) : (
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-50 font-medium'
                                    }
                                >
                                    No lock
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={'flex flex-row mt-7 space-x-1'}>
                        <button
                            onClick={() => {
                                setOpen(false)
                            }}
                            className={
                                'flex-1 py-2 text-[16px] leading-[20px] text-slate-50 bg-slate-600 rounded'
                            }
                        >
                            Cancel
                        </button>
                        <button
                            onClick={castVote}
                            className={
                                'flex-1 py-2 text-[16px] leading-[20px] text-sky-50 bg-sky-500 rounded'
                            }
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
