import React, { useEffect } from 'react'
import { useAccountStore } from 'src/modules/AccountStore'
import { Username } from 'src/components/Username'
import { type Comment } from 'src/types/task'
import moment from 'moment'
import { toDate } from 'src/util'

interface CommentProps {
    commentId: number
}

// eslint-disable-next-line
export const CommentBox = ({commentId}: CommentProps) => {
    const [comment, setComment] = React.useState<Comment | undefined>(undefined)

    const daoContract = useAccountStore((state) => state.daoContract)

    const getComment = useAccountStore((state) => state.getComment)

    const updateComment = async () => {
        if (!daoContract) return

        const _comment = await getComment(commentId)
        setComment(_comment)
    }

    useEffect(() => {
        if (!daoContract) return

        updateComment()
    }, [])

    if (!comment) return null

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
                        <Username address={comment.commenter} />
                    </p>
                    <p
                        className={
                            'text-[12px] leading-[15px] text-slate-500 ml-2.5'
                        }
                    >
                        {moment(toDate(comment.postTime)).fromNow()}
                    </p>
                </div>
                <div
                    className={
                        'p-3 rounded-lg bg-slate-800 text-slate-200 text-[14px] leading-[17px]' +
                        ' whitespace-pre-wrap break-all'
                    }
                >
                    {comment.comment}
                </div>
            </div>
        </div>
    )
}
