import React, { useEffect, useState } from 'react'
import useGetComments from '../../../hooks/useGetComments'

export const Comments = ({ id,countComments,type='missions2'}) => {

    const [comments, getMoreComments, isLoading] = useGetComments({ id,type})
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
    const { userData, message } = comment
    return (
        <div className="mb-2 text-sm">
            <span className="font-medium mr-2">{userData.username}</span>{message}
        </div>
    )
}