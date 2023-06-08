import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from 'src/components/Header'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'
import { VenomConnect } from 'venom-connect'
import { Address, ProviderRpcClient } from 'everscale-inpage-provider'
import { useAccountStore } from 'src/modules/AccountStore'
import { LoadingOverlay } from 'src/components/LoadingOverlay'
import { DaoAbi } from 'src/abi/dao'

export const Root = () => {
    const loading = useAccountStore((state) => state.loading)
    const setLoading = useAccountStore((state) => state.setLoading)

    const setAccount = useAccountStore((state) => state.setAccount)

    const venomConnect = useAccountStore((state) => state.venomConnect)
    const setVenomConnect = useAccountStore((state) => state.setVenomConnect)
    const venomProvider = useAccountStore((state) => state.venomProvider)
    const setVenomProvider = useAccountStore((state) => state.setVenomProvider)

    const address = useAccountStore((state) => state.address)
    const setAddress = useAccountStore((state) => state.setAddress)
    const setBalance = useAccountStore((state) => state.setBalance)

    const daoContract = useAccountStore((state) => state.daoContract)
    const setDaoContract = useAccountStore((state) => state.setDaoContract)

    const navigator = useNavigate()
    const location = useLocation()

    const standaloneFallback = async () =>
        await EverscaleStandaloneClient.create({
            connection: {
                id: 1002,
                group: 'venom_devnet',
                type: 'jrpc',
                data: {
                    endpoint: 'https://jrpc-devnet.venom.foundation/rpc',
                },
            },
        })

    const initVenomConnect = async () => {
        return new VenomConnect({
            theme: 'dark',
            checkNetworkId: 1002,
            providersOptions: {
                venomwallet: {
                    links: {
                        extension: [
                            {
                                browser: 'chrome',
                                link: 'https://chrome.google.com/webstore/detail/venomwallet/ojggmchlghnjlapmfbnjholfjkiidbch',
                            },
                        ],
                    },
                    walletWaysToConnect: [
                        {
                            package: ProviderRpcClient,
                            packageOptions: {
                                fallback:
                                    VenomConnect.getPromise(
                                        'venomwallet',
                                        'extension'
                                        // eslint-disable-next-line
                                    ) || (() => Promise.reject()),
                                forceUseFallback: true,
                            },
                            packageOptionsStandalone: {
                                fallback: standaloneFallback,
                                forceUseFallback: true,
                            },
                            // Setup
                            id: 'extension',
                            type: 'extension',
                        },
                    ],
                },
            },
        })
    }

    const onInitButtonClick = async () => {
        setLoading(true)
        const venomConnect = await initVenomConnect()
        // you can save venomConnect here
        setVenomConnect(venomConnect)
        // and check the Authorization
        await checkAuth(venomConnect)
    }

    const getAddress = async (provider: ProviderRpcClient) => {
        const providerState = await provider?.getProviderState?.()

        return providerState?.permissions.accountInteraction?.address
    }

    const checkAuth = async (_venomConnect: any) => {
        const auth = await _venomConnect?.checkAuth()
        if (auth) {
            await check(_venomConnect)
        }
    }

    const check = async (_provider: ProviderRpcClient | undefined) => {
        const _address = _provider ? await getAddress(_provider) : undefined
        const _balance =
            _provider && _address
                ? await getBalance(_provider, _address)
                : undefined

        if (!_address) {
            setLoading(false)
            return
        }

        setAddress(_address)
        setBalance(_balance)

        if (_provider && _address) {
            setVenomProvider(_provider)
            setTimeout(() => {
                check(_provider)
            }, 7000)
        }
    }

    const getBalance = async (provider: any, _address: Address) => {
        try {
            const providerBalance = await provider?.getBalance?.(_address)

            return providerBalance
        } catch (error) {
            return undefined
        }
    }

    useEffect(() => {
        onInitButtonClick()
    }, [])

    const onConnect = async (provider: ProviderRpcClient | undefined) => {
        check(provider)
    }

    useEffect(() => {
        if (!venomConnect) return

        const off = venomConnect.on('connect', onConnect)

        return () => {
            off?.()
        }
    }, [venomConnect])

    useEffect(() => {
        if (venomProvider && address) {
            const contractAddress = new Address(
                '0:69ed24b3c9ba5e92cdeae0b01bd94f4eb6ae63bff88edbfd3bf65980dc121dde'
            )
            const _daoContract = new venomProvider.Contract(
                DaoAbi,
                contractAddress
            )
            setDaoContract(_daoContract)
        }
    }, [venomProvider])

    const checkIfMember = async () => {
        if (!daoContract || !address) {
            return
        }

        const result = await daoContract.methods
            .isMember({ person: address })
            .call()
        if (result.exists) {
            const user = await daoContract.methods
                .getMember({ member: address })
                .call()
            setAccount(user.value0)
        } else {
            if (location.pathname !== '/') {
                navigator('/', { replace: true })
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        checkIfMember()
    }, [daoContract])

    return (
        <div className={'w-full h-screen flex flex-col text-slate-50'}>
            <Header />
            <LoadingOverlay active={loading}>
                <Outlet />
            </LoadingOverlay>
        </div>
    )
}
