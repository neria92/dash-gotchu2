import Icon from "../Icon"

export const Item = ({ name = 'heart', color = '', title = '', onClick = () => { } }) => {
    return (
        <div onClick={onClick} className='flex flex-row p-2' >
            <Icon style="w-4 h-4 mr-2" name={name} color={color} />
            <span className="text-sm text-gray-400 font-medium">{title}</span>
        </div>
    )
}
