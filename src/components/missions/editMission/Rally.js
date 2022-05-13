import React, { useContext, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm';
import { useSearchMissions } from '../../../hooks/useSearchMissions';
import { EditMissionContext } from './context/EditMissionContext'

export const Rally = () => {

    const { mission, setMission, isEdit } = useContext(EditMissionContext);
    const missionNextName = mission.missionData?.missionNextName || 'asinge una misión'
    const [missions, searchMissions, isLoading] = useSearchMissions()

    const [{ search }, onChange] = useForm({
        search: missionNextName || ''
    })

    const handleOnchange = ({ target }) => {
        onChange({ target })
        searchMissions(target.value)
    }


    const onChangeValues = (id, name) => {
        onChange({
            target: {
                name: 'search',
                value: name
            }
        })
        setMission({ ...mission, missionData: { ...mission.missionData, missionNextName: name, missionNext: id } })
        searchMissions('')

    }




    return (
        <>
            <span className=" ml-3 font-semibold text-2xl text-pink-400 mr-2">Esta misión es un Rally</span>

            <div className="mb-2 ml-5 text-sm flex flex-row">

                <span className="font-medium text-xl text-pink-600 mr-2">Siguiente misión</span>
                {
                    !isEdit
                        ? <span className="font-medium text-xl text-blue-600 mr-2">{missionNextName}</span>
                        :
                        <div className=" relative  mr-3 md:mr-0 md:block w-1/3">
                            <input
                                className='border border-blue-300 rounded font-medium text-xl '
                                name='search'
                                autoComplete='off'
                                onChange={handleOnchange}
                                value={search}
                            />
                            {
                                missions.length > 0
                                &&
                                <div className='absolute mt-10 overflow-hidden bg-white rounded-lg shadow-lg top-0 left-0 border border-gray-200 z-10'>
                                    {
                                        missions.map(({ mission, id }, index) => (
                                            <section key={index}>
                                                <Item mission={mission} id={id} onChange={onChangeValues} />
                                            </section>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                }

            </div>
        </>

    )
}

const Item = ({ mission, id, onChange }) => {
    const { missionData: { media: { images }, missionName } } = mission
    const image = images[0]?.url
    return (

        <div className='hover:bg-blue-200 flex gap-4 p-4' onClick={() => onChange(id, missionName)}>

            <img src={image} className='w-8 h-8 rounded object-contain' alt='image_mission' />
            <div>
                <h3 className='text-sm font-semibold'>{missionName}</h3>
            </div>

        </div>
    )
}