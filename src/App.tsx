import React, { useEffect, useState } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { useNavigate } from 'react-router-dom'
import { VenomConnect } from 'venom-connect'
import {
    type Contract,
    Address,
    ProviderRpcClient,
} from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'

import { DaoAbi } from 'src/abi/dao'
import BigNumber from 'bignumber.js'
import { LoadingOverlay } from './components/LoadingOverlay'

// Venom Wallet Connect
// https://github.com/web3sp/venom-connect/blob/main/examples/react/src/App.tsx

function App() {
    const [needToJoin, setNeedToJoin] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [address, setAddress] = useState<Address | undefined>(undefined)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [balance, setBalance] = useState<string | undefined>(undefined)

    const account = useAccountStore((state) => state.account)
    const setAccount = useAccountStore((state) => state.setAccount)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false)
    const [venomConnect, setVenomConnect] = useState<any>()
    const [venomProvider, setVenomProvider] = useState<
        ProviderRpcClient | undefined
    >(undefined)
    const [daoContract, setDaoContract] = useState<
        Contract<typeof DaoAbi> | undefined
    >(undefined)

    const navigate = useNavigate()

    const standaloneFallback = async () =>
        await EverscaleStandaloneClient.create({
            connection: {
                id: 1000,
                group: 'venom_testnet',
                type: 'jrpc',
                data: {
                    endpoint: 'https://jrpc.venom.foundation/rpc',
                },
            },
        })

    const initVenomConnect = async () => {
        return new VenomConnect({
            theme: 'dark',
            checkNetworkId: 0,
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
                                    ) || (async () => await Promise.reject()),
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

    const getAddress = async (provider: ProviderRpcClient) => {
        const providerState = await provider?.getProviderState?.()

        return providerState?.permissions.accountInteraction?.address
    }

    const checkAuth = async (_venomConnect: any) => {
        const auth = await _venomConnect?.checkAuth()
        if (auth) {
            setLoading(true)
            await check(_venomConnect)
        }
    }

    const onInitButtonClick = async () => {
        const venomConnect = await initVenomConnect()
        // you can save venomConnect here
        setVenomConnect(venomConnect)
        // and check the Authorization
        await checkAuth(venomConnect)
    }

    const onConnectButtonClick = async () => {
        if (!venomConnect) return
        venomConnect.connect()
    }

    useEffect(() => {
        onInitButtonClick()
    }, [])

    const getBalance = async (provider: any, _address: Address) => {
        try {
            const providerBalance = await provider?.getBalance?.(_address)

            return providerBalance
        } catch (error) {
            return undefined
        }
    }

    const check = async (_provider: ProviderRpcClient | undefined) => {
        const _address = _provider ? await getAddress(_provider) : undefined
        const _balance =
            _provider && _address
                ? await getBalance(_provider, _address)
                : undefined

        setAddress(_address)
        setBalance(_balance)

        if (_provider && _address) {
            setVenomProvider(_provider)
            setTimeout(() => {
                check(_provider)
            }, 7000)
        }
    }

    const onConnect = async (provider: ProviderRpcClient | undefined) => {
        setLoading(true)
        check(provider)
    }

    const onDisconnect = async () => {
        venomProvider?.disconnect()
        setAddress(undefined)
        // Balance reseting
        setBalance(undefined)
    }

    useEffect(() => {
        const off = venomConnect?.on('connect', onConnect)
        const offDisconnect = venomConnect?.on('disconnect', onDisconnect)

        return () => {
            off?.()
            offDisconnect?.()
        }
    }, [venomConnect])

    useEffect(() => {
        if (venomProvider && address) {
            const contractAddress = new Address(
                '0:c21b137fa2ed4af1b88ae7b36b28832594e73f6402115cbeafcefc81cb2897ec'
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
            setNeedToJoin(true)
        }
    }

    useEffect(() => {
        checkIfMember()
    }, [daoContract])

    const handleSubmit = async () => {
        if (!daoContract || !address) return

        const amount = new BigNumber(2).shiftedBy(9).toString()

        await daoContract.methods.joinDao({ name: username }).send({
            from: address,
            amount,
        })
    }

    useEffect(() => {
        if (account) {
            navigate('/townhall', { replace: true })
        }
    }, [account])

    return (
        <LoadingOverlay active={loading}>
            <div className={'container mx-auto flex flex-col'}>
                <div
                    className={
                        'mt-[180px] flex flex-col items-center space-y-[36px]'
                    }
                >
                    {needToJoin ? (
                        <>
                            <div
                                className={
                                    'flex flex-col items-start space-y-10'
                                }
                            >
                                <p
                                    className={
                                        'text-[36px] leading-[45px] text-left font-semibold'
                                    }
                                >
                                    Lemme know <br />
                                    your name
                                </p>
                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    type="text"
                                    name={'username'}
                                    placeholder={'How should I call you?'}
                                    required
                                    className={
                                        'appearance-none w-[400px] border-slate-500 border-b text-[20px] py-2 ' +
                                        'leading-[30px] placeholder:text-slate-600 text-slate-50 bg-transparent'
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSubmit()
                                    }}
                                />
                                <button
                                    className={
                                        'appearance-none bg-sky-500 w-[104px] py-2 rounded-md ' +
                                        'text-white font-medium text-[16px] disabled:bg-slate-700 ' +
                                        'disabled:cursor-not-allowed disabled:text-slate-500'
                                    }
                                    disabled={!username}
                                    type={'submit'}
                                    onClick={handleSubmit}
                                >
                                    Join
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={
                                    'flex flex-col items-center space-y-[64px]'
                                }
                            >
                                <div
                                    className={
                                        'flex flex-col items-center space-y-[28px]'
                                    }
                                >
                                    <p
                                        className={
                                            'text-[36px] leading-[45px] text-center font-semibold'
                                        }
                                    >
                                        Welcome! <br />
                                        Start Your Impossible
                                    </p>
                                    <p
                                        className={
                                            'text-[20px] leading-[25px] text-slate-300'
                                        }
                                    >
                                        Pangaea supports venom network only
                                    </p>
                                </div>
                                <button
                                    className={
                                        'bg-black text-white text-[14px] px-[24px] py-[12px] ' +
                                        'rounded-[18px] w-[358px] flex flex-row items-center ' +
                                        'justify-center space-x-[12px] rounded-lg'
                                    }
                                    style={{
                                        background:
                                            'linear-gradient(90deg, #1C23A5 0%, #4EA680 100%)',
                                    }}
                                    onClick={onConnectButtonClick}
                                >
                                    <img src={'/venom.svg'} />
                                    <p
                                        className={
                                            'text-[18px] leading-[23px] text-mono-white'
                                        }
                                    >
                                        Connect Wallet
                                    </p>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default App
