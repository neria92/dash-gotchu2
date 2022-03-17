import React from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
 
const center = [51.505, -0.09]

export const Map = () => {

    const fillBlueOptions = { fillColor: 'blue' }

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className=" bg-white space-y-6 sm:p-6 px-4 py-5">
                              
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
