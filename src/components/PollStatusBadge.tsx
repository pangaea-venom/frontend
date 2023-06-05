import React from 'react'
import { PollStatus } from 'src/types/proposal'

interface PollStatusBadgeProps {
    status: PollStatus
}

export const PollStatusBadge = ({ status }: PollStatusBadgeProps) => {
    return (
        <div
            className={`p-0.5 rounded-xl flex flex-row space-x-1 items-center pr-1
             ${
                 status === PollStatus.Against
                     ? 'bg-red-100'
                     : status === PollStatus.For
                     ? 'bg-green-100'
                     : 'bg-slate-100'
             }
            `}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="8"
                    cy="8"
                    r="8"
                    className={
                        status === PollStatus.Against
                            ? 'fill-red-500'
                            : status === PollStatus.For
                            ? 'fill-green-500'
                            : 'fill-slate-700'
                    }
                />
                <path
                    d="M6.79689 9.8489L5.08829 8.19324C4.89626 8.00715 4.58605 8.00715 4.39402 8.19324C4.20199 8.37932 4.20199 8.67992 4.39402 8.866L6.45221 10.8604C6.64425 11.0465 6.95445 11.0465 7.14648 10.8604L12.356 5.81232C12.548 5.62624 12.548 5.32564 12.356 5.13956C12.1639 4.95348 11.8537 4.95348 11.6617 5.13956L6.79689 9.8489Z"
                    fill="#FBFBFB"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.3574 4.82522C11.7191 4.47488 12.2988 4.47493 12.6604 4.82537C13.0299 5.18336 13.0299 5.76853 12.6604 6.12651L7.45094 11.1746C7.08923 11.5251 6.50947 11.5251 6.14776 11.1746L4.08957 9.18019C3.72014 8.82221 3.72014 8.23703 4.08957 7.87905C4.45127 7.52855 5.03104 7.52855 5.39275 7.87905L6.79704 9.23985L11.3574 4.82522Z"
                    fill="#FBFBFB"
                />
            </svg>
            <p
                className={`
                text-[12px] leading-[15px]
                ${
                    status === PollStatus.Against
                        ? 'text-red-500'
                        : status === PollStatus.For
                        ? 'text-green-500'
                        : 'text-slate-700'
                }
                `}
            >
                {status}
            </p>
        </div>
    )
}
