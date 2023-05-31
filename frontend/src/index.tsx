import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from 'src/Root'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { ErrorPage } from 'src/routes/App/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            // {
            //     path: '/townhall',
            //     element: <Circle />,
            //     children: [
            //         {
            //             index: true,
            //             element: <Navigate to={'/townhall/opened-tasks'} />,
            //         },
            //         {
            //             path: 'opened-tasks',
            //             element: <CircleOverview />,
            //         },
            //         {
            //             path: 'proposal',
            //             element: <CircleMyContributions />,
            //         },
            //     ],
            // },
            // {
            //     path: '/workspace',
            //     element: <Circle />,
            //     children: [
            //         {
            //             index: true,
            //             element: <Navigate to={'/townhall/opened-tasks'} />,
            //         },
            //         {
            //             path: 'my-tasks',
            //             element: <CircleOverview />,
            //         },
            //         {
            //             path: 'my-proposal',
            //             element: <CircleMyContributions />,
            //         },
            //     ],
            // },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        <RouterProvider router={router} />
    </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
