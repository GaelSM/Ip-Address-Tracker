import { Marker, useMap } from "react-leaflet"
import { IconLocation } from "./IconLocation"
import { useEffect } from "react"

export default function MarkerPosition({coordenates}) {

    const position = [coordenates.location.lat, coordenates.location.lng]
    const map = useMap()
    useEffect(() => {
        map.flyTo(position, 16, {animate: true})
    }, [map, position])

  return (
    <Marker icon={IconLocation} position={position}>

    </Marker>
  )
}
