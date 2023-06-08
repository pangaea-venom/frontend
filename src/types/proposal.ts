import { type Address } from 'everscale-inpage-provider'

export const ProposalStatus = {
    NotReached: 'Not Reached',
    Active: 'Active',
    Executed: 'Executed',
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

export const ProposalStatusMap = {
    '0': ProposalStatus.NotReached,
    '1': ProposalStatus.Active,
    '2': ProposalStatus.Executed,
    '3': ProposalStatus.Executed,
}

export interface Proposal {
    id: number
    title: string
    description: string
    creator: Address
    createdTime: string
    status: string
    startTime: string
    endTime: string
    yes: string
    no: string
    abstain: string
    singles: Address[]
    locks: Address[]
}
