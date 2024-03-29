import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../../firebase/firebaseConfig'
import { Comments } from './Comments'
import { EditMissionContext } from './context/EditMissionContext'
import { DatesMission } from './DateMission'
import { Title } from './Title'
import { Objective } from './Objective'
import { Difficulty } from './Difficulty'
import { Stats } from './Stats'
import { Rally } from './Rally'
import { DropDown } from './DropDown'
import { ReportsTable } from '../../captures/ReportsTable'


export const EditMission = () => {
  const coments = useRef();
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [mission, setMission] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([])
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    db.collection('missions2').doc(id).get()
      .then((doc) => {
        if (doc.exists) { setMission({ ...doc.data(), id: doc.id }) }
      })
      .finally(() => setIsLoading(false))

  }, [])

  useEffect(() => {
    if (!!mission?.reports) {
      (async () => {
        let reports = await Promise.all(mission?.reports.slice(0, 10).map(({ userId }) => {
          return db.doc(`users2/${userId}`).get().then(doc => ({ ...doc.data().userData, id: doc.id }))
        })
        )
        reports = reports.map((user) => {
          for (const report of mission?.reports) {
            if (report.userId === user.userId) {
              let data = report
              return { ...user, ...data }
            }
          }
        }
        )
        setReports(reports)
      })()
    }
  }, [mission])


  return (

    isLoading
      ?
      <div className='flex flex-col bg-transparent w-full items-center justify-center '>
        <div className='spinner'></div>
        <span className='text-ellipsis font-semibold mt-5 text-gray-900'>Cargando...</span>
      </div>
      :
      <EditMissionContext.Provider value={{ mission, setMission, setIsEdit, isEdit }}>

        <div className='flex items-center justify-center mt-10'>

          <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
            <div className="w-full flex justify-between p-3">
              <div className="flex justify-center items-center">
                <div className="rounded-full h-auto w-12 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src={mission?.userData?.photo} alt='image-mission' />
                </div>
                <span className="pt-1 ml-5 font-bold text-xl">{mission?.userData?.username}</span>
              </div>
              <DropDown />


            </div>
            <div className="my-2">
              <Title />
            </div>
            {
              !!mission.missionData.type
              &&
              <div className="pt-1">
                <Rally />
              </div>
            }
            <img className="aspect-video object-cover block h-auto w-full bg-cover" src={mission?.missionData?.media?.images[0]?.url} />
            <Stats />
            <div className='flex justify-center items-center mt-2'>
              <DatesMission />
            </div>


            <div className="px-3 pb-2">
              <div className="pt-2">
                <i className="far fa-heart cursor-pointer"></i>
                <span className="text-sm text-gray-400 font-medium">{mission?.stats?.likesCount > 0 && mission?.stats?.likesCount + ' me gusta'}</span>
                <i className="far fa-heart cursor-pointer"></i>
                <span className="ml-2 text-sm text-gray-400 font-medium cursor-pointer hover:text-red-300 hover:animate-bounce" onClick={() => coments.current.classList.toggle('hidden')}>{mission?.stats?.commentsCount > 0 && mission?.stats?.commentsCount + ' comentarios'}</span>
              </div>
              <div className="pt-1">
                <Objective />
              </div>
              <div className="pt-1">
                <Difficulty />
              </div>

              <div className='hidden' id='coments' ref={coments} >
                <Comments
                  countComments={mission?.stats?.commentsCount}
                  id={mission.id}
                />
              </div>
              {
                (!!mission?.reports && reports.length > 0)
                &&
                <ReportsTable
                  data={reports}
                  columns={[
                    { title: 'photo', field: 'photo' },
                    { title: 'Usuario', field: 'username' },
                    { title: 'fecha', field: 'username' },
                  ]}
                />
              }
            </div>
          </div>
        </div>
        <br />
      </EditMissionContext.Provider >


  )
}





