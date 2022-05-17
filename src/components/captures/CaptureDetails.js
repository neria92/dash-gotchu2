import React, { useEffect, useState, useContext } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../firebase/firebaseConfig'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Comments } from '../missions/editMission/Comments'
import { MediaPreview } from './MediaPreview'
import { Stats } from './Stats'
import { timeAgo } from '../../helpers/timeAgo'
import { DropDown } from './DropDown'
import { Map } from './Map'
import { UbicationIformation } from './UbicationIformation'
import { ReportsTable } from './ReportsTable'
import { getTableMissions } from '../../services/getTableMission'
import { StoresNearest } from './StoresNearest'


export const CaptureDetails = () => {
    const coments = useRef();

    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const [capture, setCapture] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [mission, setMission] = useState({});
    const [reports, setReports] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [locations, setLocations] = useState([])

    useEffect(() => {
        setIsLoading(true)
        db.collection('captures2').doc(id).get()
            .then((doc) => {
                if (doc.exists) { setCapture({ ...doc.data(), id: doc.id }) }
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (!capture?.missionData) return
        db.collection('missions2').doc(capture.missionData.missionId).get()
            .then((doc) => {
                if (doc.exists) { setMission({ ...doc.data(), id: doc.id }) }
            })
        if (!!capture?.reports) {
            (async () => {
                let reports = await Promise.all(capture?.reports.slice(0,10).map(({ userId }) => {
                    return db.doc(`users2/${userId}`).get().then(doc => ({ ...doc.data().userData, id: doc.id }))
                })
                )
                reports = reports.map((user) => {
                    for (const report of capture?.reports) {
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

    }, [capture])

    useEffect(() => {
        if(!!mission?.geoData?.table){
            (async()=>{
                const table= await getTableMissions({
                    table:mission?.geoData?.table,
                    latitude:capture.geoData.coords.latitude,
                    longitude:capture.geoData.coords.longitude,
                })
                setLocations(table.data)
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
            <EditCaptureContext.Provider value={{ capture, setCapture, mission, isEdit,locations }}>
                <div className='flex items-center justify-center mt-10 '>
                    <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
                        <div className="w-full flex justify-between  p-3">
                            <div className='w-1/3 flex flex-row'>
                                <div className="flex justify-center overflow-hidden">
                                    <img className="rounded-full h-12 w-12" src={capture?.userData?.photo} alt='image-mission' />
                                </div>
                                <div className='flex  flex-col '>
                                    <span className="pt-1 ml-2 font-semibold text-xl">{capture?.userData?.username}</span>
                                    <span className="pt-1 ml-2 text-xs text-gray-600 text-left">{timeAgo(capture?.date?.seconds * 1000)}</span>
                                </div>
                            </div>
                            <div className="flex w-1/3  justify-center items-center flex-col ">
                                {
                                    capture?.missionData?.missionName
                                    &&
                                    <>
                                        <span className="text-lg text-gray-600 text-left">Missión</span>
                                        <span className='text-bold text-pink-600 font-bold text-xl'>{capture?.missionData?.missionName}</span>
                                    </>
                                }
                            </div>
                            <div className='w-1/3 flex justify-end'>
                                <DropDown />
                            </div>

                        </div>

                        <MediaPreview />

                        <div className='flex justify-center items-center mt-2'>
                            {/* <DatesMission /> */}
                        </div>
                        <div className="px-3 pb-2">

                            <Stats coments={coments} />

                            <div className='hidden' id='coments' ref={coments} >
                                <Comments
                                    countComments={capture?.stats?.commentsCount}
                                    id={capture.id}
                                    type='captures2'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row justify-center items-center mt-2'>
                            <Map />
                            <UbicationIformation />
                        </div>
                        {
                            locations.length>0
                            &&
                            <StoresNearest
                            data={locations}
                            user={capture.hash===locations[0]?.hash}
                            columns={[
                                { title: 'id', field: 'id' },
                                { title: 'Tienda', field: 'store' },
                                { title: 'Fecha', field: 'date' },
                                { title: 'Disponible', field: 'flag' },
                                { title: 'Hecha por este usuario', field: 'flag' },
                            ]}
                            />
                        }
                        {
                            (!!capture?.reports && reports.length > 0)
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
                <br />
            </EditCaptureContext.Provider>
    )
}



