import React from 'react'
import {
    Circle,
    MapContainer,
    TileLayer,
    LayersControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const center = [51.505, -0.09]
const fillBlueOptions = { fillColor: 'blue' }


export const Appeal = () => {
    return (
        <MapContainer
            center={center}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: '80vh', borderRadius: '26px' }}
            className='h-auto w-auto'
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
    )
}
