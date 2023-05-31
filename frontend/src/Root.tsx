import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from 'src/components/Header'

export const Root = () => {
    return (
        <div className={'w-full h-screen flex flex-col text-slate-50'}>
            <Header />
            <Outlet />
        </div>
    )
}
