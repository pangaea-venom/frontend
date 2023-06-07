import React, { useEffect, useState } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { useNavigate } from 'react-router-dom'
import BigNumber from 'bignumber.js'

// Venom Wallet Connect
// https://github.com/web3sp/venom-connect/blob/main/examples/react/src/App.tsx

function App() {
    const [username, setUsername] = useState<string>('')

    const account = useAccountStore((state) => state.account)

    const setLoading = useAccountStore((state) => state.setLoading)
    const setAccount = useAccountStore((state) => state.setAccount)

    const venomConnect = useAccountStore((state) => state.venomConnect)
    const daoContract = useAccountStore((state) => state.daoContract)
    const address = useAccountStore((state) => state.address)

    const navigate = useNavigate()

    const onConnectButtonClick = async () => {
        if (!venomConnect) return
        venomConnect.connect()
    }

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
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!daoContract || !address) return

        setLoading(true)

        const amount = new BigNumber(2).shiftedBy(9).toString()

        await daoContract.methods.joinDao({ name: username }).send({
            from: address,
            amount,
        })

        await checkIfMember()
    }

    useEffect(() => {
        if (account) {
            navigate('/townhall', { replace: true })
        }
    }, [account])

    return (
        <div className={'container mx-auto flex flex-col'}>
            <div
                className={
                    'mt-[180px] flex flex-col items-center space-y-[36px]'
                }
            >
                {!account && daoContract ? (
                    <>
                        <div className={'flex flex-col items-start space-y-10'}>
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
    )
}

export default App
