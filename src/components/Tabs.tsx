import React from 'react'

export interface TabItem {
    label: string
    value: string
}

interface TabsProps {
    tabItems: TabItem[]
    onClick: (activeName: string) => void
    activeName?: string
}

export const Tabs = ({ tabItems, onClick, activeName }: TabsProps) => {
    return (
        <div
            className={
                'mt-[28px] flex flex-row items-center space-x-[36px] pb-4 border-slate-700 border-b'
            }
        >
            {tabItems.map((tabItem) => (
                <button
                    key={tabItem.value}
                    className={`text-[20px] leading-[25px] font-bold ${
                        activeName === tabItem.value
                            ? 'text-slate-50'
                            : 'text-finegray'
                    }`}
                    onClick={() => {
                        onClick(tabItem.value)
                    }}
                >
                    {tabItem.label}
                </button>
            ))}
        </div>
    )
}
