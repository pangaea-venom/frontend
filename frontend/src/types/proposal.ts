export const ProposalStatus = {
    Executed: 'Executed',
    NotReached: 'Not Reached',
    Active: 'Active',
}

// eslint-disable-next-line
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus]

export interface Proposal {
    id: number
    title: string
    status: ProposalStatus
    proposedDate: string
    forCount: number
    againstCount: number
}
