import { create } from 'zustand'

interface Account {
    uid: string
    name: string
    points: string
    earned: string
    assigned: string
}

interface AccountStore {
    account: Account | null
    setAccount: (account: Account | null) => void
}

export const useAccountStore = create<AccountStore>()((set) => ({
    account: null,
    setAccount: (account) => {
        set({ account })
    },
}))
