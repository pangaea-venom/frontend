import { create } from 'zustand'
import { type VenomConnect } from 'venom-connect'
import {
    type Address,
    type Contract,
    type ProviderRpcClient,
} from 'everscale-inpage-provider'
import { type DaoAbi } from 'src/abi/dao'
import { type Task, type Comment } from 'src/types/task'
import { type Proposal } from 'src/types/proposal'

interface Account {
    uid: string
    name: string
    points: string
    earned: string
    assigned: string
    acceptedTasks: string
    appliedTasks: string[]
    accumulatedVotes: string
    createdProposals: string[]
    createdTasks: string[]
}

interface AccountStore {
    account: Account | undefined
    setAccount: (account: Account | undefined) => void
    venomConnect: VenomConnect | undefined
    setVenomConnect: (venomConnect: VenomConnect | undefined) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    venomProvider: ProviderRpcClient | undefined
    setVenomProvider: (venomProvider: ProviderRpcClient | undefined) => void
    address: Address | undefined
    setAddress: (address: Address | undefined) => void
    balance: string | undefined
    setBalance: (balance: string | undefined) => void
    daoContract: Contract<typeof DaoAbi> | undefined
    setDaoContract: (daoContract: Contract<typeof DaoAbi> | undefined) => void
    numOfTasks: number
    setNumOfTasks: (numOfTasks: number) => void
    taskMap: Map<number, Task>
    setTask: (id: number, task: Task | undefined) => void
    getTask: (id: number) => Promise<Task | undefined>
    memberMap: Map<Address, Account>
    setMember: (address: Address, member: Account) => void
    getMember: (address: Address) => Promise<Account | undefined>
    numOfProposals: number
    setNumOfProposals: (numOfProposals: number) => void
    proposalMap: Map<number, Proposal>
    setProposal: (id: number, proposal: Proposal) => void
    getProposal: (id: number) => Promise<Proposal | undefined>
    commentMap: Map<number, Comment>
    setComment: (id: number, comment: Comment) => void
    getComment: (id: number) => Promise<Comment | undefined>
}

export const useAccountStore = create<AccountStore>()((set, get) => ({
    account: undefined,
    setAccount: (account) => {
        set({ account })
    },
    venomConnect: undefined,
    setVenomConnect: (venomConnect) => {
        set({ venomConnect })
    },
    loading: false,
    setLoading: (loading) => {
        set({ loading })
    },
    venomProvider: undefined,
    setVenomProvider: (venomProvider) => {
        set({ venomProvider })
    },
    address: undefined,
    setAddress: (address) => {
        set({ address })
    },
    balance: undefined,
    setBalance: (balance) => {
        set({ balance })
    },
    daoContract: undefined,
    setDaoContract: (daoContract) => {
        set({ daoContract })
    },
    numOfTasks: 0,
    setNumOfTasks: (numOfTasks) => {
        set({ numOfTasks })
    },
    taskMap: new Map<number, Task>(),
    setTask: (id, task) => {
        set((state) => {
            const newTaskMap = new Map(state.taskMap)
            if (task) newTaskMap.set(id, task)
            else newTaskMap.delete(id)
            return { taskMap: newTaskMap }
        })
    },
    getTask: async (id) => {
        const taskMap = get().taskMap
        const task = taskMap.get(id)
        if (task) return task

        const daoContract = get().daoContract

        if (!daoContract) return undefined

        const { value0 } = await daoContract.methods
            .getTask({ taskID: id })
            .call()
        const newTask = {
            ...value0,
            id,
        }

        if (newTask.bounty === '0') return undefined

        const setTask = get().setTask
        setTask(id, newTask)
        return newTask
    },
    memberMap: new Map<Address, Account>(),
    setMember: (address, member) => {
        set((state) => {
            const newMemberMap = new Map(state.memberMap)
            newMemberMap.set(address, member)
            return { memberMap: newMemberMap }
        })
    },
    getMember: async (address) => {
        const memberMap = get().memberMap
        const member = memberMap.get(address)
        if (member) return member

        const daoContract = get().daoContract

        if (!daoContract) return undefined

        const { value0: newMember } = await daoContract.methods
            .getMember({ member: address })
            .call()

        const setMember = get().setMember
        setMember(address, newMember)
        return newMember
    },
    numOfProposals: 0,
    setNumOfProposals: (numOfProposals) => {
        set({ numOfProposals })
    },
    proposalMap: new Map<number, Proposal>(),
    setProposal: (id, proposal) => {
        set((state) => {
            const newProposalMap = new Map(state.proposalMap)
            newProposalMap.set(id, proposal)
            return { proposalMap: newProposalMap }
        })
    },
    getProposal: async (id) => {
        const proposalMap = get().proposalMap
        const proposal = proposalMap.get(id)
        if (proposal) return proposal

        const daoContract = get().daoContract

        if (!daoContract) return undefined

        const { value0 } = await daoContract.methods
            .getProposal({ proposalID: id })
            .call()
        const { value0: vote } = await daoContract.methods
            .getVote({ proposalID: id })
            .call()

        const newProposal = {
            ...value0,
            ...vote,
            id,
        }

        const setProposal = get().setProposal
        setProposal(id, newProposal)
        return newProposal
    },
    commentMap: new Map<number, Comment>(),
    setComment: (id, comment) => {
        set((state) => {
            const newCommentMap = new Map(state.commentMap)
            newCommentMap.set(id, comment)
            return { commentMap: newCommentMap }
        })
    },
    getComment: async (id) => {
        const commentMap = get().commentMap
        const comment = commentMap.get(id)
        if (comment) return comment

        const daoContract = get().daoContract

        if (!daoContract) return undefined

        const { value0 } = await daoContract.methods
            .getComment({ commentID: id })
            .call()

        const newComment = {
            ...value0,
            id,
        }

        const setComment = get().setComment
        setComment(id, newComment)
        return newComment
    },
}))
