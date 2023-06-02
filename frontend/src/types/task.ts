export const TaskStatus = {
    InProgress: 'In Progress',
    InReview: 'In Review',
}

// eslint-disable-next-line
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export interface Task {
    id: number
    title: string
    description: string
    status: TaskStatus
    bounty: number
    memberAmount: number
    dueDate: string
}
