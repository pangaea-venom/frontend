import React from 'react'
import { ProposalListItem } from 'src/components/ProposalListItem'
import { ProposalStatus } from 'src/types/proposal'

export const Proposal = () => {
    return (
        <div className={'flex flex-col space-y-2'}>
            {Array.from({ length: 6 }).map((_, index) => (
                <ProposalListItem
                    key={index}
                    proposal={{
                        id: index,
                        title: 'Official Toyota logo usage at ‘Toyota Car Exhibition’',
                        proposedDate: 'Mar. 16, 2023',
                        forCount: 35,
                        againstCount: 15,
                        status: ProposalStatus.Active,
                    }}
                />
            ))}
        </div>
    )
}
