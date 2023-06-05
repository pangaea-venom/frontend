import React from 'react'
import { Header } from 'src/components/Header'

export const ErrorPage = () => {
    return (
        <div className={'w-full h-screen flex flex-col'}>
            <Header />
            <div className={'flex flex-col items-center justify-center h-full'}>
                <p
                    className={
                        'text-[36px] leading-[45px] text-mono-500 text-center mb-[40px] font-semibold'
                    }
                >
                    Opps! <br />
                    We are still building it
                </p>
                <img src={'/warning.svg'} />
            </div>
        </div>
    )
}
