import React, { useEffect, useState } from 'react'
import useGetComments from '../../../hooks/useGetComments'
import dayjs from 'dayjs'
import { timeAgo } from '../../../helpers/timeAgo'

export const Comments = ({ id, countComments, type = 'missions2' }) => {

    const [comments, getMoreComments, isLoading] = useGetComments({ id, type })
    return (
        <div>
            <div className="mb-2">
                <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">{countComments} comentarios</div>
                {
                    isLoading
                        ? <span>...</span>
                        :
                        comments.map(comment => {
                            return <Comment comment={comment} key={comment.id} />
                        })
                }
            </div>
            <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium hover:text-blue-300" onClick={getMoreComments}>ver más comentarios...</div>

        </div>
    )
}

const Comment = ({ comment }) => {
    const { userData, message, date } = comment
    return (
        <>
            <div className="mb-2 text-sm flex flex-row">

                <img src={userData.photo} className='rounded-full w-8 h-8 flex  justify-center items-center ' alt='user' />
                <div className='flex flex-col justify-center items-center ml-5'>
                    <div className='flex bg-gray-300 rounded p-2 w-full'>
                        <span className="font-medium mr-2">{userData.username}</span>{message}
                    </div>
                    <div className='w-full'>
                        <span className="font-sm text-gray-400 text-left">{timeAgo(date.seconds * 1000)}</span>
                    </div>
                </div>
            </div>

        </>
    )
}