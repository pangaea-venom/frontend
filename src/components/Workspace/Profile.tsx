import React, { useState } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { CreateTaskDialog } from 'src/components/Workspace/CreateTaskDialog'
import { CreateProposalDialog } from 'src/components/Workspace/CreateProposalDialog'
import { toast } from 'react-toastify'

export const Profile = () => {
    const account = useAccountStore((state) => state.account)

    const [taskOpen, setTaskOpen] = useState(false)
    const [proposalOpen, setProposalOpen] = useState(false)

    const address = useAccountStore((state) => state.address)

    const copyAddress = async () => {
        if (!address) return

        try {
            await navigator.clipboard.writeText(address.toString())
            toast.success('Address is copied to clipboard!')
            /* Resolved - text copied to clipboard successfully */
        } catch (err: any) {
            // eslint-disable-next-line
            toast.error(`Failed to copy: ${err}`)
            /* Rejected - text failed to copy to the clipboard */
        }
    }

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
                        {account?.name}
                    </p>
                    <button
                        className={`flex flex-row items-center space-x-2 
                        bg-slate-700 rounded px-2 pt-1 pb-1.5 hover:bg-slate-600`}
                        onClick={copyAddress}
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
                    onClick={() => {
                        setTaskOpen(true)
                    }}
                    className={`border border-slate-600 rounded w-full py-2 text-slate-300 text-[12px] leading-[15px]
                    hover:bg-slate-700`}
                >
                    Create Task
                </button>
                <button
                    onClick={() => {
                        setProposalOpen(true)
                    }}
                    className={`border border-slate-600 rounded w-full py-2 text-slate-300 text-[12px] leading-[15px]
                    hover:bg-slate-700`}
                >
                    Create Proposal
                </button>
            </div>
            <CreateTaskDialog
                open={taskOpen}
                onClose={() => {
                    setTaskOpen(false)
                }}
            />
            <CreateProposalDialog
                open={proposalOpen}
                onClose={() => {
                    setProposalOpen(false)
                }}
            />
        </div>
    )
}
