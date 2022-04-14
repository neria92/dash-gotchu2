import React, { useEffect, useState, useContext } from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
    Marker,
    Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { AutoCompletePlaces } from './AutoCompletePlaces'
import { IconLocation } from './IconLocation'
import { CreatMissionContext } from './context/CreatMissionContext'


const waitTime = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const centerHistoric = [19.4321006, -99.1345466]

export const LocationMission = ({ userPosition }) => {


    const { mission, setMission } = useContext(CreatMissionContext);

    const [isLoading, setIsLoading] = useState(false);
    const [center, setCenter] = useState(userPosition);
    const [typeLocation, setTypeLocation] = useState('allMex');

    const [address, setAddress] = useState(mission?.geoData?.address || 'Todo México');
    const [coors, setCoors] = useState([mission?.geoData?.latitude || 19.34, mission?.geoData?.longitude || -99.3440])



    useEffect(() => {
        setIsLoading(true);
        setMission({
            ...mission, geoData: {
                latitude: coors?.lat || userPosition[0],
                longitude: coors?.lng || userPosition[1],
                address,
                geolocated: true,
            }
        })
        setCenter([coors?.lat || userPosition[0], coors?.lng || userPosition[1]])
        waitTime(1200).then(() => { setIsLoading(false) })
    }, [coors])

    useEffect(() => {
        setIsLoading(true);
        setCenter(userPosition)
        waitTime(1200).then(() => { setIsLoading(false) })
    }, [userPosition])

    const onChange = ({ target }) => {
        setTypeLocation(target.value)
    }

    const onChageTable = ({ target }) => {
        setMission({
            ...mission, geoData: {
                latitude: 19.4321006,
                longitude: -99.1345466,
                address: '',
                geolocated: true,
                table: target.value
            }
        })
    }


    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className=" bg-white space-y-6 sm:p-6 px-4 py-5">
                                <fieldset>
                                    <div>
                                        <legend className="text-base font-medium text-gray-900">Ubicación</legend>
                                        {/* <p className="text-sm text-gray-500">Será el nivel que se muestre</p> */}
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <Button
                                            level='Todo México'
                                            onChage={onChange}
                                            isActive={typeLocation === 'allMex'}
                                            value={'allMex'}
                                        />
                                        <Button
                                            level='Ubicación'
                                            onChage={onChange}
                                            value={'ubication'}
                                            isActive={typeLocation === 'ubication'}
                                        />
                                        <Button
                                            level='Multiple ubicaciones'
                                            onChage={onChange}
                                            isActive={typeLocation === 'multipleLocations'}
                                            value={'multipleLocations'}

                                        />

                                    </div>
                                </fieldset>
                                <>

                                    {
                                        typeLocation === 'ubication'
                                            ?

                                            <>
                                                <AutoCompletePlaces
                                                    setAddress={setAddress}
                                                    setCoors={setCoors}
                                                />

                                                {

                                                    isLoading
                                                        ?
                                                        <div className='flex flex-col bg-transparent h-80 w-80 rounded items-center justify-center'>
                                                            <div className='spinner'></div>
                                                            <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                                                        </div>
                                                        :
                                                        <MapContainer
                                                            center={center}
                                                            zoom={13}
                                                            scrollWheelZoom={false}
                                                            className='h-80 w-80 rounded'
                                                        >
                                                            <LayersControl position="topright">
                                                                <LayersControl.BaseLayer checked name="Mapa">
                                                                    <TileLayer
                                                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                    />
                                                                </LayersControl.BaseLayer>

                                                                <Marker
                                                                    position={center}
                                                                    icon={IconLocation}

                                                                >
                                                                    <Popup>
                                                                        {address}
                                                                    </Popup>
                                                                </Marker >
                                                            </LayersControl>
                                                        </MapContainer>
                                                }
                                            </>
                                            :
                                            typeLocation === 'multipleLocations'
                                            &&
                                            <input
                                                className='border border-1 border-gray-400 rounded outline-none'
                                                placeholder='Tabla'
                                                onChange={onChageTable}
                                            />

                                    }


                                </>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </>
    )
}

const Button = ({ level, value, onChage, isActive }) => {
    return (
        <div className="flex items-center">
            <input
                id="location"
                name="location"
                type="radio"
                onChange={onChage}
                value={value}
                checked={isActive}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700"> {level} </label>
        </div>
    )
}

