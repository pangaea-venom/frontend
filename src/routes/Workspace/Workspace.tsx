import React from 'react'
import { Tabs } from 'src/components/Tabs'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { Profile } from 'src/components/Workspace/Profile'
import { VenomLabel } from 'src/components/VenomLabel'
import { numberWithCommas, toNano } from 'src/util'
import { useAccountStore } from 'src/modules/AccountStore'
import { toast } from 'react-toastify'

export const Workspace = () => {
    const match = useMatch('/workspace/:activeName/*')
    const activeName = match?.params.activeName

    const setLoading = useAccountStore((state) => state.setLoading)

    const navigate = useNavigate()

    const daoContract = useAccountStore((state) => state.daoContract)
    const address = useAccountStore((state) => state.address)
    const setAccount = useAccountStore((state) => state.setAccount)

    const handleClick = (activeName: string) => {
        navigate(`/workspace/${activeName}`)
    }

    const claimBounty = async () => {
        if (!daoContract || !address) return

        setLoading(true)

        const amount = toNano(1)

        try {
            await daoContract.methods.claimBounty().send({
                from: address,
                amount,
            })

            const user = await daoContract.methods
                .getMember({ member: address })
                .call()
            setAccount(user.value0)

            toast.success('Claimed bounty successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const balance = useAccountStore((state) => state.balance)
    const account = useAccountStore((state) => state.account)

    const tabItems = [
        {
            label: 'My Tasks',
            value: 'my-tasks',
        },
        {
            label: 'My ProposalPage',
            value: 'my-proposal',
        },
    ]

    return (
        <div
            className={
                'container mx-auto flex flex-row mt-[24px] space-x-5 pb-[100px]'
            }
        >
            <div className={`flex flex-col basis-[273px] shrink-0 space-y-3`}>
                <Profile />
                <div
                    className={`flex flex-col bg-slate-800 rounded-lg py-3 space-y-3 px-4 drop-shadow-md`}
                >
                    <p className={'text-slate-400 text-[14px] leading-[18px]'}>
                        Assets
                    </p>
                    <VenomLabel amount={balance} />
                </div>
                <div
                    className={`flex flex-col bg-slate-800 rounded-lg py-3 space-y-5 px-4 drop-shadow-md`}
                >
                    <div className={`flex flex-col space-y-3`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            My Earning
                        </p>
                        <VenomLabel amount={account?.earned} />
                    </div>
                    <button
                        disabled={account?.earned === '0'}
                        onClick={claimBounty}
                        className={
                            'bg-sky-500 rounded py-2 text-sky-50 text-[14px] ' +
                            'leading-[18px] font-medium w-full disabled:bg-slate-700 disabled:text-slate-500'
                        }
                    >
                        Claim
                    </button>
                </div>
                <div
                    className={`flex flex-col bg-slate-800 rounded-lg space-y-5 p-4 drop-shadow-md`}
                >
                    <div className={`flex flex-col space-y-2`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            Claimed Tokens
                        </p>
                        <VenomLabel amount={account?.points} />
                    </div>
                    <div className={`flex flex-col space-y-2`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            Accepted Tasks
                        </p>
                        <p
                            className={
                                'text-slate-50 text-[20px] leading-[25px] font-medium'
                            }
                        >
                            {numberWithCommas(Number(account?.acceptedTasks))}
                        </p>
                    </div>
                    <div className={`flex flex-col space-y-2`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            Applied Tasks
                        </p>
                        <p
                            className={
                                'text-slate-50 text-[20px] leading-[25px] font-medium'
                            }
                        >
                            {numberWithCommas(Number(account?.appliedTasks))}
                        </p>
                    </div>
                    <div className={`flex flex-col space-y-2`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            Accumulated Votes
                        </p>
                        <p
                            className={
                                'text-slate-50 text-[20px] leading-[25px] font-medium'
                            }
                        >
                            {numberWithCommas(
                                Number(account?.accumulatedVotes)
                            )}
                        </p>
                    </div>
                    <div className={`flex flex-col space-y-2`}>
                        <p
                            className={
                                'text-slate-400 text-[14px] leading-[18px]'
                            }
                        >
                            Suggestions
                        </p>
                        <p
                            className={
                                'text-slate-50 text-[20px] leading-[25px] font-medium'
                            }
                        >
                            0
                        </p>
                    </div>
                </div>
            </div>
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
