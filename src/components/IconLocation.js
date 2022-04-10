import L from "leaflet";
import pin from '../assets/pin.png';

export const IconLocation = L.icon({
    iconUrl:  pin,
    // iconRetinaUrl: require('../../../assets/icons/pin_dormimundo.svg'),
    // shadowUrl: iconShadow,
    iconAnchor: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon"
})