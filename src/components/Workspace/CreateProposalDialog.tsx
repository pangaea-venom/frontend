import React from 'react'
import { Dialog } from 'src/components/Dialog'

interface CreateProposalDialogProps {
    open: boolean
    onClose: () => void
}

export const CreateProposalDialog = ({
    open,
    onClose,
}: CreateProposalDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className={
                    'flex flex-col py-5 px-4 rounded-lg bg-slate-800 w-[700px]'
                }
            >
                <input
                    placeholder={'Proposal title'}
                    className={
                        'appearance-none bg-transparent text-[24px] leading-[30px] ' +
                        'font-bold placeholder:text-slate-500 text-slate-50'
                    }
                />
                <textarea
                    placeholder={'Write description'}
                    rows={6}
                    className={
                        'appearance-none bg-transparent text-[16px] leading-[20px] ' +
                        'placeholder:text-slate-500 text-slate-50 mt-7'
                    }
                />
                <div className={'h-[1px] w-full bg-slate-700 mt-5'} />
                <div className={'flex flex-col space-y-3 mt-5'}>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'py-1 pl-1 w-[80px] text-slate-300 text-[14px] leading-[18px]'
                            }
                        >
                            Period
                        </p>
                        <input
                            placeholder={'e.g. 7 days'}
                            className={
                                'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                'placeholder:text-slate-500 text-slate-50'
                            }
                        />
                    </div>
                    <div className={'flex flex-row space-x-2'}>
                        <p
                            className={
                                'py-1 pl-1 w-[80px] text-slate-300 text-[14px] leading-[18px]'
                            }
                        >
                            Choices
                        </p>
                        <div className={'flex flex-col space-y-2'}>
                            <div
                                className={
                                    'flex flex-row space-x-2 items-center'
                                }
                            >
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 w-[60px]'
                                    }
                                >
                                    Choice 1
                                </p>
                                <input
                                    placeholder={'For'}
                                    className={
                                        'appearance-none bg-transparent text-[14px] leading-[18px] px-2.5 py-1 ' +
                                        'placeholder:text-slate-600 text-slate-50 border border-slate-600 rounded'
                                    }
                                />
                            </div>
                            <div
                                className={
                                    'flex flex-row space-x-2 items-center'
                                }
                            >
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 w-[60px]'
                                    }
                                >
                                    Choice 2
                                </p>
                                <input
                                    placeholder={'Against'}
                                    className={
                                        'appearance-none bg-transparent text-[14px] leading-[18px] px-2.5 py-1 ' +
                                        'placeholder:text-slate-600 text-slate-50 border border-slate-600 rounded'
                                    }
                                />
                            </div>
                            <div
                                className={
                                    'flex flex-row space-x-2 items-center'
                                }
                            >
                                <p
                                    className={
                                        'text-[14px] leading-[18px] text-slate-300 w-[60px]'
                                    }
                                >
                                    Choice 3
                                </p>
                                <input
                                    placeholder={'Abstain'}
                                    className={
                                        'appearance-none bg-transparent text-[14px] leading-[18px] px-2.5 py-1 ' +
                                        'placeholder:text-slate-600 text-slate-50 border border-slate-600 rounded'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-row space-x-3 items-center mt-5'}>
                    <button
                        onClick={onClose}
                        className={
                            'w-[130px] py-2 rounded border border-slate-500 text-[14px] leading-[18px] text-slate-200'
                        }
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className={
                            'w-[130px] py-2 rounded text-[14px] leading-[18px] text-sky-50 bg-sky-500'
                        }
                    >
                        Suggest
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
