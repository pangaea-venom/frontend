import React from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { useMatch, useNavigate } from 'react-router-dom'

export const Header = () => {
    const account = useAccountStore((state) => state.account)

    const tabs = [
        {
            name: 'Townhall',
            value: 'townhall',
        },
        {
            name: 'Workspace',
            value: 'workspace',
        },
    ]

    const navigate = useNavigate()

    const match = useMatch('/:activeTab/*')
    const activeTab = match?.params.activeTab

    return (
        <>
            <header
                className={
                    'fixed inset-x-0 top-0 h-[60px] flex flex-row align-center bg-appbar'
                }
            >
                <div
                    className={
                        'container mx-auto flex flex-row items-center justify-between'
                    }
                >
                    <div
                        className={'flex flex-row items-center space-x-[44px]'}
                    >
                        <button
                            onClick={() => {
                                account != null
                                    ? navigate('/explore')
                                    : navigate('/')
                            }}
                        >
                            <img src={'/logo.svg'} />
                        </button>
                        <div className={'flex flex-row space-x-[36px]'}>
                            {tabs.map((tab, index) => (
                                <div key={index} className={'relative'}>
                                    <button
                                        disabled={account === null}
                                        className={`text-[14px] text-slate-50`}
                                        onClick={() => {
                                            navigate(`/${tab.value}`)
                                        }}
                                    >
                                        {tab.name}
                                    </button>
                                    {activeTab === tab.value ? (
                                        <div
                                            className={
                                                'absolute -bottom-[3px] left-0 w-full h-[2px] bg-slate-50'
                                            }
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    {account != null ? (
                        <div
                            className={
                                'flex flex-row space-x-[20px] items-center'
                            }
                        >
                            <button
                                className={
                                    'flex flex-row items-center space-x-1.5 py-2 ' +
                                    'px-[10px] bg-slate-800 rounded border border-slate-700'
                                }
                            >
                                <div
                                    style={{
                                        background: '#BB2A2A',
                                    }}
                                    className={'w-6 h-6 rounded-full'}
                                />
                                <p
                                    className={
                                        'text-[14px] text-white font-medium min-w-[120px] text-center'
                                    }
                                >
                                    {account.name}
                                </p>
                            </button>
                        </div>
                    ) : null}
                </div>
            </header>
            <div className={'min-h-[60px]'} />
        </>
    )
}
