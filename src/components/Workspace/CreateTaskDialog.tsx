import React, { type ChangeEvent, useState } from 'react'
import { Dialog } from 'src/components/Dialog'
import { useAccountStore } from 'src/modules/AccountStore'
import { toNano } from 'src/util'
import { toast } from 'react-toastify'

interface CreateTaskDialogProps {
    open: boolean
    onClose: () => void
}

export const CreateTaskDialog = ({ open, onClose }: CreateTaskDialogProps) => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        duration: '',
        points: '',
    })

    const setLoading = useAccountStore((state) => state.setLoading)

    const setAccount = useAccountStore((state) => state.setAccount)
    const daoContract = useAccountStore((state) => state.daoContract)
    const address = useAccountStore((state) => state.address)

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        if (!daoContract || !address) return

        setLoading(true)

        const bounty = toNano(Number(input.points))
        const sendVal = toNano(Number(input.points) + 2)

        const duration = Number(input.duration)

        await daoContract.methods
            .createTask({
                ...input,
                bounty,
                duration,
            })
            .send({
                from: address,
                amount: sendVal,
            })

        const user = await daoContract.methods
            .getMember({ member: address })
            .call()
        setAccount(user.value0)

        setLoading(false)
        toast.success('Task created successfully')
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className={
                    'flex flex-col py-5 px-4 rounded-lg bg-slate-800 w-[700px]'
                }
            >
                <input
                    placeholder={'Task title'}
                    name={'title'}
                    onChange={handleChange}
                    className={
                        'appearance-none bg-transparent text-[24px] leading-[30px] ' +
                        'font-bold placeholder:text-slate-500 text-slate-50'
                    }
                />
                <textarea
                    name={'description'}
                    onChange={handleChange}
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
                        <div className={'flex flex-row items-center'}>
                            <input
                                type={'number'}
                                name={'duration'}
                                onChange={handleChange}
                                placeholder={'7'}
                                className={
                                    'appearance-none bg-transparent text-[14px] leading-[18px] ' +
                                    'placeholder:text-slate-500 text-slate-50 w-[40px]'
                                }
                            />
                            <p
                                className={
                                    'text-slate-300 text-[14px] leading-[18px]'
                                }
                            >
                                days
                            </p>
                        </div>
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
                            name={'points'}
                            onChange={handleChange}
                            type={'number'}
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
                        // @ts-ignore
                        disabled={Object.keys(input).some((key) => !input[key])}
                        onClick={handleSubmit}
                        className={
                            'w-[130px] py-2 rounded text-[14px] leading-[18px] ' +
                            'text-sky-50 bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500'
                        }
                    >
                        Open Task
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
