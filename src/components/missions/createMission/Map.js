import React, { useRef } from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Search } from './Search'
import { useForm } from '../../../hooks/useForm'
import { fetchingAddresses } from '../../../helpers/fetchingAddresses'
import { AutoCompletePlaces } from './AutoCompletePlaces'

const center = [51.505, -0.09]
const fillBlueOptions = { fillColor: 'blue' }

export const Map = () => {

    const map = useRef();

    const [{ address }, onChange] = useForm({
        address:''
    })
    const buttonOnClick = () => {
        map.current.classList.toggle('hidden')
    }


    const onChangeSearch = (e) => {
        onChange({
            target: {
                name: 'address',
                value: e.target.value
            }
        });
        if (e.target.value.length < 2) {
            return
        }
        
        fetchingAddresses(e.target.value)
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
                                        <div className="flex items-center">
                                            <input
                                                id="push-everything"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                onClick={buttonOnClick}
                                            />
                                            <label className="ml-3 block text-sm font-medium text-gray-700"> Todo México </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="push-email"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                onClick={buttonOnClick}
                                            />
                                            <label className="ml-3 block text-sm font-medium text-gray-700"> Ubicación en particular </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div id='map' ref={map} className=''>
                                  
                                    <AutoCompletePlaces/>
                                  
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
                                            <Circle center={center} pathOptions={fillBlueOptions} radius={200} />


                                        </LayersControl>
                                    </MapContainer>
                                </div>

                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
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
