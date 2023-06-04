import React from 'react'
import { useAccountStore } from 'src/modules/AccountStore'

export const Profile = () => {
    const account = useAccountStore((state) => state.account)

    return (
        <div
            className={`flex flex-col bg-slate-800 rounded-lg px-5 pt-7 pb-6 space-y-8 items-center`}
        >
            <div className={`flex flex-col items-center space-y-5`}>
                <div
                    style={{
                        background: '#242424',
                    }}
                    className={`rounded-full w-[108px] h-[108px]`}
                />
                <div className={`flex flex-col items-center space-y-3`}>
                    <p
                        className={
                            'text-slate-50 text-[20px] leading-[25px] font-medium'
                        }
                    >
                        {account?.username}
                    </p>
                    <button
                        className={`flex flex-row items-center space-x-2 bg-slate-700 rounded px-2 pt-1 pb-1.5`}
                    >
                        <img src={'/ic-copy.svg'} />
                        <p
                            className={`text-slate-400 text-[12px] leading-[15px]`}
                        >
                            Copy Wallet
                        </p>
                    </button>
                </div>
            </div>
            <div className={`flex flex-col space-y-1 w-full`}>
                <button
                    className={`border border-slate-600 rounded w-full py-2 text-slate-300 text-[12px] leading-[15px]`}
                >
                    Create Task
                </button>
                <button
                    className={`border border-slate-600 rounded w-full py-2 text-slate-300 text-[12px] leading-[15px]`}
                >
                    Create Proposal
                </button>
            </div>
        </div>
    )
}
