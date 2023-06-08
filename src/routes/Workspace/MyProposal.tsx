import React from 'react'
import { ProposalListItem } from 'src/components/ProposalListItem'
import { useAccountStore } from 'src/modules/AccountStore'
import { type Proposal } from 'src/types/proposal'

export const MyProposal = () => {
    const [proposals, setProposals] = React.useState<Proposal[]>([])
    const [proposalIds, setProposalIds] = React.useState({})

    const account = useAccountStore((state) => state.account)
    const daoContract = useAccountStore((state) => state.daoContract)

    const getProposal = useAccountStore((state) => state.getProposal)

    const updateProposals = () => {
        if (!account) return

        account.createdProposals.forEach(async (proposal) => {
            const proposalData = await getProposal(Number(proposal))
            if (
                // @ts-ignore
                proposalIds[proposal]
            )
                return

            setProposalIds((prev) => ({
                ...prev,
                [proposal]: true,
            }))
            // @ts-ignore
            setProposals((prev) => [...prev, proposalData])
        })
    }

    React.useEffect(() => {
        if (!account || !daoContract) return

        updateProposals()
    }, [account, daoContract])

    return (
        <div className="flex flex-col space-y-2">
            {proposals.length ? (
                proposals.map((proposal, index) => (
                    <ProposalListItem key={index} isMine proposal={proposal} />
                ))
            ) : (
                <div className="text-center text-gray-500">
                    No proposals created
                </div>
            )}
        </div>
    )
}
