import React, { useEffect, useState, useContext } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../../firebase/firebaseConfig'
import { Comments } from './Comments'
import { EditMissionContext } from './context/EditMissionContext'
import { DatesMission } from './DateMission'
import { Rewards } from './Rewards'
import { Title } from './Title'
import { Objective } from './Objective'


export const EditMission = () => {
  const coments = useRef();
  const rewards = useRef();


  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [mission, setMission] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    db.collection('missions2').doc(id).get()
      .then((doc) => {
        if (doc.exists) { setMission({ ...doc.data(), id: doc.id }) }
      })
      .finally(() => setIsLoading(false))
  }, [])



  return (

    isLoading
      ? <span>...</span>
      :
      <EditMissionContext.Provider value={{ mission, setMission, isEdit }}>

        <div className='flex items-center justify-center my-2'>

          <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
            <div className="w-full flex justify-between p-3">
              <div className="flex">
                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src={mission?.userData?.photo} alt='image-mission' />
                </div>
                <span className="pt-1 ml-2 font-bold text-sm">{mission?.userData?.username}</span>
              </div>
              {
                !isEdit
                  ?
                  <Edit setIsEdit={setIsEdit} />
                  :
                  <Save setIsEdit={setIsEdit} />

              }

            </div>
            <div className="my-2">
              <Title />
            </div>
            <img className="aspect-video object-cover block h-auto w-full bg-cover" src={mission?.missionData?.media?.images[0]?.url} />
            <div className='flex justify-center items-center mt-2'>
              <DatesMission
                initial={new Date(mission?.missionData?.startDate?.seconds * 1000)}
                finish={new Date(mission?.missionData?.finishDate?.seconds * 1000)}
              />
            </div>
            <div className="px-3 pb-2">
              <div className="pt-2">
                <i className="far fa-heart cursor-pointer"></i>
                <span className="text-sm text-gray-400 font-medium">{mission?.stats?.likesCount > 0 && mission?.stats?.likesCount + ' me gusta'}</span>
                <i className="far fa-heart cursor-pointer"></i>
                <span className="ml-2 text-sm text-gray-400 font-medium cursor-pointer hover:bg-red-300" onClick={() => coments.current.classList.toggle('hidden')}>{mission?.stats?.commentsCount > 0 && mission?.stats?.commentsCount + ' comentarios'}</span>
              </div>
              <div className="pt-1">
                <Objective />
              </div>
              <span className="font-medium text-pink-600 mr-2 cursor-pointer" onClick={() => rewards.current.classList.toggle('hidden')}>Recompesas</span>
              <div className="hidden" ref={rewards} id='rewards'>
                <Rewards />
              </div>
              <div className='hidden' id='coments' ref={coments} >
                <Comments
                  id={mission.id}
                />
              </div>
            </div>
          </div>
        </div>
      </EditMissionContext.Provider>


  )
}

const Save = ({ setIsEdit }) => {

  const { mission } = useContext(EditMissionContext)

  const updateChange = () => {
    setIsEdit(prev => !prev)
    const newMission = { ...mission }
    delete newMission.id
    return
    db.doc(`missions2/${mission.id}`).update(newMission)
  }
  return (
    <span className="px-2 bg-green-700/20 hover:bg-green-300 cursor-pointer rounded"
      onClick={updateChange}
    >Guardar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
  )
}

const Edit = ({ setIsEdit }) => {
  return (
    <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"
      onClick={() => setIsEdit(prev => !prev)}
    >Editar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
  )
}

