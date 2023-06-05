import React from 'react'

interface MemberAmountLabelProps {
    amount: number
}

export const MemberAmountLabel = ({ amount }: MemberAmountLabelProps) => {
    return (
        <div
            className={
                'flex flex-row items-center space-x-1 bg-emerald-800 rounded pr-2 pl-1'
            }
        >
            <img src={'/member.svg'} />
            <p className={'text-[14px] text-emerald-200 font-semibold'}>
                {amount}
            </p>
        </div>
    )
}
