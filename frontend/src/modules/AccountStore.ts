import { create } from 'zustand'

interface AccountStore {
    account: any | null
    setAccount: (account: any | null) => void
}

export const useAccountStore = create<AccountStore>()((set) => ({
    account: null,
    setAccount: (account) => {
        set({ account })
    },
}))
