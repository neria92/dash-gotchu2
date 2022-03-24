import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
    Marker,
    Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IconLocation } from './IconLocation'


const waitTime = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const fillBlueOptions = { fillColor: 'blue' }

export const Map = ({ missionPoint, evidencesPoint, center = [19.376822, -99.2961675], address = '', }) => {

    const map = useRef();
    const [isLoading, setIsLoading] = useState(false);



    return (
        <div className='flex items-center justify-center'>

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
                        zoom={14}
                        className='h-80 w-80 rounded my-10'
                    >
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Mapa">
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <MarkerMap
                                point={missionPoint}
                                location='other'
                            />
                            <MarkerMap
                                point={evidencesPoint}
                                location='klmdslkd'
                            />

                            <Circle center={missionPoint} pathOptions={fillBlueOptions} radius={200} />
                        </LayersControl>
                    </MapContainer>
            }

        </div>


    )
}


const MarkerMap = ({ point, location }) => (
    <Marker
        position={point}
        icon={IconLocation}

    >
        <Popup>
            {location}
        </Popup>
    </Marker >
)