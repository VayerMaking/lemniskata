import { ScaleControl, MapContainer, Marker, Popup, TileLayer, Rectangle, useMapEvents, useMapEvent, useMap, Pane, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Trash } from 'tabler-icons-react';
import L from 'leaflet';
const center = [0,0];

const GetMousePos = ({ map }) => {
  // const [marker, setMarker] = useState([])

  useEffect(() => {
    if (!map) return;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      console.log(e.latlng);
      
      // setMarker(mar => [...mar, [lat, lng]]);
    })

  }, [map]);
  return null
}

const Map = () => {
  const center = [0, 0]
  const [map, setMap] = useState(null);
  return (
    <MapContainer whenCreated={setMap}  center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{height: "1000px", width: "100%"}}>
      <TileLayer url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
      />
        <GetMousePos map={map} />
    </MapContainer>
  )
}

export default Map