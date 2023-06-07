import { type Address } from 'everscale-inpage-provider'

export const TaskStatus = {
    InProgress: 'In Progress',
    InReview: 'In Review',
}

// eslint-disable-next-line
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export const TaskResultStatus = {
    Accepted: 'Accepted',
    Rejected: 'Rejected',
}

// eslint-disable-next-line
export type TaskResultStatus = (typeof TaskResultStatus)[keyof typeof TaskResultStatus]


export const TaskStatusMap = {
    '0': TaskStatus.InProgress,
    '1': TaskStatus.InReview,
}

export interface Task {
    id: number
    title: string
    description: string
    status: string
    bounty: string
    startTime: string
    endTime: string
    owner: Address
    assignees: Address[]
    winner: Address
    points: string
    comments: string[]
}
