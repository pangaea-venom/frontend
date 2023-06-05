import React from 'react'
import { Dialog } from 'src/components/Dialog'

interface CreateTaskDialogProps {
    open: boolean
    onClose: () => void
}

export const CreateTaskDialog = ({ open, onClose }: CreateTaskDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className={
                    'flex flex-col py-5 px-4 rounded-lg bg-slate-800 w-[700px]'
                }
            >
                <input
                    placeholder={'Task title'}
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
                            Start Date
                        </p>
                        <input
                            placeholder={'e.g. MM/DD/YYYY'}
                            className={
                                'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                'placeholder:text-slate-500 text-slate-50'
                            }
                        />
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'py-1 pl-1 w-[80px] text-slate-300 text-[14px] leading-[18px]'
                            }
                        >
                            End Date
                        </p>
                        <input
                            placeholder={'e.g. MM/DD/YYYY'}
                            className={
                                'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                'placeholder:text-slate-500 text-slate-50'
                            }
                        />
                    </div>
                    <div className={'flex flex-row space-x-2 items-center'}>
                        <p
                            className={
                                'py-1 pl-1 w-[80px] text-slate-300 text-[14px] leading-[18px]'
                            }
                        >
                            Bounty
                        </p>
                        <input
                            placeholder={'Empty'}
                            className={
                                'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                'placeholder:text-slate-500 text-slate-50'
                            }
                        />
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
                        Open Task
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
