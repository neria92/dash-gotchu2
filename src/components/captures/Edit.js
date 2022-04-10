
export const Edit = ({ setIsEdit }) => {
    return (
        <div className="flex justify-end">
            <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"
                onClick={() => setIsEdit(prev => !prev)}
            >Editar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
        </div>
    )
}

