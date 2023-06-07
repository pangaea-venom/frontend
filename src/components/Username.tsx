import React, { useEffect } from 'react'
import { type Address } from 'everscale-inpage-provider'
import { useAccountStore } from 'src/modules/AccountStore'

interface UsernameProps {
    address: Address
}

export const Username = ({ address }: UsernameProps) => {
    const [username, setUsername] = React.useState<string>('')

    const daoContract = useAccountStore((state) => state.daoContract)

    const getMember = useAccountStore((state) => state.getMember)
    const updateMember = async () => {
        const member = await getMember(address)
        setUsername(member?.name ?? '')
    }

    useEffect(() => {
        if (!daoContract) return

        updateMember()
    }, [])

    return <>{username}</>
}
