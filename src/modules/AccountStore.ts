import { create } from 'zustand'
import { type VenomConnect } from 'venom-connect'
import {
    type Address,
    type Contract,
    type ProviderRpcClient,
} from 'everscale-inpage-provider'
import { type DaoAbi } from 'src/abi/dao'
import { type Task } from 'src/types/task'

interface Account {
    uid: string
    name: string
    points: string
    earned: string
    assigned: string
    acceptedTasks: string
    appliedTasks: string
    accumulatedVotes: string
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
    setTask: (id: number, task: Task) => void
    getTask: (id: number) => Promise<Task | undefined>
    memberMap: Map<Address, Account>
    setMember: (address: Address, member: Account) => void
    getMember: (address: Address) => Promise<Account | undefined>
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
            newTaskMap.set(id, task)
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
}))
