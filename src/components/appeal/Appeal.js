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
        <h1>
            Apelaciones
        </h1>
    )
}
