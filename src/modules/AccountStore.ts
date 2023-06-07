import { create } from 'zustand'
import { type VenomConnect } from 'venom-connect'
import {
    type Address,
    type Contract,
    type ProviderRpcClient,
} from 'everscale-inpage-provider'
import { type DaoAbi } from 'src/abi/dao'

interface Account {
    uid: string
    name: string
    points: string
    earned: string
    assigned: string
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
}

export const useAccountStore = create<AccountStore>()((set) => ({
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
}))
