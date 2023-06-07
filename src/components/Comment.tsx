import React, { useEffect } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'

interface CommentProps {
    commentId: number
}

// eslint-disable-next-line
export const Comment = ({commentId}: CommentProps) => {
    const daoContract = useAccountStore((state) => state.daoContract)

    const updateComment = async () => {
        console.log('updateComment')
    }

    useEffect(() => {
        if (!daoContract) return

        updateComment()
    }, [])

    return (
        <div className={'flex flex-row items-start'}>
            <div
                className={
                    'rounded-full w-[28px] h-[28px] border border-slate-50 bg-red-400'
                }
            />
            <div className={'flex flex-col space-y-2 w-full ml-3'}>
                <div className={'flex flex-row items-center'}>
                    <p className={'text-[12px] leading-[15px] text-slate-300'}>
                        Satoshi Nakatomo
                    </p>
                    <p
                        className={
                            'text-[12px] leading-[15px] text-slate-500 ml-2.5'
                        }
                    >
                        1 day ago
                    </p>
                </div>
                <div
                    className={
                        'p-3 rounded-lg bg-slate-800 text-slate-200 text-[14px] leading-[17px]'
                    }
                >
                    Nicely done! I proud of you Doku!
                </div>
            </div>
        </div>
    )
}
