import React from 'react'

interface ProfileProps {
    username?: string
}

export const Profile = ({ username }: ProfileProps) => {
    return (
        <>
            <div className={'flex flex-col items-center space-y-[28px]'}>
                <div className={'flex flex-col items-center space-y-[4px]'}>
                    <p
                        className={
                            'text-[36px] leading-[45px] text-center font-medium'
                        }
                    >
                        Welcome!
                    </p>
                    <p
                        className={
                            'text-[36px] leading-[45px] text-center font-bold'
                        }
                    >
                        {username}
                    </p>
                </div>
            </div>
        </>
    )
}
