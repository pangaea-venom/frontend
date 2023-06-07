import React from 'react'
import { ProposalListItem } from 'src/components/ProposalListItem'
import { useAccountStore } from 'src/modules/AccountStore'

export const MyProposal = () => {
    const account = useAccountStore((state) => state.account)

    return (
        <div className="flex flex-col space-y-2">
            {account?.createdProposals.map((proposal, index) => (
                <ProposalListItem
                    key={index}
                    isMine
                    proposalId={Number(proposal)}
                />
            ))}
        </div>
    )
}
