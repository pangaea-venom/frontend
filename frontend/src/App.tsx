import React, { useEffect, useState } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { useNavigate } from 'react-router-dom'
import { Profile } from 'src/routes/App/Profile'
import { VenomConnect } from 'venom-connect'
import { ProviderRpcClient } from 'everscale-inpage-provider'
import { EverscaleStandaloneClient } from 'everscale-standalone-client'

// Venom Wallet Connect
// https://github.com/web3sp/venom-connect/blob/main/examples/react/src/App.tsx

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeAccount, setActiveAccount] = useState<null>(null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [input, setInput] = useState<{
        username: string
    }>({
        username: '',
    })

    const account = useAccountStore((state) => state.account)
    const setAccount = useAccountStore((state) => state.setAccount)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedIn, setLoggedIn] = useState(false)
    const [venomConnect, setVenomConnect] = useState<any>()

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
            checkNetworkId: 1000,
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
                    defaultWalletWaysToConnect: [
                        // List of enabled options
                        'mobile',
                        'ios',
                        'android',
                    ],
                },
            },
        })
    }

    const getAddress = async (provider: any) => {
        const providerState = await provider?.getProviderState?.()

        const address =
            providerState?.permissions.accountInteraction?.address.toString()

        return address
    }

    const checkAuth = async (_venomConnect: any) => {
        const auth = await _venomConnect?.checkAuth()
        if (auth) await getAddress(_venomConnect)
    }

    const onInitButtonClick = async () => {
        const venomConnect = await initVenomConnect()
        // you can save venomConnect here

        setVenomConnect(venomConnect)
        // and check the Authorization
        await checkAuth(venomConnect)
    }

    const onConnectButtonClick = async () => {
        venomConnect?.connect()
    }

    useEffect(() => {
        onInitButtonClick()
    }, [])

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined

        if (loggedIn) {
            setAccount(activeAccount)
            timeoutId = setTimeout(() => {
                navigate('/explore')
            }, 3500)
        }

        return () => {
            if (timeoutId != null) {
                clearTimeout(timeoutId)
            }
        }
    }, [loggedIn])

    return (
        <div className={'container mx-auto flex flex-col'}>
            <div
                className={
                    'mt-[180px] flex flex-col items-center space-y-[36px]'
                }
            >
                {loggedIn ? (
                    <Profile username={account?.meta.name} />
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
                            {loading ? (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="w-[44px] h-[45px] mr-2 text-[#282828] animate-spin dark:text-gray-600 fill-[#B0B1B7]"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
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
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default App
