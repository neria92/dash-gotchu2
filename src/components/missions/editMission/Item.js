import { useContext } from "react";
import Icon from "../../Icon"
import { EditMissionContext } from "./context/EditMissionContext";

export const Item = ({ name = 'heart', color = '', title = '', onClick = () => { } }) => {
    
    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const onChangeValues = ({ target }) => {
        const value = parseInt(target.value.replace(/[^0-9]/g, ''));
        setMission({ ...mission, missionData: { ...mission.missionData, loot: { ...mission.missionData.loot, [target.name]: value } } })

    }

    return (
        <div onClick={onClick} className='flex flex-row p-2' >
            <Icon style="w-4 h-4 mr-2" name={name} color={color} />
            {
                    (!isEdit || ['send','heart'].includes(name))
                        ? <span className="text-sm text-gray-400 font-medium">{title}</span>
                        :
                        <input
                            className='border border-blue-300 rounded w-3/6 h-6'
                            name={name}
                            onChange={onChangeValues}
                            value={mission.missionData.loot[name]}
                        />
                }
            
        </div>
    )
}
