import React from 'react'
import { ProposalStatus } from 'src/types/proposal'

interface ProposalStatusLabelProps {
    status: ProposalStatus
}

export const ProposalStatusLabel = ({ status }: ProposalStatusLabelProps) => {
    return (
        <div className={`flex flex-row items-center space-x-2.5`}>
            <div
                className={`
                w-[6px] h-[6px]
                rounded-full ${
                    status === ProposalStatus.Active
                        ? 'bg-green-400'
                        : status === ProposalStatus.NotReached
                        ? 'bg-red-400'
                        : 'bg-amber-300'
                }`}
            />
            <p
                className={`
                text-[14px] leading-[18px] 
                ${
                    status === ProposalStatus.Active
                        ? 'text-green-400'
                        : status === ProposalStatus.NotReached
                        ? 'text-red-400'
                        : 'text-amber-300'
                }`}
            >
                {status}
            </p>
        </div>
    )
}
