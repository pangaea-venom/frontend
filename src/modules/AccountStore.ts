import { create } from 'zustand'

interface Account {
    username: string
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
