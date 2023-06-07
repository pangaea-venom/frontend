import React from 'react'
import { ProposalListItem } from 'src/components/ProposalListItem'
import { useAccountStore } from 'src/modules/AccountStore'

export const Proposal = () => {
    const numOfProposals = useAccountStore((state) => state.numOfProposals)

    return (
        <div className={'flex flex-col space-y-2'}>
            {Array.from({ length: Math.min(numOfProposals, 6) }).map(
                (_, index) => (
                    <ProposalListItem
                        key={index}
                        proposalId={numOfProposals - index}
                    />
                )
            )}
        </div>
    )
}
