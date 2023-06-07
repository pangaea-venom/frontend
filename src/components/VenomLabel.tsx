import React from 'react'
import { fromNano, numberWithCommas } from 'src/util'

interface VenomLabelProps {
    amount: number | string | undefined
    isSmall?: boolean
}

export const VenomLabel = ({ amount, isSmall }: VenomLabelProps) => {
    if (!amount) return null

    if (typeof amount === 'string') amount = fromNano(amount)

    return (
        <div className={'flex flex-row items-center space-x-2'}>
            <img
                style={{
                    width: !isSmall ? '28px' : '20px',
                    height: !isSmall ? '28px' : '20px',
                }}
                src={'/venom-blue.svg'}
            />
            <p
                className={`${
                    !isSmall
                        ? 'text-[20px] leading-[25px]'
                        : 'text-[14px] leading-[18px]'
                } text-slate-50 font-medium`}
            >
                <span className={'text-lime-400'}>
                    {numberWithCommas(amount)}
                </span>{' '}
                Venom
            </p>
        </div>
    )
}
