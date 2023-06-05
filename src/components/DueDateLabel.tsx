import React from 'react'

interface DueDateLabelProps {
    dueDate: string
}

export const DueDateLabel = ({ dueDate }: DueDateLabelProps) => {
    return (
        <div
            className={
                'flex flex-row items-center pr-2 pl-1 bg-slate-700 rounded'
            }
        >
            <img src={'/ic_cal.svg'} />
            <p className={'text-[12px] leading-[15px] text-slate-200'}>
                ~ {dueDate}
            </p>
        </div>
    )
}
