export const ProposalStatus = {
    Executed: 'Executed',
    NotReached: 'Not Reached',
    Active: 'Active',
}

// eslint-disable-next-line
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus]

export const PollStatus = {
    For: 'For',
    Against: 'Against',
    Abstain: 'Abstain',
}

// eslint-disable-next-line
export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus]

export interface Proposal {
    id: number
    title: string
    status: ProposalStatus
    proposedDate: string
    forCount: number
    againstCount: number
    description?: string
    abstainCount?: 12
}
