import React from 'react'
import { ProposalListItem } from 'src/components/ProposalListItem'
import { useAccountStore } from 'src/modules/AccountStore'
import { type Proposal } from 'src/types/proposal'

export const ProposalPage = () => {
    const numOfProposals = useAccountStore((state) => state.numOfProposals)

    const [proposals, setProposals] = React.useState<Proposal[]>([])
    const [proposalIds, setProposalIds] = React.useState({})

    const daoContract = useAccountStore((state) => state.daoContract)

    const getProposal = useAccountStore((state) => state.getProposal)

    const updateProposals = () => {
        Array.from({ length: numOfProposals }).forEach(async (_, index) => {
            const proposalId = numOfProposals - index
            const proposalData = await getProposal(proposalId)

            if (
                // @ts-ignore
                proposalIds[proposalId]
            )
                return
            setProposalIds((prev) => ({
                ...prev,
                [proposalId]: true,
            }))
            // @ts-ignore
            setProposals((prev) => [...prev, proposalData])
        })
    }

    React.useEffect(() => {
        if (!daoContract || !numOfProposals) return

        updateProposals()
    }, [daoContract, numOfProposals])

    return (
        <div className={'flex flex-col space-y-2'}>
            {proposals.length ? (
                proposals.map((proposal, index) => (
                    <ProposalListItem key={index} proposal={proposal} />
                ))
            ) : (
                <div className={'text-center text-gray-500'}>No proposals</div>
            )}
        </div>
    )
}
