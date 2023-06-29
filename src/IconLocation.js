import L from "leaflet"
import IconImage from "../images/icon-location.svg"

export const IconLocation = L.icon({
    iconUrl: IconImage,
    iconRetinaUrl: IconImage,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: null,
    className: "leaflet-venue-icon"
})