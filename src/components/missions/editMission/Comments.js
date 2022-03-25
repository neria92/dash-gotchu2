import React from 'react'

export const Comments = ({ id }) => {
    
    return (
        <div>
            <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">ver los 3 comentarios</div>
            <div className="mb-2">
                <Comment />
            </div>
        </div>
    )
}

const Comment = () => {
    return (
        <div className="mb-2 text-sm">
            <span className="font-medium mr-2">nombre</span>comentario
        </div>
    )
}