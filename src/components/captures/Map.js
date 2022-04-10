import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
    Marker,
    Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IconLocation } from '../IconLocation'
import { EditCaptureContext } from './context/EditCaptureContext';


const waitTime = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const fillBlueOptions = { fillColor: 'blue' }
const pointDefault = [19.376822, -99.2961675]

export const Map = () => {


    const [isLoading, setIsLoading] = useState(false);
    const { capture, mission } = useContext(EditCaptureContext)

    const { geoData: { coords: { latitude, longitude } } } = capture
    const latitudeMission = mission?.geoData?.latitude || latitude
    const longitudeMission = mission?.geoData?.longitude || longitude

    const missionPoint = [latitudeMission, longitudeMission]
    const center = missionPoint
    const evidencesPoint = [latitude, longitude]



    return (
        <div className='flex items-center justify-center p-2'>

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
                        zoom={8}
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