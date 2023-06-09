import React, { type ChangeEvent, useState } from 'react'
import { Dialog } from 'src/components/Dialog'
import { toNano } from 'src/util'
import { useAccountStore } from 'src/modules/AccountStore'
import { toast } from 'react-toastify'

interface CreateProposalDialogProps {
    open: boolean
    onClose: () => void
}

export const CreateProposalDialog = ({
    open,
    onClose,
}: CreateProposalDialogProps) => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        duration: '',
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

        const sendVal = toNano(0.1)

        const duration = Number(input.duration) * 60 * 60 * 24

        try {
            await daoContract.methods
                .createProposal({
                    ...input,
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
            toast.success('Proposal created successfully')
        } catch (e) {
            // @ts-ignore
            toast.error(e.message)
        } finally {
            setLoading(false)
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className={
                    'flex flex-col py-5 px-4 rounded-lg bg-slate-800 w-[700px]'
                }
            >
                <input
                    onChange={handleChange}
                    placeholder={'Proposal title'}
                    name={'title'}
                    className={
                        'appearance-none bg-transparent text-[24px] leading-[30px] ' +
                        'font-bold placeholder:text-slate-500 text-slate-50'
                    }
                />
                <textarea
                    onChange={handleChange}
                    placeholder={'Write description'}
                    rows={6}
                    name={'description'}
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
                                onChange={handleChange}
                                type={'number'}
                                placeholder={'7'}
                                name={'duration'}
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
                        Suggest
                    </button>
                </div>
            </div>
        </Dialog>
    )
}
